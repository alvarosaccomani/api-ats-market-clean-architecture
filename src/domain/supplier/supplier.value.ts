import { v4 as uuid } from "uuid";
import moment from 'moment';
import { SupplierEntity } from "./supplier.entity";

export class SupplierValue implements SupplierEntity {
    cmp_uuid: string;
    sup_uuid: string;
    sup_fullname: string;
    sup_email: string;
    sup_phone: string;
    pmt_uuid: string;
    usr_uuid: string;
    sup_createdat: Date;
    sup_updatedat: Date;
    
    constructor({
            cmp_uuid,
            sup_uuid,
            sup_fullname,
            sup_email,
            sup_phone,
            pmt_uuid,
            usr_uuid,
            sup_createdat,
            sup_updatedat
        }:{ 
            cmp_uuid: string,
            sup_uuid: string,
            sup_fullname: string,
            sup_email: string,
            sup_phone: string,
            pmt_uuid: string,
            usr_uuid: string,
            sup_createdat?: Date,
            sup_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.sup_uuid = uuid();
        this.sup_fullname = sup_fullname;
        this.sup_email = sup_email;
        this.sup_phone = sup_phone;
        this.pmt_uuid = pmt_uuid;
        this.usr_uuid = usr_uuid;
        this.sup_createdat = sup_createdat ?? moment().toDate();
        this.sup_updatedat = sup_updatedat ?? moment().toDate();
    }
}