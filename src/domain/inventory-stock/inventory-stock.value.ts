import { v4 as uuid } from "uuid";
import moment from 'moment';
import { InventoryStockEntity } from "./inventory-stock.entity";

export class InventoryStockValue implements InventoryStockEntity {
    cmp_uuid: string;
    pro_uuid: string;
    prov_uuid: string;
    war_uuid: string;
    warl_uuid: string;
    ist_quanty: number;
    ist_quantyreserved: number;
    ist_createdat: Date;
    ist_updatedat: Date;
    
    constructor(params: { 
        cmp_uuid: string;
        pro_uuid: string;
        prov_uuid: string;
        war_uuid: string;
        warl_uuid: string;
        ist_quanty: number;
        ist_quantyreserved: number;
        ist_createdat?: Date;
        ist_updatedat?: Date;
    }) {
        this.cmp_uuid = params.cmp_uuid;
        this.pro_uuid = params.pro_uuid;
        this.prov_uuid = params.prov_uuid;
        this.war_uuid = params.war_uuid;
        this.warl_uuid = params.warl_uuid;
        this.ist_quanty = params.ist_quanty;
        this.ist_quantyreserved = params.ist_quantyreserved;
        this.ist_createdat = params.ist_createdat ?? moment().toDate();
        this.ist_updatedat = params.ist_updatedat ?? moment().toDate();
    }
}