import { v4 as uuid } from "uuid";
import moment from 'moment';
import { GlobalCategoryEntity } from "./global-category.entity";

export class GlobalCategoryValue implements GlobalCategoryEntity {    
    gitm_uuid: string;
    gcat_uuid: string;
    gcat_name: string;
    gcat_description: string;
    gcat_createdat: Date;
    gcat_updatedat: Date;
    
    constructor({
            gitm_uuid,
            gcat_uuid,
            gcat_name,
            gcat_description,
            gcat_createdat,
            gcat_updatedat
        }:{ 
            gitm_uuid: string,
            gcat_uuid: string,
            gcat_name: string,
            gcat_description: string,
            gcat_createdat?: Date,
            gcat_updatedat?: Date
        }) {
        this.gitm_uuid = gitm_uuid;
        this.gcat_uuid = uuid();
        this.gcat_name = gcat_name;
        this.gcat_description = gcat_description;
        this.gcat_createdat = gcat_createdat ?? moment().toDate();
        this.gcat_updatedat = gcat_updatedat ?? moment().toDate();
    }
}