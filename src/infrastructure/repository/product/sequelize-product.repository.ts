import { ProductEntity, ProductUpdateData } from "../../../domain/product/product.entity";
import { ProductRepository } from "../../../domain/product/product.repository";
import { SequelizeProductVariation } from "../../model/product-variation/product-variation.model";
import { SequelizeProduct } from "../../model/product/product.model";
import { Op } from "sequelize";

export class SequelizeRepository implements ProductRepository {
    async getProducts(cmp_uuid: string): Promise<ProductEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const products = await SequelizeProduct.findAll(config);
            if(!products) {
                throw new Error(`No hay articulos`)
            };
            return products;
        } catch (error: any) {
            console.error('Error en getProducts:', error.message);
            throw error;
        }
    }
    async findProductById(cmp_uuid: string, pro_uuid: string): Promise<ProductEntity | null> {
        try {
            const product = await SequelizeProduct.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null
                },
                include: [
                    {
                        model: SequelizeProductVariation,
                        as: 'productVariations'
                    }
                ]
            });
            if(!product) {
                throw new Error(`No hay product con el Id: ${cmp_uuid}, ${pro_uuid}`);
            };
            return product.dataValues;
        } catch (error: any) {
            console.error('Error en findProductById:', error.message);
            throw error;
        }
    }
    async createProduct(product: ProductEntity): Promise<ProductEntity | null> {
        try {
            let { cmp_uuid, pro_uuid, pro_code, pro_name, pro_image, pro_description, itm_uuid, cat_uuid, pro_createdat, pro_updatedat } = product
            const result = await SequelizeProduct.create({ cmp_uuid, pro_uuid, pro_code, pro_name, pro_image, pro_description, itm_uuid, cat_uuid, pro_createdat, pro_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el product`);
            }
            let newProduct = result.dataValues as SequelizeProduct
            return newProduct;
        } catch (error: any) {
            console.error('Error en createProduct:', error.message);
            throw error;
        }
    }
    async updateProduct(cmp_uuid: string, pro_uuid: string, product: ProductUpdateData): Promise<ProductEntity | null> {
        try {
            const [updatedCount, [updatedProduct]] = await SequelizeProduct.update(
                { 
                    pro_code: product.pro_code, 
                    pro_name: product.pro_name, 
                    pro_image: product.pro_image, 
                    pro_description: product.pro_description,
                    itm_uuid: product.itm_uuid,
                    cat_uuid: product.cat_uuid
                },
                { 
                    where: { cmp_uuid, pro_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el product`);
            };
            return updatedProduct.get({ plain: true }) as ProductEntity;
        } catch (error: any) {
            console.error('Error en updateProduct:', error.message);
            throw error;
        }
    }
    async deleteProduct(cmp_uuid: string, pro_uuid: string): Promise<ProductEntity | null> {
        try {
            const product = await this.findProductById(cmp_uuid, pro_uuid);
            const result = await SequelizeProduct.destroy({ where: { cmp_uuid, pro_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el product`);
            };
            return product;
        } catch (error: any) {
            console.error('Error en deleteProduct:', error.message);
            throw error;
        }
    }
    async findProductByName(cmp_uuid: string, pro_name: string, excludeUuid?: string): Promise<ProductEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                pro_name: pro_name ?? null
             };
            if (excludeUuid) {
                whereCondition.pro_uuid = { [Op.ne]: excludeUuid };
            }
            const product = await SequelizeProduct.findOne({ 
                where: whereCondition
            });
            return product;
        } catch (error: any) {
            console.error('Error en findProductByName:', error.message);
            throw error;
        }
    }
    
}