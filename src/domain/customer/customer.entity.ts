export interface CustomerEntity {
    usr_uuid: string,
    cus_uuid: string,
    cus_fullname: string,
    cus_email: string,
    cus_phone: string,
    cus_dateofbirth: Date,
    cus_createdat: Date,
    cus_updatedat: Date
}

//Update
export type CustomerUpdateData = Pick<CustomerEntity, 'cus_fullname' | 'cus_email' | 'cus_phone' | 'cus_dateofbirth'>
