import { v4 as uuid } from "uuid";
import moment from 'moment';
import { GlobalItemEntity } from "./global-item.entity";

export class GlobalItemValue implements GlobalItemEntity {    
    gitm_uuid: string;
    gitm_name: string;
    gitm_description: string;
    gitm_image: string;
    gitm_createdat: Date;
    gitm_updatedat: Date;
    
    constructor({
            gitm_uuid,
            gitm_name,
            gitm_description,
            gitm_image,
            gitm_createdat,
            gitm_updatedat
        }:{ 
            gitm_uuid: string,
            gitm_name: string,
            gitm_description: string,
            gitm_image: string,
            gitm_createdat?: Date,
            gitm_updatedat?: Date
        }) {
        this.gitm_uuid = uuid();
        this.gitm_name = gitm_name;
        this.gitm_description = gitm_description;
        this.gitm_image = gitm_image;
        this.gitm_createdat = gitm_createdat ?? moment().toDate();
        this.gitm_updatedat = gitm_updatedat ?? moment().toDate();
    }
}