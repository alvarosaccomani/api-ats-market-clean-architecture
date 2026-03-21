import { v4 as uuid } from "uuid";
import moment from 'moment';
import { PaymentMethodEntity } from "./payment-method.entity";

export class PaymentMethodValue implements PaymentMethodEntity {
    cmp_uuid: string;
    pmt_uuid: string;
    pmt_name: string;
    pmt_order: number;
    pmt_bkcolor: string;
    pmt_frcolor: string;
    pmt_active: boolean;
    pmt_createdat: Date;
    pmt_updatedat: Date;
    
    constructor({
            cmp_uuid,
            pmt_uuid,
            pmt_name,
            pmt_order,
            pmt_bkcolor,
            pmt_frcolor,
            pmt_active,
            pmt_createdat,
            pmt_updatedat
        }:{ 
            cmp_uuid: string,
            pmt_uuid: string,
            pmt_name: string,
            pmt_order: number,
            pmt_bkcolor: string,
            pmt_frcolor: string,
            pmt_active: boolean,
            pmt_createdat?: Date,
            pmt_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.pmt_uuid = uuid();
        this.pmt_name = pmt_name;
        this.pmt_order = pmt_order;
        this.pmt_bkcolor = pmt_bkcolor;
        this.pmt_frcolor = pmt_frcolor;
        this.pmt_active = pmt_active;
        this.pmt_createdat = pmt_createdat ?? moment().toDate();
        this.pmt_updatedat = pmt_updatedat ?? moment().toDate();
    }
}