export interface PaymentWebhookLogEntity {
    pwl_uuid: string;
    pwl_provider: 'MERCADO_PAGO' | 'STRIPE';
    pwl_eventid: string;
    pwl_paymentid?: string | null;
    cmp_uuid?: string | null;
    ord_uuid?: string | null;
    pwl_status: 'PROCESSED' | 'IGNORED' | 'FAILED';
    pwl_payload?: any;
    pwl_errormessage?: string | null;
    pwl_createdat?: Date;
    pwl_updatedat?: Date;
}
