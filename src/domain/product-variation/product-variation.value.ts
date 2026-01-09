import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ProductVariationEntity } from "./product-variation.entity";

export class ProductVariationValue implements ProductVariationEntity {
    cmp_uuid: string;
    pro_uuid: string;
    prov_uuid: string;
    prov_code: string;    
    prov_sku: string;
    prov_name: string;
    prov_description: string;
    prov_image: string;
    prov_color: string;
    prov_size: string;
    prov_stock: number;
    prov_suggestedminimumsellingprice: number;
    prov_createdat: Date;
    prov_updatedat: Date;
    
    constructor({
            cmp_uuid,
            pro_uuid,
            prov_uuid,
            prov_code,
            prov_sku,
            prov_name,
            prov_description,
            prov_image,
            prov_color,
            prov_size,
            prov_stock,
            prov_suggestedminimumsellingprice,
            prov_createdat,
            prov_updatedat
        }:{ 
            cmp_uuid: string,
            pro_uuid: string,
            prov_uuid: string,
            prov_code: string,
            prov_sku: string,
            prov_name: string,
            prov_description: string,
            prov_image: string,
            prov_color: string,
            prov_size: string,
            prov_stock: number,
            prov_suggestedminimumsellingprice: number,
            prov_createdat?: Date,
            prov_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.pro_uuid = pro_uuid;
        this.prov_uuid = uuid();
        this.prov_code = prov_code;
        this.prov_sku = prov_sku;
        this.prov_name = prov_name;
        this.prov_description = prov_description;
        this.prov_image = prov_image;
        this.prov_color = prov_color;
        this.prov_size = prov_size;
        this.prov_stock = prov_stock;
        this.prov_suggestedminimumsellingprice = prov_suggestedminimumsellingprice;
        this.prov_createdat = prov_createdat ?? moment().toDate();
        this.prov_updatedat = prov_updatedat ?? moment().toDate();
    }
}