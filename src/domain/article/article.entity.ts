export interface ArticleEntity {
    cmp_uuid: string,
    art_uuid: string,
    art_code: string,    
    art_name: string,
    art_image: string,
    art_description: string,    
    art_pricecost: number,
    art_stock: number,
    sup_uuid: string,
    itm_uuid: string,
    cat_uuid: string,
    art_createdat: Date,
    art_updatedat: Date


}

//Update
export type ArticleUpdateData = Pick<ArticleEntity, 'art_code' | 'art_name' | 'art_image' | 'art_description' | 'art_pricecost' | 'art_stock' | 'sup_uuid' | 'itm_uuid' | 'cat_uuid'>;