export interface ProcessPaymentPayload {
    token: string;
    issuer_id?: string | number;
    payment_method_id: string;
    transaction_amount: number;
    installments?: number;
    payer: {
        email: string;
        identification?: {
            type: string;
            number: string;
        };
    };
    ord_uuid: string;
    cmp_uuid?: string;
}

export class ProcessPaymentUseCase {
    public async execute(payload: ProcessPaymentPayload): Promise<any> {
        const accessToken = process.env.MP_ACCESS_TOKEN || process.env.MERCADO_PAGO_ACCESS_TOKEN || '';

        if (!accessToken) {
            throw new Error('Falta configurar el MP_ACCESS_TOKEN en las variables de entorno del servidor.');
        }

        const externalRef = payload.cmp_uuid ? `${payload.cmp_uuid}|${payload.ord_uuid}` : payload.ord_uuid;

        const mpBody = {
            token: payload.token,
            issuer_id: payload.issuer_id ? Number(payload.issuer_id) : undefined,
            payment_method_id: payload.payment_method_id,
            transaction_amount: Number(payload.transaction_amount),
            installments: Number(payload.installments || 1),
            payer: {
                email: payload.payer?.email || 'cliente@atsmarket.com',
                identification: payload.payer?.identification
            },
            external_reference: externalRef,
            description: `Compra en ATSMarket - Orden #${payload.ord_uuid.substring(0, 8)}`
        };

        console.log('🚀 [ProcessPaymentUseCase] Enviando cobro a API /v1/payments de Mercado Pago:', {
            payment_method_id: payload.payment_method_id,
            transaction_amount: payload.transaction_amount,
            external_reference: externalRef
        });

        const idempotencyKey = `pay-${payload.ord_uuid}-${Date.now()}`;

        const response = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Idempotency-Key': idempotencyKey
            },
            body: JSON.stringify(mpBody)
        });

        const responseData: any = await response.json();

        if (!response.ok) {
            console.error('❌ [ProcessPaymentUseCase] Error al crear pago en MP:', responseData);
            throw new Error(responseData.message || responseData.error || 'Error al procesar el pago con Mercado Pago.');
        }

        console.log(`✅ [ProcessPaymentUseCase] Pago creado exitosamente en MP. ID: ${responseData.id}, Status: ${responseData.status}`);

        return {
            success: true,
            paymentId: responseData.id,
            status: responseData.status,
            statusDetail: responseData.status_detail,
            data: responseData
        };
    }
}
