import { ProductVariationEntity, ProductVariationUpdateData } from "../../../domain/product-variation/product-variation.entity";
import { ProductVariationRepository } from "../../../domain/product-variation/product-variation.repository";
import { SequelizeProductVariation } from "../../model/product-variation/product-variation.model";
import { Op } from "sequelize";

export class SequelizeRepository implements ProductVariationRepository {
    async getProductVariations(cmp_uuid: string, pro_uuid: string): Promise<ProductVariationEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null
                }
            }
            const products = await SequelizeProductVariation.findAll(config);
            if(!products) {
                throw new Error(`No hay varaciones de productos`)
            };
            return products;
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
                } 
            });
            if(!product) {
                throw new Error(`No hay product variation con el Id: ${cmp_uuid}, ${pro_uuid}, ${prov_uuid}`);
            };
            return product.dataValues;
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
            let newProduct = result.dataValues as SequelizeProductVariation
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
            return updatedProductVariation.get({ plain: true }) as ProductVariationEntity;
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
    
}