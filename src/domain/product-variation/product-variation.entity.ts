export interface ProductVariationEntity {
    cmp_uuid: string;
    pro_uuid: string;
    prov_uuid: string;
    prov_code: string;
    prov_sku: string;
    prov_name: string;
    prov_description: string;
    prov_image: string;
    prov_color: string;
    prov_size: string;
    prov_stock: number;
    prov_suggestedminimumsellingprice: number;
    prov_createdat: Date;
    prov_updatedat: Date;
}

//Update
export type ProductVariationUpdateData = Pick<ProductVariationEntity, 'prov_code' | 'prov_sku' | 'prov_name' | 'prov_description' | 'prov_image' | 'prov_color' | 'prov_size' | 'prov_stock' | 'prov_suggestedminimumsellingprice'>;
