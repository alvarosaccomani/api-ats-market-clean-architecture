import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ArticleEntity } from "./article.entity";

export class ArticleValue implements ArticleEntity {
    cmp_uuid: string;
    art_uuid: string;
    art_code: string;    
    art_name: string;
    art_image: string;
    art_description: string;    
    art_pricecost: number;
    art_stock: number;
    sup_uuid: string;
    itm_uuid: string;
    cat_uuid: string;
    art_createdat: Date;
    art_updatedat: Date;
    
    constructor({
            cmp_uuid,
            art_uuid,
            art_code,
            art_name,
            art_image,
            art_description,
            art_pricecost,
            art_stock,
            sup_uuid,
            itm_uuid,
            cat_uuid,
            art_createdat,
            art_updatedat
        }:{ 
            cmp_uuid: string,
            art_uuid: string,
            art_code: string,
            art_name: string,
            art_image: string,
            art_description: string,    
            art_pricecost: number,
            art_stock: number,
            sup_uuid: string,
            itm_uuid: string,
            cat_uuid: string,
            art_createdat?: Date,
            art_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.art_uuid = uuid();
        this.art_code = art_code;
        this.art_name = art_name;
        this.art_image = art_image;
        this.art_description = art_description;  
        this.art_pricecost = art_pricecost;
        this.art_stock = art_stock;
        this.sup_uuid = sup_uuid;
        this.itm_uuid = itm_uuid;
        this.cat_uuid = cat_uuid;
        this.art_createdat = art_createdat ?? moment().toDate();
        this.art_updatedat = art_updatedat ?? moment().toDate();
    }
}