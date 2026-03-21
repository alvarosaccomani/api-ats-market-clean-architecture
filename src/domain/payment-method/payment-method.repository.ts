import { PaymentMethodEntity, PaymentMethodUpdateData } from "./payment-method.entity";

export interface PaymentMethodRepository {
    getPaymentMethods(cmp_uuid: string): Promise<PaymentMethodEntity[] | null>;
    findPaymentMethodById(cmp_uuid: string, pmt_uuid: string): Promise<PaymentMethodEntity | null>;
    createPaymentMethod(paymentMethod: PaymentMethodEntity): Promise<PaymentMethodEntity | null>;
    updatePaymentMethod(cmp_uuid: string, pmt_uuid: string, paymentMethod: PaymentMethodUpdateData): Promise<PaymentMethodEntity | null>;
    deletePaymentMethod(cmp_uuid: string, pmt_uuid: string): Promise<PaymentMethodEntity | null>;
    findPaymentMethodByName(cmp_uuid: string, pmt_name: string, excludeUuid?: string | null): Promise<PaymentMethodEntity | null>;
}