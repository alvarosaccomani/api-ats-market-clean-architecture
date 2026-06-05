import { ProductVariationEntity, ProductVariationUpdateData } from "../../../domain/product-variation/product-variation.entity";
import { ProductVariationRepository } from "../../../domain/product-variation/product-variation.repository";
import { SequelizeInventoryStock } from "../../model/inventory-stock/inventory-stock.model";
import { SequelizeProductVariation } from "../../model/product-variation/product-variation.model";
import { SequelizeProductVariationReview } from "../../model/product-variation-review/product-variation-review.model";
import { SequelizeProduct } from "../../model/product/product.model";
import { SequelizeCompany } from "../../model/company/company.model";
import { Op } from "sequelize";

export class SequelizeRepository implements ProductVariationRepository {
    async getProductVariations(cmp_uuid: string, pro_uuid: string): Promise<ProductVariationEntity[] | null> {
        try {
            let config = {}
            if(!pro_uuid) {
                config = {
                    where: {
                        cmp_uuid: cmp_uuid ?? null
                    }
                }
            } else {
                config = {
                    where: {
                        cmp_uuid: cmp_uuid ?? null,
                        pro_uuid: pro_uuid ?? null
                    }
                }
            }
            console.info(config);
            const products = await SequelizeProductVariation.findAll(config);
            if(!products) {
                throw new Error(`No hay varaciones de productos`)
            };
            
            const results: ProductVariationEntity[] = [];
            for (const product of products) {
                const productData = product.get({ plain: true }) as ProductVariationEntity;
                const reviews = await SequelizeProductVariationReview.findAll({
                    where: {
                        cmp_uuid: productData.cmp_uuid,
                        pro_uuid: productData.pro_uuid,
                        prov_uuid: productData.prov_uuid
                    }
                });
                const totalRating = reviews.reduce((sum, review) => sum + (review.provrev_rating || 0), 0);
                productData.prov_averagerating = reviews.length > 0 ? Number((totalRating / reviews.length).toFixed(2)) : 0;
                productData.prov_reviewscount = reviews.length;
                results.push(productData);
            }
            return results;
        } catch (error: any) {
            console.error('Error en getProducts:', error.message);
            throw error;
        }
    }
    async findProductVariationById(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<ProductVariationEntity | null> {
        try {
            const product = await SequelizeProductVariation.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null,
                    prov_uuid: prov_uuid ?? null
                },
                include: [
                    {
                        model: SequelizeInventoryStock,
                        as: 'inventoryStock'
                    }
                ]
            });
            if(!product) {
                throw new Error(`No hay product variation con el Id: ${cmp_uuid}, ${pro_uuid}, ${prov_uuid}`);
            };
            const productData = product.get({ plain: true }) as ProductVariationEntity;
            const reviews = await SequelizeProductVariationReview.findAll({
                where: {
                    cmp_uuid: productData.cmp_uuid,
                    pro_uuid: productData.pro_uuid,
                    prov_uuid: productData.prov_uuid
                }
            });
            const totalRating = reviews.reduce((sum, review) => sum + (review.provrev_rating || 0), 0);
            productData.prov_averagerating = reviews.length > 0 ? Number((totalRating / reviews.length).toFixed(2)) : 0;
            productData.prov_reviewscount = reviews.length;
            return productData;
        } catch (error: any) {
            console.error('Error en findProductVariationById:', error.message);
            throw error;
        }
    }
    async createProductVariation(productVariation: ProductVariationEntity): Promise<ProductVariationEntity | null> {
        try {
            let { cmp_uuid, pro_uuid, prov_uuid, prov_code, prov_sku, prov_name, prov_description, prov_image, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice, prov_createdat, prov_updatedat } = productVariation
            const result = await SequelizeProductVariation.create({ cmp_uuid, pro_uuid, prov_uuid, prov_code, prov_sku, prov_name, prov_description, prov_image, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice, prov_createdat, prov_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el product`);
            }
            let newProduct = result.get({ plain: true }) as ProductVariationEntity;
            newProduct.prov_averagerating = 0;
            newProduct.prov_reviewscount = 0;
            return newProduct;
        } catch (error: any) {
            console.error('Error en createProductVariation:', error.message);
            throw error;
        }
    }
    async updateProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string, productVariation: ProductVariationUpdateData): Promise<ProductVariationEntity | null> {
        try {
            const [updatedCount, [updatedProductVariation]] = await SequelizeProductVariation.update(
                { 
                    prov_code: productVariation.prov_code, 
                    prov_sku: productVariation.prov_sku, 
                    prov_name: productVariation.prov_name, 
                    prov_description: productVariation.prov_description,
                    prov_image: productVariation.prov_image,
                    prov_color: productVariation.prov_color,
                    prov_size: productVariation.prov_size,
                    prov_stock: productVariation.prov_stock,
                    prov_suggestedminimumsellingprice: productVariation.prov_suggestedminimumsellingprice
                },
                { 
                    where: { cmp_uuid, pro_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el product variation con el Id: ${cmp_uuid}, ${pro_uuid}, ${prov_uuid}`);
            };
            const productData = updatedProductVariation.get({ plain: true }) as ProductVariationEntity;
            const reviews = await SequelizeProductVariationReview.findAll({
                where: {
                    cmp_uuid: productData.cmp_uuid,
                    pro_uuid: productData.pro_uuid,
                    prov_uuid: productData.prov_uuid
                }
            });
            const totalRating = reviews.reduce((sum, review) => sum + (review.provrev_rating || 0), 0);
            productData.prov_averagerating = reviews.length > 0 ? Number((totalRating / reviews.length).toFixed(2)) : 0;
            productData.prov_reviewscount = reviews.length;
            return productData;
        } catch (error: any) {
            console.error('Error en updateProductVariation:', error.message);
            throw error;
        }
    }
    async deleteProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<ProductVariationEntity | null> {
        try {
            const productVariation = await this.findProductVariationById(cmp_uuid, pro_uuid, prov_uuid);
            const result = await SequelizeProductVariation.destroy({ where: { cmp_uuid, pro_uuid, prov_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el product variation con el Id: ${cmp_uuid}, ${pro_uuid}, ${prov_uuid}`);
            };
            return productVariation;
        } catch (error: any) {
            console.error('Error en deleteProductVariation:', error.message);
            throw error;
        }
    }
    async findProductVariationByName(cmp_uuid: string, pro_uuid: string, prov_name: string, excludeUuid?: string): Promise<ProductVariationEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                pro_uuid: pro_uuid ?? null,
                prov_name: prov_name ?? null
             };
            if (excludeUuid) {
                whereCondition.prov_uuid = { [Op.ne]: excludeUuid };
            }
            const productVariation = await SequelizeProductVariation.findOne({ 
                where: whereCondition
            });
            return productVariation;
        } catch (error: any) {
            console.error('Error en findProductVariationByName:', error.message);
            throw error;
        }
    }

    async checkStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<number> {
        try {
            const product = await SequelizeProductVariation.findOne({ 
                attributes: ['prov_stock'],
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null,
                    prov_uuid: prov_uuid ?? null
                } 
            });
            if (!product) {
                return 0;
            }
            return product.prov_stock ?? 0;
        } catch (error: any) {
            console.error('Error en checkStock:', error.message);
            throw error;
        }
    }

    async searchProductVariations(searchQuery: string, cmp_uuid?: string): Promise<ProductVariationEntity[] | null> {
        try {
            const whereClause: any = {
                [Op.or]: [
                    { prov_name: { [Op.iLike]: `%${searchQuery}%` } },
                    { prov_sku: { [Op.iLike]: `%${searchQuery}%` } },
                    { prov_description: { [Op.iLike]: `%${searchQuery}%` } }
                ]
            };
            if (cmp_uuid && cmp_uuid.toLowerCase() !== 'null' && cmp_uuid.toLowerCase() !== 'undefined' && cmp_uuid !== '') {
                whereClause.cmp_uuid = cmp_uuid;
            }

            const variations = await SequelizeProductVariation.findAll({ where: whereClause });
            if (!variations) {
                return [];
            }

            // Fetch products to map product master fields
            const proUuids = [...new Set(variations.map(v => v.pro_uuid))];
            const products = await SequelizeProduct.findAll({
                where: {
                    pro_uuid: { [Op.in]: proUuids }
                }
            });
            const productMap = new Map(products.map(p => [p.pro_uuid, p.get({ plain: true })]));

            // Fetch companies to map company name
            const cmpUuids = [...new Set(variations.map(v => v.cmp_uuid))];
            const companies = await SequelizeCompany.findAll({
                where: {
                    cmp_uuid: { [Op.in]: cmpUuids }
                }
            });
            const companyMap = new Map(companies.map(c => [c.cmp_uuid, c.get({ plain: true })]));

            const results: ProductVariationEntity[] = [];
            for (const variation of variations) {
                const variationData = variation.get({ plain: true }) as any;
                
                // Merge product fields
                const product = productMap.get(variationData.pro_uuid);
                if (product) {
                    variationData.cat_uuid = product.cat_uuid;
                    variationData.itm_uuid = product.itm_uuid;
                    variationData.pro_name = product.pro_name;
                }

                // Merge company fields
                const company = companyMap.get(variationData.cmp_uuid);
                if (company) {
                    variationData.cmp_name = company.cmp_name;
                }

                // Fetch reviews and compute rating/count
                const reviews = await SequelizeProductVariationReview.findAll({
                    where: {
                        cmp_uuid: variationData.cmp_uuid,
                        pro_uuid: variationData.pro_uuid,
                        prov_uuid: variationData.prov_uuid
                    }
                });
                const totalRating = reviews.reduce((sum, review) => sum + (review.provrev_rating || 0), 0);
                variationData.prov_averagerating = reviews.length > 0 ? Number((totalRating / reviews.length).toFixed(2)) : 0;
                variationData.prov_reviewscount = reviews.length;

                results.push(variationData);
            }
            return results;
        } catch (error: any) {
            console.error('Error en searchProductVariations:', error.message);
            throw error;
        }
    }
}