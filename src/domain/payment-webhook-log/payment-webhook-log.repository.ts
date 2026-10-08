import { PaymentWebhookLogEntity } from "./payment-webhook-log.entity";

export interface PaymentWebhookLogRepository {
    findLogByProviderAndEvent(pwl_provider: string, pwl_eventid: string): Promise<PaymentWebhookLogEntity | null>;
    createLog(log: PaymentWebhookLogEntity, options?: { transaction?: any }): Promise<PaymentWebhookLogEntity | null>;
}
