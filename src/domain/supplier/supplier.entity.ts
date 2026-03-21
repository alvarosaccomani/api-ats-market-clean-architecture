export interface SupplierEntity {
    cmp_uuid: string,
    sup_uuid: string,
    sup_fullname: string,
    sup_email: string,
    sup_phone: string,
    pmt_uuid: string,
    usr_uuid: string,
    sup_createdat: Date,
    sup_updatedat: Date
}

//Update
export type SupplierUpdateData = Pick<SupplierEntity, 'sup_fullname' | 'sup_email' | 'sup_phone' | 'pmt_uuid' | 'usr_uuid'>
