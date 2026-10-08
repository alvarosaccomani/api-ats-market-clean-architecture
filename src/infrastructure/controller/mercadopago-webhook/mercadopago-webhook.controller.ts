import { Request, Response } from "express";
import { PaymentWebhookLogUseCase } from "../../../application/payment-webhook-log/payment-webhook-log-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class MercadoPagoWebhookController {
    constructor(
        private webhookUseCase: PaymentWebhookLogUseCase,
        private socketAdapter?: SocketAdapter
    ) {
        this.receiveWebhookCtrl = this.receiveWebhookCtrl.bind(this);
    }

    public async receiveWebhookCtrl(req: Request, res: Response) {
        try {
            console.log('📩 [Webhook MP Controller] Recibida notificación Webhook:', {
                query: req.query,
                body: req.body
            });

            // Procesar el webhook usando el caso de uso (Idempotencia + MP Verification + WebSockets)
            const result = await this.webhookUseCase.handleMercadoPagoWebhook(
                req.body,
                req.query,
                this.socketAdapter,
                req.headers
            );

            // Mercado Pago requiere una respuesta HTTP 200/201 inmediata para confirmar la recepción
            return res.status(200).json({
                success: true,
                message: 'Webhook recibido y procesado correctamente.',
                result
            });
        } catch (error: any) {
            console.error('❌ [Webhook MP Controller] Error al procesar Webhook:', error.message);
            
            // Retornar 200 con status error para evitar que MP reintente infinitamente en caso de error interno de lógica
            return res.status(200).json({
                success: false,
                message: 'Error procesando webhook.',
                error: error.message
            });
        }
    }
}
