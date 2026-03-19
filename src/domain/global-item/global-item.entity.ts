export interface GlobalItemEntity {
    gitm_uuid: string,
    gitm_name: string,    
    gitm_description: string,
    gitm_image: string,
    gitm_createdat: Date,
    gitm_updatedat: Date
}

//Update
export type GlobalItemUpdateData = Pick<GlobalItemEntity, 'gitm_name' | 'gitm_description' | 'gitm_image'>;
