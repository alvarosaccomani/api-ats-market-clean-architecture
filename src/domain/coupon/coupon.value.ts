import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CouponEntity } from "./coupon.entity";

export class CouponValue implements CouponEntity {
    cmp_uuid: string;
    cou_uuid: string;
    cou_code: string;
    cou_type: string;
    cou_value: number;
    cou_minpurchase: number;
    cou_maxdiscount: number;
    cou_startdate: Date;
    cou_enddate: Date;
    cou_limit: number;
    cou_usedcount: number;
    cou_active: boolean;
    cou_createdat: Date;
    cou_updatedat: Date;
    
    constructor({
            cmp_uuid,
            cou_uuid,
            cou_code,
            cou_type,
            cou_value,
            cou_minpurchase,
            cou_maxdiscount,
            cou_startdate,
            cou_enddate,
            cou_limit,
            cou_usedcount,
            cou_active,
            cou_createdat,
            cou_updatedat
        }:{ 
            cmp_uuid: string,
            cou_uuid?: string,
            cou_code: string,
            cou_type: string,
            cou_value: number,
            cou_minpurchase?: number,
            cou_maxdiscount?: number,
            cou_startdate: Date,
            cou_enddate: Date,
            cou_limit?: number,
            cou_usedcount?: number,
            cou_active?: boolean,
            cou_createdat?: Date,
            cou_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cou_uuid = cou_uuid || uuid();
        this.cou_code = cou_code.toUpperCase().trim();
        this.cou_type = cou_type;
        this.cou_value = cou_value;
        this.cou_minpurchase = cou_minpurchase ?? 0;
        this.cou_maxdiscount = cou_maxdiscount ?? 0;
        this.cou_startdate = cou_startdate;
        this.cou_enddate = cou_enddate;
        this.cou_limit = cou_limit ?? 999999;
        this.cou_usedcount = cou_usedcount ?? 0;
        this.cou_active = cou_active ?? true;
        this.cou_createdat = cou_createdat ?? moment().toDate();
        this.cou_updatedat = cou_updatedat ?? moment().toDate();
    }
}