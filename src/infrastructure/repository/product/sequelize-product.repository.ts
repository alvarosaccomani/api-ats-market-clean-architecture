import { ProductEntity, ProductUpdateData } from "../../../domain/product/product.entity";
import { ProductRepository } from "../../../domain/product/product.repository";
import { SequelizeProductVariation } from "../../model/product-variation/product-variation.model";
import { SequelizeProduct } from "../../model/product/product.model";
import { Op } from "sequelize";
import { sequelize } from "../../db/sequelize";

export class SequelizeRepository implements ProductRepository {
    async getProducts(
        cmp_uuid: string,
        page?: number,
        perPage?: number,
        filters?: {
            itm_uuid?: string;
            cat_uuid?: string;
            stockStatus?: string;
            search?: string;
        }
    ): Promise<{ rows: ProductEntity[]; count: number } | ProductEntity[] | null> {
        try {
            const where: any = {
                cmp_uuid: cmp_uuid ?? null
            };

            if (filters) {
                if (filters.itm_uuid) {
                    where.itm_uuid = filters.itm_uuid;
                }
                if (filters.cat_uuid) {
                    where.cat_uuid = filters.cat_uuid;
                }
                if (filters.search) {
                    where[Op.or] = [
                        { pro_name: { [Op.iLike]: `%${filters.search}%` } },
                        { pro_code: { [Op.iLike]: `%${filters.search}%` } }
                    ];
                }
                if (filters.stockStatus) {
                    if (filters.stockStatus === 'IN_STOCK') {
                        where.pro_uuid = {
                            [Op.in]: sequelize.literal(`(SELECT DISTINCT pro_uuid FROM prov_productsvariations WHERE cmp_uuid = '${cmp_uuid}' AND prov_stock > 0)`)
                        };
                    } else if (filters.stockStatus === 'OUT_OF_STOCK') {
                        where.pro_uuid = {
                            [Op.notIn]: sequelize.literal(`(SELECT DISTINCT pro_uuid FROM prov_productsvariations WHERE cmp_uuid = '${cmp_uuid}' AND prov_stock > 0)`)
                        };
                    } else if (filters.stockStatus === 'LOW_STOCK') {
                        where.pro_uuid = {
                            [Op.in]: sequelize.literal(`(SELECT DISTINCT pro_uuid FROM prov_productsvariations WHERE cmp_uuid = '${cmp_uuid}' AND prov_stock <= 5 AND prov_stock > 0)`)
                        };
                    }
                }
            }

            if (page !== undefined && perPage !== undefined) {
                const limit = perPage;
                const offset = (page - 1) * limit;

                const result = await SequelizeProduct.findAndCountAll({
                    where,
                    limit,
                    offset,
                    include: [
                        {
                            model: SequelizeProductVariation,
                            as: 'productVariations'
                        }
                    ],
                    distinct: true
                });

                return {
                    rows: result.rows,
                    count: result.count
                };
            } else {
                const products = await SequelizeProduct.findAll({
                    where,
                    include: [
                        {
                            model: SequelizeProductVariation,
                            as: 'productVariations'
                        }
                    ]
                });
                return products;
            }
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