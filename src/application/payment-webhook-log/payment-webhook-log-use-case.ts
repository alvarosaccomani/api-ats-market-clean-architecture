import crypto from "crypto";
import { PaymentWebhookLogRepository } from "../../domain/payment-webhook-log/payment-webhook-log.repository";
import { PaymentWebhookLogValue } from "../../domain/payment-webhook-log/payment-webhook-log.value";
import { OrderRepository } from "../../domain/order/order.repository";

export class PaymentWebhookLogUseCase {
    constructor(
        private readonly webhookLogRepository: PaymentWebhookLogRepository,
        private readonly orderRepository: OrderRepository
    ) {
        this.handleMercadoPagoWebhook = this.handleMercadoPagoWebhook.bind(this);
    }

    private verifySignature(headers: any, dataId: string): boolean {
        const secret = process.env.MP_WEBHOOK_SECRET;
        if (!secret) return true;

        const xSignature = headers ? (headers['x-signature'] || headers['X-Signature']) : null;
        const xRequestId = headers ? (headers['x-request-id'] || headers['X-Request-Id']) : null;

        if (!xSignature || !xRequestId) return true;

        const parts = String(xSignature).split(',');
        let ts = '';
        let hash = '';

        parts.forEach(part => {
            const [key, value] = part.split('=');
            if (key && key.trim() === 'ts') ts = value ? value.trim() : '';
            if (key && key.trim() === 'v1') hash = value ? value.trim() : '';
        });

        if (!ts || !hash) return true;

        const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
        const computedHash = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

        return computedHash === hash;
    }

    public async handleMercadoPagoWebhook(body: any, query: any, socketAdapter?: any, headers?: any) {
        // 1. Extraer ID del Evento y ID de Pago según el tipo de notificación de Mercado Pago
        const eventId = String(body.id || query['data.id'] || query.id || body.data?.id || '').trim();
        const action = body.action || body.type || query.type || 'payment.updated';
        const paymentId = String(body.data?.id || query['data.id'] || body.id || query.id || '').trim();

        if (!eventId || !paymentId) {
            console.info('[Webhook MP] Notificación recibida sin ID de pago válido (ping/test). Ignorada.');
            return { status: 'IGNORED', message: 'Sin ID de evento/pago válido.' };
        }

        // Verificación opcional de firma de seguridad HMAC-SHA256
        if (headers && !this.verifySignature(headers, paymentId)) {
            console.warn(`[Webhook MP] ⚠️ Firma HMAC inválida para el evento ${eventId}. Posible intento de spoofing.`);
            return { status: 'FAILED', message: 'Firma HMAC de webhook inválida.' };
        }

        // 2. Control de Idempotencia: Verificar si el evento ya fue procesado antes
        const existingLog = await this.webhookLogRepository.findLogByProviderAndEvent('MERCADO_PAGO', eventId);
        if (existingLog && existingLog.pwl_status === 'PROCESSED') {
            console.warn(`[Webhook MP] Evento ${eventId} ya fue procesado con éxito (Idempotente).`);
            return { status: 'IGNORED', message: 'Evento duplicado procesado anteriormente.' };
        }

        try {
            // 3. Obtener el token de acceso desde las variables de entorno
            const accessToken = process.env.MP_ACCESS_TOKEN || process.env.MERCADO_PAGO_ACCESS_TOKEN || '';

            let mpPaymentData: any = null;
            if (accessToken) {
                // Consultar directamente a la API de Mercado Pago para verificar la autenticidad del pago
                const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (mpResponse.ok) {
                    mpPaymentData = await mpResponse.json();
                } else {
                    console.warn(`[Webhook MP] No se pudo verificar el pago ${paymentId} en la API de MP. Status: ${mpResponse.status}`);
                }
            }

            const paymentStatus = mpPaymentData ? mpPaymentData.status : (body.status || 'approved');
            const externalRef = mpPaymentData ? mpPaymentData.external_reference : (body.external_reference || '');

            let ordUuid = '';
            let cmpUuid = '';

            if (externalRef) {
                if (externalRef.includes('|')) {
                    const parts = externalRef.split('|');
                    cmpUuid = parts[0];
                    ordUuid = parts[1];
                } else {
                    ordUuid = externalRef;
                }
            }

            // 4. Si el pago está aprobado, actualizar la orden en la base de datos
            if (paymentStatus === 'approved' && ordUuid) {
                const targetCmpUuid = cmpUuid || body.cmp_uuid || '';
                
                // Actualizar estado de la orden a 'PROCESSING' / 'PAID'
                await this.orderRepository.changeOrderStatus(targetCmpUuid, ordUuid, 'PROCESSING');
                console.log(`[Webhook MP] Orden ${ordUuid} actualizada a PROCESSING tras pago de MP exitoso.`);

                // Emitir notificación por WebSockets al frontend Angular en tiempo real
                if (socketAdapter) {
                    socketAdapter.emitEvent('ORDER_PAYMENT_APPROVED', {
                        ord_uuid: ordUuid,
                        cmp_uuid: targetCmpUuid,
                        payment_id: paymentId,
                        status: 'approved',
                        message: '¡El pago fue aprobado exitosamente por Mercado Pago!'
                    });
                }
            }

            // 5. Registrar el Log de Idempotencia como PROCESSED
            const logValue = new PaymentWebhookLogValue({
                pwl_provider: 'MERCADO_PAGO',
                pwl_eventid: eventId,
                pwl_paymentid: paymentId,
                cmp_uuid: cmpUuid || null,
                ord_uuid: ordUuid || null,
                pwl_status: 'PROCESSED',
                pwl_payload: { body, query, mpPaymentData }
            });

            await this.webhookLogRepository.createLog(logValue);

            return { status: 'PROCESSED', paymentId, paymentStatus, ordUuid };
        } catch (error: any) {
            console.error('[Webhook MP] Error al procesar webhook:', error.message);

            // Registrar el fallo en el Log de Idempotencia
            const failedLog = new PaymentWebhookLogValue({
                pwl_provider: 'MERCADO_PAGO',
                pwl_eventid: eventId,
                pwl_paymentid: paymentId,
                pwl_status: 'FAILED',
                pwl_payload: { body, query },
                pwl_errormessage: error.message
            });
            await this.webhookLogRepository.createLog(failedLog);

            throw error;
        }
    }
}
