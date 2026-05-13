import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CostPerSupplierEntity } from "./cost-per-supplier.entity";

export class CostPerSupplierValue implements CostPerSupplierEntity {
    cmp_uuid: string;
    pro_uuid: string;
    prov_uuid: string;
    sup_uuid: string;
    cps_uuid: string;
    cps_pricecost: number;
    cps_basecost: boolean;
    cur_uuid: string;
    cps_exchangerate: number;
    cps_suppliersku: string;
    cps_leadtimedays: number;
    cps_miniumorderquanty: number;
    cps_boxquantity: number;
    cps_notes: string;
    cps_suggestedminimumsellingprice: number;
    cps_date: Date;
    cps_createdat: Date;
    cps_updatedat: Date;
    
    constructor({
            cmp_uuid,
            pro_uuid,
            prov_uuid,
            sup_uuid,
            cps_uuid,
            cps_pricecost,
            cps_basecost,
            cur_uuid,
            cps_exchangerate,
            cps_suppliersku,
            cps_leadtimedays,
            cps_miniumorderquanty,
            cps_boxquantity,
            cps_notes,
            cps_suggestedminimumsellingprice,
            cps_date,
            cps_createdat,
            cps_updatedat,
        }:{ 
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
            cps_createdat?: Date,
            cps_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.pro_uuid = pro_uuid;
        this.prov_uuid = prov_uuid;
        this.sup_uuid = sup_uuid;
        this.cps_uuid = uuid();
        this.cps_pricecost = cps_pricecost;
        this.cps_basecost = cps_basecost;
        this.cur_uuid = cur_uuid;
        this.cps_exchangerate = cps_exchangerate;
        this.cps_suppliersku = cps_suppliersku;
        this.cps_leadtimedays = cps_leadtimedays;
        this.cps_miniumorderquanty = cps_miniumorderquanty;
        this.cps_boxquantity = cps_boxquantity;
        this.cps_notes = cps_notes;
        this.cps_suggestedminimumsellingprice = cps_suggestedminimumsellingprice;
        this.cps_date = cps_date;
        this.cps_createdat = cps_createdat ?? moment().toDate();
        this.cps_updatedat = cps_updatedat ?? moment().toDate();
    }
}