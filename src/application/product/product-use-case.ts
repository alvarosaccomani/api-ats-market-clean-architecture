import { v4 as uuid } from "uuid";
import { ProductRepository } from "../../domain/product/product.repository";
import { ProductValue } from "../../domain/product/product.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";
import { ProductVariationEntity } from "../../domain/product-variation/product-variation.entity";
import { ProductVariationRepository } from "../../domain/product-variation/product-variation.repository";

export class ProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productVariationRepository: ProductVariationRepository
    ) {
        this.getProducts = this.getProducts.bind(this);
        this.getDetailProduct = this.getDetailProduct.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.findProductByName = this.findProductByName.bind(this);
    }

    public async getProducts(
        cmp_uuid: string,
        page?: number,
        perPage?: number,
        filters?: {
            itm_uuid?: string;
            cat_uuid?: string;
            stockStatus?: string;
            search?: string;
        }
    ) {
        try {
            const product = await this.productRepository.getProducts(cmp_uuid, page, perPage, filters);
            if(!product) {
                throw new Error('No hay articulos.');
            }

            const mapProduct = (p: any) => ({
                cmp_uuid: p.cmp_uuid,
                pro_uuid: p.pro_uuid,
                pro_code: p.pro_code,
                pro_name: p.pro_name,
                pro_image: p.pro_image,
                pro_description: p.pro_description,
                itm_uuid: p.itm_uuid,
                cat_uuid: p.cat_uuid,
                productVariations: p.productVariations,
                pro_createdat: TimezoneConverter.toIsoStringInTimezone(p.pro_createdat, 'America/Buenos_Aires'),
                pro_updatedat: TimezoneConverter.toIsoStringInTimezone(p.pro_updatedat, 'America/Buenos_Aires')
            });

            if (Array.isArray(product)) {
                return product.map(mapProduct);
            } else {
                return {
                    rows: product.rows.map(mapProduct),
                    count: product.count
                };
            }
        } catch (error: any) {
            console.error('Error en getProducts (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailProduct(cmp_uuid: string, pro_uuid: string) {
        try {
            const product = await this.productRepository.findProductById(cmp_uuid, pro_uuid);
            if(!product) {
                throw new Error(`No hay articulo con el Id: ${cmp_uuid}, ${pro_uuid}`);
            }
            return {
                cmp_uuid: product.cmp_uuid,
                pro_uuid: product.pro_uuid,
                pro_code: product.pro_code,
                pro_name: product.pro_name,
                pro_image: product.pro_image,
                pro_description: product.pro_description,
                itm_uuid: product.itm_uuid,
                cat_uuid: product.cat_uuid,
                productVariations: product.productVariations,
                pro_createdat: TimezoneConverter.toIsoStringInTimezone(product.pro_createdat, 'America/Buenos_Aires'),
                pro_updatedat: TimezoneConverter.toIsoStringInTimezone(product.pro_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailProduct (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createProduct({ cmp_uuid, pro_uuid, pro_code, pro_name, pro_image, pro_description, itm_uuid, cat_uuid, productVariations } : { cmp_uuid: string, pro_uuid: string, pro_code: string, pro_name: string, pro_image: string, pro_description: string, itm_uuid: string, cat_uuid: string, productVariations?: ProductVariationEntity[] }) {
        try {
            const productValue = new ProductValue({ cmp_uuid, pro_uuid, pro_code, pro_name, pro_image, pro_description, itm_uuid, cat_uuid, productVariations });
            const productCreated = await this.productRepository.createProduct(productValue);
            if(!productCreated) {
                throw new Error(`No se pudo insertar el articulo.`);
            }
            if (productValue.productVariations.length) {
                const productVariationsCreated = [];
                for (const productVariation of productValue.productVariations) {
                    productVariation.pro_uuid = productCreated.pro_uuid;
                    productVariation.prov_uuid = uuid();
                    const productVariationCreated = await this.productVariationRepository.createProductVariation(productVariation);
                    if (!productVariationCreated) {
                        throw new Error(`No se pudo insertar la variacion del articulo.`);
                    }
                    productVariationsCreated.push(productVariationCreated);
                }
            }
            return {
                cmp_uuid: productCreated.cmp_uuid,
                pro_uuid: productCreated.pro_uuid,
                pro_code: productCreated.pro_code,
                pro_name: productCreated.pro_name,
                pro_image: productCreated.pro_image,
                pro_description: productCreated.pro_description,
                itm_uuid: productCreated.itm_uuid,
                cat_uuid: productCreated.cat_uuid,
                pro_createdat: TimezoneConverter.toIsoStringInTimezone(productCreated.pro_createdat, 'America/Buenos_Aires'),
                pro_updatedat: TimezoneConverter.toIsoStringInTimezone(productCreated.pro_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createProduct (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateProduct(cmp_uuid: string, pro_uuid: string, { pro_code, pro_name, pro_image, pro_description, itm_uuid, cat_uuid, productVariations } : { pro_code: string, pro_name: string, pro_image: string, pro_description: string, itm_uuid: string, cat_uuid: string, productVariations?: ProductVariationEntity[] }) {
        try {
            const productUpdated = await this.productRepository.updateProduct(cmp_uuid, pro_uuid, { pro_code, pro_name, pro_image, pro_description, itm_uuid, cat_uuid, productVariations });
            if(!productUpdated) {
                throw new Error(`No se pudo actualizar el articulo.`);
            }
            if (productVariations?.length) {
                const productVariationsCreated = [];
                for (const productVariation of productVariations) {
                    if (!productVariation.prov_uuid) {
                        productVariation.pro_uuid = productUpdated.pro_uuid;
                        productVariation.prov_uuid = uuid();
                        const productVariationCreated = await this.productVariationRepository.createProductVariation(productVariation);
                        if (!productVariationCreated) {
                            throw new Error(`No se pudo insertar la variacion del articulo.`);
                        }
                        productVariationsCreated.push(productVariationCreated);
                    } else {
                        const productVariationUpdated = await this.productVariationRepository.updateProductVariation(productVariation.cmp_uuid, productVariation.pro_uuid, productVariation.prov_uuid, productVariation);
                        if (!productVariationUpdated) {
                            throw new Error(`No se pudo actualizar la variacion del articulo.`);
                        }
                        productVariationsCreated.push(productVariationUpdated);
                    }                    
                }
            }
            return {
                cmp_uuid: productUpdated.cmp_uuid,
                pro_uuid: productUpdated.pro_uuid,
                pro_code: productUpdated.pro_code,
                pro_name: productUpdated.pro_name,
                pro_image: productUpdated.pro_image,
                pro_description: productUpdated.pro_description,
                itm_uuid: productUpdated.itm_uuid,
                cat_uuid: productUpdated.cat_uuid,
                pro_createdat: TimezoneConverter.toIsoStringInTimezone(productUpdated.pro_createdat, 'America/Buenos_Aires'),
                pro_updatedat: TimezoneConverter.toIsoStringInTimezone(productUpdated.pro_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateProduct (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteProduct(cmp_uuid: string, pro_uuid: string) {
        try {
            const productDeleted = await this.productRepository.deleteProduct(cmp_uuid, pro_uuid);
            if(!productDeleted) {
                throw new Error(`No se pudo eliminar el articulo.`);
            }
            return {
                cmp_uuid: productDeleted.cmp_uuid,
                pro_uuid: productDeleted.pro_uuid,
                pro_code: productDeleted.pro_code,
                pro_name: productDeleted.pro_name,
                pro_image: productDeleted.pro_image,
                pro_description: productDeleted.pro_description,
                itm_uuid: productDeleted.itm_uuid,
                cat_uuid: productDeleted.cat_uuid,
                pro_createdat: TimezoneConverter.toIsoStringInTimezone(productDeleted.pro_createdat, 'America/Buenos_Aires'),
                pro_updatedat: TimezoneConverter.toIsoStringInTimezone(productDeleted.pro_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteProduct (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findProductByName(cmp_uuid: string, pro_name: string, excludeUuid?: string) {
        try {
            const product = await this.productRepository.findProductByName(cmp_uuid, pro_name, excludeUuid)
            if(product) {
                throw new Error(`Ya existe un articulo con el nombre ${pro_name}.`);
            }
            return product
        } catch (error: any) {
            console.error('Error en findProductByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}