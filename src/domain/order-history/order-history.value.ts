import { v4 as uuid } from "uuid";
import moment from 'moment';
import { OrderHistoryEntity } from "./order-history.entity";

export class OrderHistoryValue implements OrderHistoryEntity {
    cmp_uuid: string;
    ord_uuid: string;
    ordh_uuid: string;
    ords_uuid: string;
    usr_uuid: string;
    ordh_comment: string;
    ordh_createdat: Date;
    
    constructor({
            cmp_uuid,
            ord_uuid,
            ordh_uuid,
            ords_uuid,
            usr_uuid,
            ordh_comment,
            ordh_createdat
        }:{ 
            cmp_uuid: string,
            ord_uuid: string,
            ordh_uuid?: string,
            ords_uuid: string,
            usr_uuid: string,
            ordh_comment: string,
            ordh_createdat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.ord_uuid = ord_uuid;
        this.ordh_uuid = ordh_uuid ?? uuid();
        this.ords_uuid = ords_uuid;
        this.usr_uuid = usr_uuid;
        this.ordh_comment = ordh_comment;
        this.ordh_createdat = ordh_createdat ?? moment().toDate();
    }
}