export interface AddressEntity {
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
    adr_city: string;
    adr_province: string;
    adr_postalcode: string;
    adr_lat: number;
    adr_lng: number;
    adr_createdat: Date;
    adr_updatedat: Date;
}

//Update
export type AddressUpdateData = Pick<AddressEntity, 'cmp_uuid' | 'usr_uuid' | 'cus_uuid' | 'sup_uuid' | 'adr_alias' | 'adr_recipientname' | 'adr_contactphone' | 'adr_reference' | 'adr_country' | 'adr_address' | 'adr_city' | 'adr_province' | 'adr_postalcode' | 'adr_lat' | 'adr_lng'>;
