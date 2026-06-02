import { v4 as uuid } from "uuid";
import moment from 'moment';
import { MessageEntity } from "./message.entity";

export class MessageValue implements MessageEntity {
    cmp_uuid: string;
    msg_uuid: string;
    ord_uuid: string;
    msg_sender: string;
    usr_uuid: string;
    cus_uuid: string | null;
    msg_sendername: string;
    msg_text: string;
    msg_createdat: Date;
    msg_updatedat: Date;
    
    constructor({
            cmp_uuid,
            msg_uuid,
            ord_uuid,
            msg_sender,
            usr_uuid,
            cus_uuid,
            msg_sendername,
            msg_text,
            msg_createdat,
            msg_updatedat
        }:{ 
            cmp_uuid: string,
            msg_uuid?: string,
            ord_uuid: string,
            msg_sender: string,
            usr_uuid: string,
            cus_uuid?: string | null,
            msg_sendername: string,
            msg_text: string,
            msg_createdat?: Date,
            msg_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.msg_uuid = msg_uuid ?? uuid();
        this.ord_uuid = ord_uuid;
        this.msg_sender = msg_sender;
        this.usr_uuid = usr_uuid;
        this.cus_uuid = cus_uuid ?? null;
        this.msg_sendername = msg_sendername;
        this.msg_text = msg_text;
        this.msg_createdat = msg_createdat ?? moment().toDate();
        this.msg_updatedat = msg_updatedat ?? moment().toDate();
    }
}