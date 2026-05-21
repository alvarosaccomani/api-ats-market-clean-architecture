import { v4 as uuid } from "uuid";
import moment from 'moment';
import { OrderDetailEntity } from "./order-detail.entity";

export class OrderDetailValue implements OrderDetailEntity {
    cmp_uuid: string;
    ord_uuid: string;
    ordd_uuid: string;
    pro_uuid: string;
    prov_uuid?: string;
    ordd_productname: string;
    ordd_code: string;
    ordd_sku: string;
    ordd_quantity: number;
    ordd_unitprice: number;
    ordd_discount?: number;
    ordd_subtotal?: number;
    ordd_taxrate?: number;
    ordd_tax?: number;
    ordd_basecost?: number;
    ordd_createdat?: Date;
    ordd_updatedat?: Date;
    
    constructor(params: { 
        cmp_uuid: string;
        ord_uuid: string;
        ordd_uuid?: string;
        pro_uuid: string;
        prov_uuid?: string;
        ordd_productname: string;
        ordd_code: string;
        ordd_sku: string;
        ordd_quantity: number;
        ordd_unitprice: number;
        ordd_discount?: number;
        ordd_subtotal?: number;
        ordd_taxrate?: number;
        ordd_tax?: number;
        ordd_basecost?: number;
        ordd_createdat?: Date;
        ordd_updatedat?: Date;
    }) {
        this.cmp_uuid = params.cmp_uuid;
        this.ord_uuid = params.ord_uuid;
        this.ordd_uuid = params.ordd_uuid ?? uuid();
        this.pro_uuid = params.pro_uuid;
        this.prov_uuid = params.prov_uuid;
        this.ordd_productname = params.ordd_productname;
        this.ordd_code = params.ordd_code;
        this.ordd_sku = params.ordd_sku;
        this.ordd_quantity = params.ordd_quantity;
        this.ordd_unitprice = params.ordd_unitprice;
        this.ordd_discount = params.ordd_discount ?? 0;
        this.ordd_subtotal = params.ordd_subtotal ?? (params.ordd_quantity * params.ordd_unitprice - (params.ordd_discount ?? 0));
        this.ordd_taxrate = params.ordd_taxrate ?? 0;
        this.ordd_tax = params.ordd_tax ?? 0;
        this.ordd_basecost = params.ordd_basecost ?? 0;
        this.ordd_createdat = params.ordd_createdat ?? moment().toDate();
        this.ordd_updatedat = params.ordd_updatedat ?? moment().toDate();
    }
}