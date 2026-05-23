import { v4 as uuid } from "uuid";
import moment from 'moment';
import { OrderStatusEntity } from "./order-status.entity";

export class OrderStatusValue implements OrderStatusEntity {
    ords_uuid: string;
    ords_code: string;    
    ords_name: string;
    ords_description: string;
    ords_bkcolor: string;
    ords_frcolor: string;
    ords_createdat: Date;
    ords_updatedat: Date;
    
    constructor(params: {
        ords_uuid?: string;
        ords_code: string;
        ords_name: string;
        ords_description: string;
        ords_bkcolor: string;
        ords_frcolor: string;
        ords_createdat?: Date;
        ords_updatedat?: Date;
    }) {
        this.ords_uuid = params.ords_uuid ?? uuid();
        this.ords_code = params.ords_code;
        this.ords_name = params.ords_name;
        this.ords_description = params.ords_description;
        this.ords_bkcolor = params.ords_bkcolor;
        this.ords_frcolor = params.ords_frcolor;
        this.ords_createdat = params.ords_createdat ?? moment().toDate();
        this.ords_updatedat = params.ords_updatedat ?? moment().toDate();
    }
}