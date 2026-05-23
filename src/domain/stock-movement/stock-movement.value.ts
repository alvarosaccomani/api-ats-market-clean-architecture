import { v4 as uuid } from "uuid";
import moment from 'moment';
import { StockMovementEntity } from "./stock-movement.entity";

export class StockMovementValue implements StockMovementEntity {
    cmp_uuid: string;
    pro_uuid: string;    
    prov_uuid: string;
    smo_uuid: string;
    ord_uuid?: string;
    usr_uuid?: string;
    tsmo_uuid: string;
    smo_quantity: number;
    smo_previousstock: number;
	smo_currentstock: number;
  	smo_reason: string;
    smo_createdat: Date;
    smo_updatedat: Date;
    
    constructor(params: {
        cmp_uuid: string;
        pro_uuid: string;
        prov_uuid: string;
        smo_uuid?: string;
        ord_uuid?: string;
        usr_uuid?: string;
        tsmo_uuid: string;
        smo_quantity: number;
        smo_previousstock: number;
        smo_currentstock: number;
        smo_reason: string;
        smo_createdat?: Date;
        smo_updatedat?: Date;
    }) {
        this.cmp_uuid = params.cmp_uuid;
        this.pro_uuid = params.pro_uuid;
        this.prov_uuid = params.prov_uuid;
        this.smo_uuid = params.smo_uuid ?? uuid();
        this.ord_uuid = params.ord_uuid;
        this.usr_uuid = params.usr_uuid;
        this.tsmo_uuid = params.tsmo_uuid;
        this.smo_quantity = params.smo_quantity;
        this.smo_previousstock = params.smo_previousstock;
        this.smo_currentstock = params.smo_currentstock;
        this.smo_reason = params.smo_reason;
        this.smo_createdat = params.smo_createdat ?? moment().toDate();
        this.smo_updatedat = params.smo_updatedat ?? moment().toDate();
    }
}