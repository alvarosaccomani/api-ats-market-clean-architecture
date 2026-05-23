import { v4 as uuid } from "uuid";
import moment from 'moment';
import { TypeStockMovementEntity } from "./type-stock-movement.entity";

export class TypeStockMovementValue implements TypeStockMovementEntity {
    tsmo_uuid: string;
    tsmo_code: string;    
    tsmo_name: string;
    tsmo_description: string;
    tsmo_bkcolor: string;
    tsmo_frcolor: string;
    tsmo_createdat: Date;
    tsmo_updatedat: Date;
    
    constructor(params: {
        tsmo_uuid?: string;
        tsmo_code: string;
        tsmo_name: string;
        tsmo_description: string;
        tsmo_bkcolor: string;
        tsmo_frcolor: string;
        tsmo_createdat?: Date;
        tsmo_updatedat?: Date;
    }) {
        this.tsmo_uuid = params.tsmo_uuid ?? uuid();
        this.tsmo_code = params.tsmo_code;
        this.tsmo_name = params.tsmo_name;
        this.tsmo_description = params.tsmo_description;
        this.tsmo_bkcolor = params.tsmo_bkcolor;
        this.tsmo_frcolor = params.tsmo_frcolor;
        this.tsmo_createdat = params.tsmo_createdat ?? moment().toDate();
        this.tsmo_updatedat = params.tsmo_updatedat ?? moment().toDate();
    }
}