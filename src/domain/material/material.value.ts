import { v4 as uuid } from "uuid";
import moment from 'moment';
import { MaterialEntity } from "./material.entity";

export class MaterialValue implements MaterialEntity {
    cmp_uuid: string;
    mat_uuid: string;    
    gmat_uuid: string;
    mat_name: string;
    mat_description: string;
    mat_createdat: Date;
    mat_updatedat: Date;
    
    constructor({
            cmp_uuid,
            mat_uuid,
            gmat_uuid,
            mat_name,
            mat_description,
            mat_createdat,
            mat_updatedat
        }:{ 
            cmp_uuid: string,
            mat_uuid: string,
            gmat_uuid: string,
            mat_name: string,
            mat_description: string,
            mat_createdat?: Date,
            mat_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.mat_uuid = uuid();
        this.gmat_uuid = gmat_uuid;
        this.mat_name = mat_name;
        this.mat_description = mat_description;
        this.mat_createdat = mat_createdat ?? moment().toDate();
        this.mat_updatedat = mat_updatedat ?? moment().toDate();
    }
}