import { v4 as uuid } from "uuid";
import { PaymentWebhookLogEntity } from "./payment-webhook-log.entity";

export class PaymentWebhookLogValue implements PaymentWebhookLogEntity {
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

    constructor({
        pwl_provider,
        pwl_eventid,
        pwl_paymentid,
        cmp_uuid,
        ord_uuid,
        pwl_status = 'PROCESSED',
        pwl_payload,
        pwl_errormessage
    }: {
        pwl_provider: 'MERCADO_PAGO' | 'STRIPE';
        pwl_eventid: string;
        pwl_paymentid?: string | null;
        cmp_uuid?: string | null;
        ord_uuid?: string | null;
        pwl_status?: 'PROCESSED' | 'IGNORED' | 'FAILED';
        pwl_payload?: any;
        pwl_errormessage?: string | null;
    }) {
        this.pwl_uuid = uuid();
        this.pwl_provider = pwl_provider;
        this.pwl_eventid = pwl_eventid;
        this.pwl_paymentid = pwl_paymentid || null;
        this.cmp_uuid = cmp_uuid || null;
        this.ord_uuid = ord_uuid || null;
        this.pwl_status = pwl_status;
        this.pwl_payload = pwl_payload || null;
        this.pwl_errormessage = pwl_errormessage || null;
        this.pwl_createdat = new Date();
        this.pwl_updatedat = new Date();
    }
}
