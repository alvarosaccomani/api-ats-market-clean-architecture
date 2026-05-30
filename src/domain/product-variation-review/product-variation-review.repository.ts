import { ProductVariationReviewEntity, ProductVariationReviewUpdateData } from "./product-variation-review.entity";

export interface ProductVariationReviewRepository {
    getProductVariationReviews(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<ProductVariationReviewEntity[] | null>;
    findProductVariationReviewById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string): Promise<ProductVariationReviewEntity | null>;
    createProductVariationReview(productVariation: ProductVariationReviewEntity): Promise<ProductVariationReviewEntity | null>;
    updateProductVariationReview(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string, productVariationReview: ProductVariationReviewUpdateData): Promise<ProductVariationReviewEntity | null>;
    deleteProductVariationReview(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string): Promise<ProductVariationReviewEntity | null>;
}