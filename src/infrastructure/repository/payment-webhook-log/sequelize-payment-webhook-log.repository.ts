import { PaymentWebhookLogEntity } from "../../../domain/payment-webhook-log/payment-webhook-log.entity";
import { PaymentWebhookLogRepository } from "../../../domain/payment-webhook-log/payment-webhook-log.repository";
import { SequelizePaymentWebhookLog } from "../../model/payment-webhook-log/payment-webhook-log.model";

export class SequelizePaymentWebhookLogRepository implements PaymentWebhookLogRepository {
    async findLogByProviderAndEvent(pwl_provider: string, pwl_eventid: string): Promise<PaymentWebhookLogEntity | null> {
        try {
            const log = await SequelizePaymentWebhookLog.findOne({
                where: {
                    pwl_provider,
                    pwl_eventid
                }
            });
            return log ? (log.get({ plain: true }) as PaymentWebhookLogEntity) : null;
        } catch (error: any) {
            console.error('Error en findLogByProviderAndEvent:', error.message);
            throw error;
        }
    }

    async createLog(log: PaymentWebhookLogEntity, options?: { transaction?: any }): Promise<PaymentWebhookLogEntity | null> {
        try {
            const result = await SequelizePaymentWebhookLog.create(log, {
                transaction: options?.transaction
            });
            return result ? (result.get({ plain: true }) as PaymentWebhookLogEntity) : null;
        } catch (error: any) {
            console.error('Error en createLog:', error.message);
            throw error;
        }
    }
}
