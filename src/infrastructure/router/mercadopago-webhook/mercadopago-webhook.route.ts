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

    // Ruta para procesar el pago con el token obtenido del Payment Brick desde Angular
    app.post(`/${process.env.BASE_URL_API}/payments/process`, webhookCtrl.processPaymentCtrl);

    // Ruta de webhook pública que recibe notificaciones POST y GET de Mercado Pago
    app.post(`/${process.env.BASE_URL_API}/payments/mercadopago/webhook`, webhookCtrl.receiveWebhookCtrl);
    app.get(`/${process.env.BASE_URL_API}/payments/mercadopago/webhook`, webhookCtrl.receiveWebhookCtrl);
}

export default configureMercadoPagoWebhookRoutes;
