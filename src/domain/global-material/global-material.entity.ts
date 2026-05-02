export interface GlobalMaterialEntity {
    gmat_uuid: string,
    gmat_name: string,    
    gmat_description: string,
    gmat_image: string,
    gmat_createdat: Date,
    gmat_updatedat: Date
}

//Update
export type GlobalMaterialUpdateData = Pick<GlobalMaterialEntity, 'gmat_name' | 'gmat_description' | 'gmat_image'>;
