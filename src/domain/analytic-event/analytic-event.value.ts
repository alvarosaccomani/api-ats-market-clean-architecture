import { v4 as uuid } from "uuid";
import moment from 'moment';
import { AnalitycEventEntity } from "./analytic-event.entity";

export class AnalitycEventValue implements AnalitycEventEntity {    
    cmp_uuid: string;
    aev_uuid: string;
    aev_eventtype: string;
    aev_targetuuid: string;
    aev_metadata: string;
    aev_createdat: Date;
    aev_updatedat: Date;
    
    constructor({
            cmp_uuid,
            aev_uuid,
            aev_eventtype,
            aev_targetuuid,
            aev_metadata,
            aev_createdat,
            aev_updatedat
        }:{ 
            cmp_uuid: string,
            aev_uuid: string,
            aev_eventtype: string,
            aev_targetuuid: string,
            aev_metadata: string,
            aev_createdat?: Date,
            aev_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.aev_uuid = uuid();
        this.aev_eventtype = aev_eventtype;
        this.aev_targetuuid = aev_targetuuid;
        this.aev_metadata = aev_metadata;
        this.aev_createdat = aev_createdat ?? moment().toDate();
        this.aev_updatedat = aev_updatedat ?? moment().toDate();
    }
}