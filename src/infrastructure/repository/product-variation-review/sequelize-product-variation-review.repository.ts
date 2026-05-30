import { ProductVariationReviewEntity, ProductVariationReviewUpdateData } from "../../../domain/product-variation-review/product-variation-review.entity";
import { ProductVariationReviewRepository } from "../../../domain/product-variation-review/product-variation-review.repository";
import { SequelizeProductVariationReview } from "../../model/product-variation-review/product-variation-review.model";

export class SequelizeRepository implements ProductVariationReviewRepository {
    async getProductVariationReviews(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<ProductVariationReviewEntity[] | null> {
        try {
            const reviews = await SequelizeProductVariationReview.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null,
                    prov_uuid: prov_uuid ?? null
                }
            });
            if (!reviews) {
                return null;
            }
            return reviews;
        } catch (error: any) {
            console.error('Error en getProductVariationReviews (repository):', error.message);
            throw error;
        }
    }

    async findProductVariationReviewById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string): Promise<ProductVariationReviewEntity | null> {
        try {
            const review = await SequelizeProductVariationReview.findOne({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null,
                    prov_uuid: prov_uuid ?? null,
                    provrev_uuid: provrev_uuid ?? null
                }
            });
            if (!review) {
                return null;
            }
            return review.dataValues;
        } catch (error: any) {
            console.error('Error en findProductVariationReviewById (repository):', error.message);
            throw error;
        }
    }

    async createProductVariationReview(productVariationReview: ProductVariationReviewEntity): Promise<ProductVariationReviewEntity | null> {
        try {
            const { 
                cmp_uuid, 
                pro_uuid, 
                prov_uuid, 
                provrev_uuid, 
                usr_uuid, 
                cus_uuid, 
                provrev_rating, 
                provrev_comment, 
                provrev_isverified, 
                provrev_createdat, 
                provrev_updatedat 
            } = productVariationReview;
            
            const result = await SequelizeProductVariationReview.create({ 
                cmp_uuid, 
                pro_uuid, 
                prov_uuid, 
                provrev_uuid, 
                usr_uuid, 
                cus_uuid, 
                provrev_rating, 
                provrev_comment, 
                provrev_isverified, 
                provrev_createdat, 
                provrev_updatedat 
            });
            
            if (!result) {
                throw new Error(`No se pudo agregar la reseña`);
            }
            
            return result.dataValues as ProductVariationReviewEntity;
        } catch (error: any) {
            console.error('Error en createProductVariationReview (repository):', error.message);
            throw error;
        }
    }

    async updateProductVariationReview(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string, productVariationReview: ProductVariationReviewUpdateData): Promise<ProductVariationReviewEntity | null> {
        try {
            const [updatedCount, [updatedReview]] = await SequelizeProductVariationReview.update(
                {
                    provrev_rating: productVariationReview.provrev_rating,
                    provrev_comment: productVariationReview.provrev_comment,
                    provrev_isverified: productVariationReview.provrev_isverified
                },
                {
                    where: { cmp_uuid, pro_uuid, prov_uuid, provrev_uuid },
                    returning: true,
                }
            );
            
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar la reseña`);
            }
            
            return updatedReview.get({ plain: true }) as ProductVariationReviewEntity;
        } catch (error: any) {
            console.error('Error en updateProductVariationReview (repository):', error.message);
            throw error;
        }
    }

    async deleteProductVariationReview(cmp_uuid: string, pro_uuid: string, prov_uuid: string, provrev_uuid: string): Promise<ProductVariationReviewEntity | null> {
        try {
            const reviewToDelete = await this.findProductVariationReviewById(cmp_uuid, pro_uuid, prov_uuid, provrev_uuid);
            if (!reviewToDelete) {
                throw new Error(`No se ha encontrado la reseña a eliminar`);
            }
            
            const deletedCount = await SequelizeProductVariationReview.destroy({
                where: { cmp_uuid, pro_uuid, prov_uuid, provrev_uuid }
            });
            
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar la reseña`);
            }
            
            return reviewToDelete;
        } catch (error: any) {
            console.error('Error en deleteProductVariationReview (repository):', error.message);
            throw error;
        }
    }
}
