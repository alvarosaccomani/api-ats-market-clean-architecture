export interface CategoryEntity {
    cmp_uuid: string,
    itm_uuid: string,
    cat_uuid: string,
    gitm_uuid: string,
    gcat_uuid: string,
    cat_name: string,    
    cat_description: string,
    cat_createdat: Date,
    cat_updatedat: Date
}

//Update
export type CategoryUpdateData = Pick<CategoryEntity, 'gitm_uuid' | 'gcat_uuid' | 'cat_name' | 'cat_description'>;
