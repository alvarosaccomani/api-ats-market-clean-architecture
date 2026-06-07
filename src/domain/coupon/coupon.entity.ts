export interface CouponEntity {
    cmp_uuid: string,
    cou_uuid: string,
    cou_code: string,
    cou_type: string,
    cou_value: number,
    cou_minpurchase: number,
    cou_maxdiscount: number,
    cou_startdate: Date,
    cou_enddate: Date,
    cou_limit: number,
    cou_usedcount: number,
    cou_active: boolean,
    cou_createdat: Date,
    cou_updatedat: Date
}

//Update
export type CouponUpdateData = Pick<CouponEntity, 'cou_code' | 'cou_type' | 'cou_value' | 'cou_minpurchase' | 'cou_maxdiscount' | 'cou_startdate' | 'cou_enddate' | 'cou_limit' | 'cou_usedcount' | 'cou_active'>;