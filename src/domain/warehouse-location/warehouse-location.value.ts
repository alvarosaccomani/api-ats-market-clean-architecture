import { v4 as uuid } from "uuid";
import moment from 'moment';
import { WarehouseLocationEntity } from "./warehouse-location.entity";

export class WarehouseLocationValue implements WarehouseLocationEntity {
    cmp_uuid: string;
    war_uuid: string;
    warl_uuid: string;
    warl_aisle: string;
    warl_sector: string;
    warl_rack: string;
    warl_shelf: string;
    warl_bincode: string;
    warl_active: boolean;
    warl_createdat: Date;
    warl_updatedat: Date;
    
    constructor(params: { 
        cmp_uuid: string;
        war_uuid: string;
        warl_uuid: string;
        warl_aisle: string;
        warl_sector: string;
        warl_rack: string;
        warl_shelf: string;
        warl_bincode: string;
        warl_active: boolean;
        warl_createdat?: Date;
        warl_updatedat?: Date;
    }) {
        this.cmp_uuid = params.cmp_uuid;
        this.war_uuid = params.war_uuid;
        this.warl_uuid = uuid();
        this.warl_aisle = params.warl_aisle;
        this.warl_sector = params.warl_sector;
        this.warl_rack = params.warl_rack;
        this.warl_shelf = params.warl_shelf;
        this.warl_bincode = params.warl_bincode;
        this.warl_active = params.warl_active;
        this.warl_createdat = params.warl_createdat ?? moment().toDate();
        this.warl_updatedat = params.warl_updatedat ?? moment().toDate();
    }
}