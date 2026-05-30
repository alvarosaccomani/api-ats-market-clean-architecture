import { v4 as uuid } from "uuid";
import moment from 'moment';
import { ProductVariationReviewEntity } from "./product-variation-review.entity";

export class ProductVariationReviewValue implements ProductVariationReviewEntity {
    cmp_uuid: string;
    pro_uuid: string;
    prov_uuid: string;
    provrev_uuid: string;
    usr_uuid: string;
    cus_uuid: string;
    provrev_rating: number;
    provrev_comment: string;
    provrev_isverified: boolean;
    provrev_createdat: Date;
    provrev_updatedat: Date;
    
    constructor({
            cmp_uuid,
            pro_uuid,
            prov_uuid,
            provrev_uuid,
            usr_uuid,
            cus_uuid,
            provrev_rating,
            provrev_comment,
            provrev_isverified,
            provrev_createdat,
            provrev_updatedat
        }:{ 
            cmp_uuid: string,
            pro_uuid: string,
            prov_uuid: string,
            provrev_uuid?: string,
            usr_uuid: string,
            cus_uuid: string,
            provrev_rating: number,
            provrev_comment: string,
            provrev_isverified: boolean,
            provrev_createdat?: Date,
            provrev_updatedat?: Date
        }) {
        this.cmp_uuid = cmp_uuid;
        this.pro_uuid = pro_uuid;
        this.prov_uuid = prov_uuid;
        this.provrev_uuid = provrev_uuid ?? uuid();
        this.usr_uuid = usr_uuid;
        this.cus_uuid = cus_uuid;
        this.provrev_rating = provrev_rating;
        this.provrev_comment = provrev_comment;
        this.provrev_isverified = provrev_isverified;
        this.provrev_createdat = provrev_createdat ?? moment().toDate();
        this.provrev_updatedat = provrev_updatedat ?? moment().toDate();
    }
}