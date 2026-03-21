export interface CustomerEntity {
    cmp_uuid: string,
    cus_uuid: string,
    cus_fullname: string,
    cus_email: string,
    cus_phone: string,
    cus_dateofbirth: Date,
    pmt_uuid: string,
    usr_uuid: string,
    cus_createdat: Date,
    cus_updatedat: Date
}

//Update
export type CustomerUpdateData = Pick<CustomerEntity, 'cus_fullname' | 'cus_email' | 'cus_phone' | 'cus_dateofbirth' | 'pmt_uuid' | 'usr_uuid'>
