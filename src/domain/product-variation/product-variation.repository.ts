import { ProductVariationEntity, ProductVariationUpdateData } from "./product-variation.entity";

export interface ProductVariationRepository {
    getProductVariations(cmp_uuid: string, pro_uuid: string, prov_isvisible?: boolean): Promise<ProductVariationEntity[] | null>;
    findProductVariationById(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<ProductVariationEntity | null>;
    createProductVariation(productVariation: ProductVariationEntity, options?: { transaction?: any }): Promise<ProductVariationEntity | null>;
    updateProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string, productVariation: ProductVariationUpdateData, options?: { transaction?: any }): Promise<ProductVariationEntity | null>;
    deleteProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<ProductVariationEntity | null>;
    findProductVariationByName(cmp_uuid: string, pro_uuid: string, prov_name: string, excludeUuid?: string | null): Promise<ProductVariationEntity | null>;
    checkStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<number>;
    searchProductVariations(searchQuery: string, cmp_uuid?: string, prov_isvisible?: boolean): Promise<ProductVariationEntity[] | null>;
}