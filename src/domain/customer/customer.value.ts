import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CustomerEntity } from "./customer.entity";

export class CustomerValue implements CustomerEntity {
    usr_uuid: string;
    cus_uuid: string;
    cus_fullname: string;
    cus_email: string;
    cus_phone: string;
    cus_dateofbirth: Date;
    cus_createdat: Date;
    cus_updatedat: Date;
    
    constructor({
            usr_uuid,
            cus_uuid,
            cus_fullname,
            cus_email,
            cus_phone,
            cus_dateofbirth,
            cus_createdat,
            cus_updatedat
        }:{ 
            usr_uuid: string,
            cus_uuid: string,
            cus_fullname: string,
            cus_email: string,
            cus_phone: string,
            cus_dateofbirth: Date,
            cus_createdat?: Date,
            cus_updatedat?: Date
        }) {
        this.usr_uuid = usr_uuid;
        this.cus_uuid = uuid();
        this.cus_fullname = cus_fullname;
        this.cus_email = cus_email;
        this.cus_phone = cus_phone;
        this.cus_dateofbirth = cus_dateofbirth;
        this.cus_createdat = cus_createdat ?? moment().toDate();
        this.cus_updatedat = cus_updatedat ?? moment().toDate();
    }
}