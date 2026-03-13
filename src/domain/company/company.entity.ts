export interface CompanyEntity {
    cmp_uuid: string,
    cmp_name: string,
    cmp_address: string,    
    cmp_phone: string,
    cmp_email: string,
    cmp_slug: string
    cmp_logo: string
    cmp_banner: string
    cmp_description: string
    cmp_isfeatured: boolean,
    cmp_status: string,  //-- active, inactive, pending
    cmp_createdat: Date,
    cmp_updatedat: Date
}

//Update
export type CompanyUpdateData = Pick<CompanyEntity, 'cmp_name' | 'cmp_address' | 'cmp_phone' | 'cmp_email' | 'cmp_slug' | 'cmp_logo' | 'cmp_banner' | 'cmp_description' | 'cmp_isfeatured' | 'cmp_status'>;
