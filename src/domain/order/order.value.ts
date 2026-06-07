import { v4 as uuid } from "uuid";
import moment from 'moment';
import { OrderEntity } from "./order.entity";
import { OrderDetailEntity } from "../order-detail/order-detail.entity";

export class OrderValue implements OrderEntity {
    cmp_uuid: string;
    ord_uuid: string;
    usr_uuid: string;
    cus_uuid: string;
    adr_uuid: string;
    ord_ordernumber: number;
    ord_customername: string;
    ord_customeremail: string;
    ord_contactphone: string;
    ords_uuid: string;
    ord_date: Date;
    ord_subtotal: number;
    ord_shippingcost: number;
    ord_tax: number;
    ord_total: number;
    ord_customernotes: string;
    ord_trackingnumber: string;
    ord_createdat: Date;
    ord_updatedat: Date;
    cou_uuid?: string | null; 
    ord_couponcode?: string | null;
    ord_discountamount?: number;
    orderDetails?: OrderDetailEntity[];
    
    constructor({
            cmp_uuid,
            ord_uuid,
            usr_uuid,
            cus_uuid,
            adr_uuid,
            ord_ordernumber,
            ord_customername,
            ord_customeremail,
            ord_contactphone,
            ords_uuid,
            ord_date,
            ord_subtotal,
            ord_shippingcost,
            ord_tax,
            ord_total,
            ord_customernotes,
            ord_trackingnumber,
            ord_createdat,
            ord_updatedat,
            cou_uuid,
            ord_couponcode,
            ord_discountamount,
            orderDetails
        }:{ 
            cmp_uuid: string,
            ord_uuid: string,
            usr_uuid: string,
            cus_uuid: string,
            adr_uuid: string,
            ord_ordernumber: number,
            ord_customername: string,
            ord_customeremail: string,
            ord_contactphone: string,
            ords_uuid: string,
            ord_date: Date,
            ord_subtotal: number,
            ord_shippingcost: number,
            ord_tax: number,
            ord_total: number,
            ord_customernotes: string,
            ord_trackingnumber: string,
            ord_createdat?: Date,
            ord_updatedat?: Date,
            cou_uuid?: string | null,
            ord_couponcode?: string | null,
            ord_discountamount?: number,
            orderDetails?: OrderDetailEntity[]
        }) {
        this.cmp_uuid = cmp_uuid;
        this.ord_uuid = uuid();
        this.usr_uuid = usr_uuid;
        this.cus_uuid = cus_uuid;
        this.adr_uuid = adr_uuid;
        this.ord_ordernumber = ord_ordernumber;
        this.ord_customername = ord_customername;
        this.ord_customeremail = ord_customeremail;
        this.ord_contactphone = ord_contactphone;
        this.ords_uuid = ords_uuid;
        this.ord_date = ord_date;
        this.ord_subtotal = ord_subtotal;
        this.ord_shippingcost = ord_shippingcost;
        this.ord_tax = ord_tax;
        this.ord_total = ord_total;
        this.ord_customernotes = ord_customernotes;
        this.ord_trackingnumber = ord_trackingnumber;
        this.ord_createdat = ord_createdat ?? moment().toDate();
        this.ord_updatedat = ord_updatedat ?? moment().toDate();
        this.cou_uuid = cou_uuid ?? null;
        this.ord_couponcode = ord_couponcode ?? null;
        this.ord_discountamount = ord_discountamount ?? 0;
        this.orderDetails = orderDetails ?? [];
    }
}