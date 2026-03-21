import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CustomerEntity } from "./customer.entity";

export class CustomerValue implements CustomerEntity {
    cmp_uuid: string;
    cus_uuid: string;
    cus_fullname: string;
    cus_email: string;
    cus_phone: string;
    cus_dateofbirth: Date;
    pmt_uuid: string;
    usr_uuid: string;
    cus_createdat: Date;
    cus_updatedat: Date;
    
    constructor({
            cmp_uuid,
            cus_uuid,
            cus_fullname,
            cus_email,
            cus_phone,
            cus_dateofbirth,
            pmt_uuid,
            usr_uuid,
            cus_createdat,
            cus_updatedat
        }:{ 
            cmp_uuid: string,
            cus_uuid: string,
            cus_fullname: string,
            cus_email: string,
            cus_phone: string,
            cus_dateofbirth: Date,
            pmt_uuid: string,
            usr_uuid: string,
            cus_createdat?: Date,
            cus_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.cus_uuid = cus_uuid;
        this.cus_fullname = cus_fullname;
        this.cus_email = cus_email;
        this.cus_phone = cus_phone;
        this.cus_dateofbirth = cus_dateofbirth;
        this.pmt_uuid = pmt_uuid;
        this.usr_uuid = usr_uuid;
        this.cus_createdat = cus_createdat ?? moment().toDate();
        this.cus_updatedat = cus_updatedat ?? moment().toDate();
    }
}