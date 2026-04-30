export interface MaterialEntity {
    cmp_uuid: string,
    mat_uuid: string,
    gmat_uuid: string,
    mat_name: string,    
    mat_description: string,
    mat_createdat: Date,
    mat_updatedat: Date
}

//Update
export type MaterialUpdateData = Pick<MaterialEntity, 'gmat_uuid' | 'mat_name' | 'mat_description'>;
