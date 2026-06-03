import { v4 as uuid } from "uuid";
import moment from 'moment';
import { AddressEntity } from "./address.entity";

export class AddressValue implements AddressEntity {
    adr_uuid: string;
    cmp_uuid: string;
    usr_uuid: string;
    cus_uuid: string;
    sup_uuid: string;
    adr_alias: string;
    adr_recipientname: string;
    adr_contactphone: string;
    adr_reference: string;
    adr_country: string;
    adr_address: string;
    adr_street: string;
    adr_number: string;
    adr_floor: string;
    adr_apartment: string;
    adr_city: string;
    adr_province: string;
    adr_postalcode: string;
    adr_lat: number;
    adr_lng: number;
    adr_createdat: Date;
    adr_updatedat: Date;
    
    constructor({
            adr_uuid,
            cmp_uuid,
            usr_uuid,
            cus_uuid,
            sup_uuid,
            adr_alias,
            adr_recipientname,
            adr_contactphone,
            adr_reference,
            adr_country,
            adr_address,
            adr_street,
            adr_number,
            adr_floor,
            adr_apartment,
            adr_city,
            adr_province,
            adr_postalcode,
            adr_lat,
            adr_lng,
            adr_createdat,
            adr_updatedat
        }:{ 
            adr_uuid: string,
            cmp_uuid: string,
            usr_uuid: string,
            cus_uuid: string,
            sup_uuid: string,
            adr_alias: string,
            adr_recipientname: string,
            adr_contactphone: string,
            adr_reference: string,
            adr_country: string,
            adr_address: string,
            adr_street: string,
            adr_number: string,
            adr_floor: string,
            adr_apartment: string,
            adr_city: string,
            adr_province: string,
            adr_postalcode: string,
            adr_lat: number,
            adr_lng: number,
            adr_createdat?: Date,
            adr_updatedat?: Date
        }) {
            this.adr_uuid = adr_uuid ?? uuid();
            this.cmp_uuid = cmp_uuid;
            this.usr_uuid = usr_uuid;
            this.cus_uuid = cus_uuid;
            this.sup_uuid = sup_uuid;
            this.adr_alias = adr_alias;
            this.adr_recipientname = adr_recipientname;
            this.adr_contactphone = adr_contactphone;
            this.adr_reference = adr_reference;
            this.adr_country = adr_country;
            this.adr_address = adr_address;
            this.adr_street = adr_street;
            this.adr_number = adr_number;
            this.adr_floor = adr_floor;
            this.adr_apartment = adr_apartment;
            this.adr_city = adr_city;
            this.adr_province = adr_province;
            this.adr_postalcode = adr_postalcode;
            this.adr_lat = adr_lat;
            this.adr_lng = adr_lng;
            this.adr_createdat = adr_createdat ?? moment().toDate();
            this.adr_updatedat = adr_updatedat ?? moment().toDate();
    }
}