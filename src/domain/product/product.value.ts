import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ProductEntity } from "./product.entity";

export class ProductValue implements ProductEntity {
    cmp_uuid: string;
    pro_uuid: string;
    pro_code: string;    
    pro_name: string;
    pro_image: string;
    pro_description: string;
    itm_uuid: string;
    cat_uuid: string;
    pro_createdat: Date;
    pro_updatedat: Date;
    
    constructor({
            cmp_uuid,
            pro_uuid,
            pro_code,
            pro_name,
            pro_image,
            pro_description,
            itm_uuid,
            cat_uuid,
            pro_createdat,
            pro_updatedat
        }:{ 
            cmp_uuid: string,
            pro_uuid: string,
            pro_code: string,
            pro_name: string,
            pro_image: string,
            pro_description: string,
            itm_uuid: string,
            cat_uuid: string,
            pro_createdat?: Date,
            pro_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.pro_uuid = uuid();
        this.pro_code = pro_code;
        this.pro_name = pro_name;
        this.pro_image = pro_image;
        this.pro_description = pro_description;
        this.itm_uuid = itm_uuid;
        this.cat_uuid = cat_uuid;
        this.pro_createdat = pro_createdat ?? moment().toDate();
        this.pro_updatedat = pro_updatedat ?? moment().toDate();
    }
}