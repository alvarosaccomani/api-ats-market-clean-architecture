import { v4 as uuid } from "uuid";
import moment from 'moment';
import { GlobalMaterialEntity } from "./global-material.entity";

export class GlobalMaterialValue implements GlobalMaterialEntity {    
    gmat_uuid: string;
    gmat_name: string;
    gmat_description: string;
    gmat_image: string;
    gmat_createdat: Date;
    gmat_updatedat: Date;
    
    constructor({
            gmat_uuid,
            gmat_name,
            gmat_description,
            gmat_image,
            gmat_createdat,
            gmat_updatedat
        }:{ 
            gmat_uuid: string,
            gmat_name: string,
            gmat_description: string,
            gmat_image: string,
            gmat_createdat?: Date,
            gmat_updatedat?: Date
        }) {
        this.gmat_uuid = uuid();
        this.gmat_name = gmat_name;
        this.gmat_description = gmat_description;
        this.gmat_image = gmat_image;
        this.gmat_createdat = gmat_createdat ?? moment().toDate();
        this.gmat_updatedat = gmat_updatedat ?? moment().toDate();
    }
}