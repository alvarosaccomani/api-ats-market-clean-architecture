import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CategoryEntity } from "./category.entity";

export class CategoryValue implements CategoryEntity {
    cmp_uuid: string;
    itm_uuid: string;    
    cat_uuid: string;
    gitm_uuid: string;
    gcat_uuid: string;
    cat_name: string;
    cat_description: string;
    cat_createdat: Date;
    cat_updatedat: Date;
    
    constructor({
            cmp_uuid,
            itm_uuid,
            cat_uuid,
            gitm_uuid,
            gcat_uuid,
            cat_name,
            cat_description,
            cat_createdat,
            cat_updatedat
        }:{ 
            cmp_uuid: string,
            itm_uuid: string,
            cat_uuid: string,
            gitm_uuid: string,
            gcat_uuid: string,
            cat_name: string,
            cat_description: string,
            cat_createdat?: Date,
            cat_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.itm_uuid = itm_uuid;
        this.cat_uuid = uuid();
        this.gitm_uuid = gitm_uuid;
        this.gcat_uuid = gcat_uuid;
        this.cat_name = cat_name;
        this.cat_description = cat_description;
        this.cat_createdat = cat_createdat ?? moment().toDate();
        this.cat_updatedat = cat_updatedat ?? moment().toDate();
    }
}