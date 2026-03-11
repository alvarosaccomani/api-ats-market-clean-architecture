import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ItemEntity } from "./item.entity";

export class ItemValue implements ItemEntity {
    cmp_uuid: string;
    itm_uuid: string;    
    itm_name: string;
    itm_description: string;
    itm_createdat: Date;
    itm_updatedat: Date;
    
    constructor({
            cmp_uuid,
            itm_uuid,
            itm_name,
            itm_description,
            itm_createdat,
            itm_updatedat
        }:{ 
            cmp_uuid: string,
            itm_uuid: string,
            itm_name: string,
            itm_description: string,
            itm_createdat?: Date,
            itm_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.itm_uuid = uuid();
        this.itm_name = itm_name;
        this.itm_description = itm_description;
        this.itm_createdat = itm_createdat ?? moment().toDate();
        this.itm_updatedat = itm_updatedat ?? moment().toDate();
    }
}