export interface CostPerSupplierEntity {
    cmp_uuid: string,
    pro_uuid: string,
    prov_uuid: string,
    sup_uuid: string,
    cps_uuid: string,
    cps_pricecost: number,
    cps_basecost: boolean,
    cur_uuid: string,
    cps_exchangerate: number,
    cps_suppliersku: string,
    cps_leadtimedays: number,
    cps_miniumorderquanty: number,
    cps_boxquantity: number,
    cps_notes: string,
    cps_suggestedminimumsellingprice: number,
    cps_date: Date,
    cps_createdat: Date,
    cps_updatedat: Date,
}

//Update
export type CostPerSupplierUpdateData = Pick<CostPerSupplierEntity, 'cps_pricecost' | 'cps_basecost' | 'cps_date' | 'cur_uuid' | 'cps_exchangerate' | 'cps_suppliersku' | 'cps_leadtimedays' | 'cps_miniumorderquanty' | 'cps_boxquantity' | 'cps_notes' | 'cps_suggestedminimumsellingprice'>;