import { v4 as uuid } from "uuid";
import moment from 'moment';
import { WarehouseEntity } from "./warehouse.entity";

export class WarehouseValue implements WarehouseEntity {
    cmp_uuid: string;
    war_uuid: string;
    war_name: string;
    war_address: string;
    war_lat: number;
    war_lng: number;
    war_active: boolean;
    war_createdat: Date;
    war_updatedat: Date;
    
    constructor(params: { 
        cmp_uuid: string;
        war_uuid?: string;
        war_name: string;
        war_address: string;
        war_lat: number;
        war_lng: number;
        war_active: boolean;
        war_createdat?: Date;
        war_updatedat?: Date;
    }) {
        this.cmp_uuid = params.cmp_uuid;
        this.war_uuid = params.war_uuid ?? uuid();
        this.war_name = params.war_name;
        this.war_address = params.war_address;
        this.war_lat = params.war_lat;
        this.war_lng = params.war_lng;
        this.war_active = params.war_active;
        this.war_createdat = params.war_createdat ?? moment().toDate();
        this.war_updatedat = params.war_updatedat ?? moment().toDate();
    }
}