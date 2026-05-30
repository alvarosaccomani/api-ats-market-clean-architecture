import { ProductVariationReviewRepository } from "../../domain/product-variation-review/product-variation-review.repository";
import { ProductVariationReviewValue } from "../../domain/product-variation-review/product-variation-review.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ProductVariationReviewUseCase {
    constructor(
        private readonly productVariationReviewRepository: ProductVariationReviewRepository
    ) {
        this.getProductVariationReviews = this.getProductVariationReviews.bind(this);
        this.findProductVariationReviewById = this.findProductVariationReviewById.bind(this);
        this.createProductVariationReview = this.createProductVariationReview.bind(this);
        this.updateProductVariationReview = this.updateProductVariationReview.bind(this);
        this.deleteProductVariationReview = this.deleteProductVariationReview.bind(this);
    }

    public async getProductVariationReviews(cmp_uuid: string, pro_uuid: string, prov_uuid: string) {
        try {
            const reviews = await this.productVariationReviewRepository.getProductVariationReviews(cmp_uuid, pro_uuid, prov_uuid);
            if (!reviews) {
                return [];
            }
            return reviews.map(review => ({
                cmp_uuid: review.cmp_uuid,
                pro_uuid: review.pro_uuid,
                prov_uuid: review.prov_uuid,
                provrev_uuid: review.provrev_uuid,
                usr_uuid: review.usr_uuid,
                cus_uuid: review.cus_uuid,
                provrev_rating: review.provrev_rating,
                provrev_comment: review.provrev_comment,
                provrev_isverified: review.provrev_isverified,
                provrev_createdat: review.provrev_createdat ? TimezoneConverter.toIsoStringInTimezone(review.provrev_createdat, 'America/Buenos_Aires') : undefined,
                provrev_updatedat: review.provrev_updatedat ? TimezoneConverter.toIsoStringInTimezone(review.provrev_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getProductVariationReviews (use case):', error.message);
            throw error;
        }
    }

    public async findProductVariationReviewById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string) {
        try {
            const review = await this.productVariationReviewRepository.findProductVariationReviewById(cmp_uuid, pro_uuid, prov_uuid, provrev_uuid);
            if (!review) {
                throw new Error(`No se encontró la reseña.`);
            }
            return {
                cmp_uuid: review.cmp_uuid,
                pro_uuid: review.pro_uuid,
                prov_uuid: review.prov_uuid,
                provrev_uuid: review.provrev_uuid,
                usr_uuid: review.usr_uuid,
                cus_uuid: review.cus_uuid,
                provrev_rating: review.provrev_rating,
                provrev_comment: review.provrev_comment,
                provrev_isverified: review.provrev_isverified,
                provrev_createdat: review.provrev_createdat ? TimezoneConverter.toIsoStringInTimezone(review.provrev_createdat, 'America/Buenos_Aires') : undefined,
                provrev_updatedat: review.provrev_updatedat ? TimezoneConverter.toIsoStringInTimezone(review.provrev_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findProductVariationReviewById (use case):', error.message);
            throw error;
        }
    }

    public async createProductVariationReview(data: { cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid?: string, usr_uuid: string, cus_uuid: string, provrev_rating: number, provrev_comment: string, provrev_isverified: boolean }) {
        try {
            const reviewValue = new ProductVariationReviewValue(data);
            const reviewCreated = await this.productVariationReviewRepository.createProductVariationReview(reviewValue);
            if (!reviewCreated) {
                throw new Error(`No se pudo crear la reseña.`);
            }

            return {
                cmp_uuid: reviewCreated.cmp_uuid,
                pro_uuid: reviewCreated.pro_uuid,
                prov_uuid: reviewCreated.prov_uuid,
                provrev_uuid: reviewCreated.provrev_uuid,
                usr_uuid: reviewCreated.usr_uuid,
                cus_uuid: reviewCreated.cus_uuid,
                provrev_rating: reviewCreated.provrev_rating,
                provrev_comment: reviewCreated.provrev_comment,
                provrev_isverified: reviewCreated.provrev_isverified,
                provrev_createdat: reviewCreated.provrev_createdat ? TimezoneConverter.toIsoStringInTimezone(reviewCreated.provrev_createdat, 'America/Buenos_Aires') : undefined,
                provrev_updatedat: reviewCreated.provrev_updatedat ? TimezoneConverter.toIsoStringInTimezone(reviewCreated.provrev_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createProductVariationReview (use case):', error.message);
            throw error;
        }
    }

    public async updateProductVariationReview(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string, data: { provrev_rating: number, provrev_comment: string, provrev_isverified: boolean }) {
        try {
            const reviewUpdated = await this.productVariationReviewRepository.updateProductVariationReview(cmp_uuid, pro_uuid, prov_uuid, provrev_uuid, data);
            if (!reviewUpdated) {
                throw new Error(`No se pudo actualizar la reseña.`);
            }

            return {
                cmp_uuid: reviewUpdated.cmp_uuid,
                pro_uuid: reviewUpdated.pro_uuid,
                prov_uuid: reviewUpdated.prov_uuid,
                provrev_uuid: reviewUpdated.provrev_uuid,
                usr_uuid: reviewUpdated.usr_uuid,
                cus_uuid: reviewUpdated.cus_uuid,
                provrev_rating: reviewUpdated.provrev_rating,
                provrev_comment: reviewUpdated.provrev_comment,
                provrev_isverified: reviewUpdated.provrev_isverified,
                provrev_createdat: reviewUpdated.provrev_createdat ? TimezoneConverter.toIsoStringInTimezone(reviewUpdated.provrev_createdat, 'America/Buenos_Aires') : undefined,
                provrev_updatedat: reviewUpdated.provrev_updatedat ? TimezoneConverter.toIsoStringInTimezone(reviewUpdated.provrev_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateProductVariationReview (use case):', error.message);
            throw error;
        }
    }

    public async deleteProductVariationReview(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string) {
        try {
            const reviewDeleted = await this.productVariationReviewRepository.deleteProductVariationReview(cmp_uuid, pro_uuid, prov_uuid, provrev_uuid);
            if (!reviewDeleted) {
                throw new Error(`No se pudo eliminar la reseña.`);
            }

            return {
                cmp_uuid: reviewDeleted.cmp_uuid,
                pro_uuid: reviewDeleted.pro_uuid,
                prov_uuid: reviewDeleted.prov_uuid,
                provrev_uuid: reviewDeleted.provrev_uuid,
                usr_uuid: reviewDeleted.usr_uuid,
                cus_uuid: reviewDeleted.cus_uuid,
                provrev_rating: reviewDeleted.provrev_rating,
                provrev_comment: reviewDeleted.provrev_comment,
                provrev_isverified: reviewDeleted.provrev_isverified,
                provrev_createdat: reviewDeleted.provrev_createdat ? TimezoneConverter.toIsoStringInTimezone(reviewDeleted.provrev_createdat, 'America/Buenos_Aires') : undefined,
                provrev_updatedat: reviewDeleted.provrev_updatedat ? TimezoneConverter.toIsoStringInTimezone(reviewDeleted.provrev_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteProductVariationReview (use case):', error.message);
            throw error;
        }
    }
}
