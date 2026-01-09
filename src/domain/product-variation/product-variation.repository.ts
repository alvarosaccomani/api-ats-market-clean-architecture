import { ProductVariationEntity, ProductVariationUpdateData } from "./product-variation.entity";

export interface ProductVariationRepository {
    getProductVariations(cmp_uuid: string, pro_uuid: string): Promise<ProductVariationEntity[] | null>;
    findProductVariationById(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<ProductVariationEntity | null>;
    createProductVariation(productVariation: ProductVariationEntity): Promise<ProductVariationEntity | null>;
    updateProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string, productVariation: ProductVariationUpdateData): Promise<ProductVariationEntity | null>;
    deleteProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<ProductVariationEntity | null>;
    findProductVariationByName(cmp_uuid: string, pro_uuid: string, prov_name: string, excludeUuid?: string | null): Promise<ProductVariationEntity | null>;
}