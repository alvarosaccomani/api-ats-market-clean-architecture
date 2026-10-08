import { Request, Response } from "express";
import { PaymentWebhookLogUseCase } from "../../../application/payment-webhook-log/payment-webhook-log-use-case";
import { ProcessPaymentUseCase } from "../../../application/payment-webhook-log/process-payment-use-case";
import SocketAdapter from "../../services/socketAdapter";

export class MercadoPagoWebhookController {
    constructor(
        private webhookUseCase: PaymentWebhookLogUseCase,
        private processPaymentUseCase: ProcessPaymentUseCase,
        private socketAdapter?: SocketAdapter
    ) {
        this.receiveWebhookCtrl = this.receiveWebhookCtrl.bind(this);
        this.processPaymentCtrl = this.processPaymentCtrl.bind(this);
    }

    public async processPaymentCtrl(req: Request, res: Response) {
        try {
            const payload = req.body;
            console.log('💳 [Controller MP] Recibida solicitud de cobro con token de Brick:', payload);
            const result = await this.processPaymentUseCase.execute(payload);
            return res.status(200).json({
                success: true,
                message: 'Pago procesado en Mercado Pago.',
                data: result
            });
        } catch (error: any) {
            console.error('❌ [Controller MP] Error al procesar cobro:', error.message);
            return res.status(400).json({
                success: false,
                message: 'Error al procesar cobro.',
                error: error.message
            });
        }
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
