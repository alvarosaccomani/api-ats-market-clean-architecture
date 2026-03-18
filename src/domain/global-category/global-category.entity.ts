export interface GlobalCategoryEntity {
    gitm_uuid: string,
    gcat_uuid: string,
    gcat_name: string,    
    gcat_description: string,
    gcat_createdat: Date,
    gcat_updatedat: Date
}

//Update
export type GlobalCategoryUpdateData = Pick<GlobalCategoryEntity, 'gcat_name' | 'gcat_description'>;
