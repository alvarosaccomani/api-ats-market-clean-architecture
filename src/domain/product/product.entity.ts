import { ProductVariationEntity } from "../product-variation/product-variation.entity";

export interface ProductEntity {
    cmp_uuid: string,
    pro_uuid: string,
    pro_code: string,    
    pro_name: string,
    pro_image: string,
    pro_description: string,
    itm_uuid: string,
    cat_uuid: string,
    pro_createdat: Date,
    pro_updatedat: Date,
    productVariations?: ProductVariationEntity[]
}

//Update
export type ProductUpdateData = Pick<ProductEntity, 'pro_code' | 'pro_name' | 'pro_image' | 'pro_description' | 'itm_uuid' | 'cat_uuid'>;