export interface PaymentMethodEntity {
    cmp_uuid: string,
    pmt_uuid: string,
    pmt_name: string,
    pmt_order: number,
    pmt_bkcolor: string,
    pmt_frcolor: string,
    pmt_active: boolean,
    pmt_createdat: Date,
    pmt_updatedat: Date
}

//Update
export type PaymentMethodUpdateData = Pick<PaymentMethodEntity, 'pmt_name' | 'pmt_order' | 'pmt_bkcolor' | 'pmt_frcolor' | 'pmt_active'>
