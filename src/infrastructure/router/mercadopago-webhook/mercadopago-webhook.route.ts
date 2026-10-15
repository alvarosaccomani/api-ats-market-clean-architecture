import { Express } from "express";
import { SequelizePaymentWebhookLogRepository } from "../../repository/payment-webhook-log/sequelize-payment-webhook-log.repository";
import { SequelizeRepository as SequelizeOrderRepository } from "../../repository/order/sequelize-order.repository";
import { PaymentWebhookLogUseCase } from "../../../application/payment-webhook-log/payment-webhook-log-use-case";
import { ProcessPaymentUseCase } from "../../../application/payment-webhook-log/process-payment-use-case";
import { MercadoPagoWebhookController } from "../../controller/mercadopago-webhook/mercadopago-webhook.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureMercadoPagoWebhookRoutes(app: Express, socketAdapter: SocketAdapter) {
    const webhookLogRepository = new SequelizePaymentWebhookLogRepository();
    const orderRepository = new SequelizeOrderRepository();

    const webhookUseCase = new PaymentWebhookLogUseCase(webhookLogRepository, orderRepository);
    const processPaymentUseCase = new ProcessPaymentUseCase();
    const webhookCtrl = new MercadoPagoWebhookController(webhookUseCase, processPaymentUseCase, socketAdapter);

    /**
     * @swagger
     * /payments/process:
     *   post:
     *     summary: Procesar cobro con token obtenido de Mercado Pago Payment Brick
     *     tags:
     *       - Payments & Webhooks
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProcessPaymentDto'
     *     responses:
     *       200:
     *         description: Pago procesado correctamente en Mercado Pago.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 data:
     *                   type: object
     *       400:
     *         description: Error al procesar el pago.
     */
    app.post(`/${process.env.BASE_URL_API}/payments/process`, webhookCtrl.processPaymentCtrl);

    /**
     * @swagger
     * /payments/mercadopago/webhook:
     *   post:
     *     summary: Recibir notificación webhook de Mercado Pago (IPN / Webhook POST)
     *     tags:
     *       - Payments & Webhooks
     *     parameters:
     *       - in: query
     *         name: data.id
     *         schema:
     *           type: string
     *         description: ID del recurso de Mercado Pago
     *       - in: query
     *         name: type
     *         schema:
     *           type: string
     *         description: Tipo de notificación (ej. payment)
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/MercadoPagoWebhookNotification'
     *     responses:
     *       200:
     *         description: Webhook recibido y procesado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *   get:
     *     summary: Recibir notificación webhook de Mercado Pago vía query string (GET)
     *     tags:
     *       - Payments & Webhooks
     *     parameters:
     *       - in: query
     *         name: id
     *         schema:
     *           type: string
     *         description: ID de la notificación
     *       - in: query
     *         name: topic
     *         schema:
     *           type: string
     *         description: Tema o tópico (ej. merchant_order, payment)
     *     responses:
     *       200:
     *         description: Webhook confirmado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     */
    app.post(`/${process.env.BASE_URL_API}/payments/mercadopago/webhook`, webhookCtrl.receiveWebhookCtrl);
    app.get(`/${process.env.BASE_URL_API}/payments/mercadopago/webhook`, webhookCtrl.receiveWebhookCtrl);
}

export default configureMercadoPagoWebhookRoutes;
