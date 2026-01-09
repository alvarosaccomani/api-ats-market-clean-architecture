import { ProductVariationRepository } from "../../domain/product-variation/product-variation.repository";
import { ProductVariationValue } from "../../domain/product-variation/product-variation.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ProductVariationUseCase {
    constructor(
        private readonly productVariationRepository: ProductVariationRepository
    ) {
        this.getProductVariations = this.getProductVariations.bind(this);
        this.getDetailProductVariation = this.getDetailProductVariation.bind(this);
        this.createProductVariation = this.createProductVariation.bind(this);
        this.updateProductVariation = this.updateProductVariation.bind(this);
        this.deleteProductVariation = this.deleteProductVariation.bind(this);
        this.findProductVariationByName = this.findProductVariationByName.bind(this);
    }

    public async getProductVariations(cmp_uuid: string, pro_uuid: string) {
        try {
            const productVariation = await this.productVariationRepository.getProductVariations(cmp_uuid, pro_uuid);
            if(!productVariation) {
                throw new Error('No hay variaciones de articulo.'); 
            }
            return productVariation.map(productVariation => ({
                cmp_uuid: productVariation.cmp_uuid,
                pro_uuid: productVariation.pro_uuid,
                prov_uuid: productVariation.prov_uuid,
                prov_code: productVariation.prov_code,
                prov_sku: productVariation.prov_sku,
                prov_name: productVariation.prov_name,
                prov_description: productVariation.prov_description,
                prov_image: productVariation.prov_image,
                prov_color: productVariation.prov_color,
                prov_size: productVariation.prov_size,
                prov_stock: productVariation.prov_stock,
                prov_suggestedminimumsellingprice: productVariation.prov_suggestedminimumsellingprice,
                prov_createdat: TimezoneConverter.toIsoStringInTimezone(productVariation.prov_createdat, 'America/Buenos_Aires'),
                prov_updatedat: TimezoneConverter.toIsoStringInTimezone(productVariation.prov_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getProductVariations (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string) {
        try {
            const productVariation = await this.productVariationRepository.findProductVariationById(cmp_uuid, pro_uuid, prov_uuid);
            if(!productVariation) {
                throw new Error(`No hay variacion de articulo con el Id: ${cmp_uuid}, ${pro_uuid}, ${prov_uuid}`);
            }
            return {
                cmp_uuid: productVariation.cmp_uuid,
                pro_uuid: productVariation.pro_uuid,
                prov_uuid: productVariation.prov_uuid,
                prov_code: productVariation.prov_code,
                prov_sku: productVariation.prov_sku,
                prov_name: productVariation.prov_name,
                prov_description: productVariation.prov_description,
                prov_image: productVariation.prov_image,
                prov_color: productVariation.prov_color,
                prov_size: productVariation.prov_size,
                prov_stock: productVariation.prov_stock,
                prov_suggestedminimumsellingprice: productVariation.prov_suggestedminimumsellingprice,
                prov_createdat: TimezoneConverter.toIsoStringInTimezone(productVariation.prov_createdat, 'America/Buenos_Aires'),
                prov_updatedat: TimezoneConverter.toIsoStringInTimezone(productVariation.prov_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailProduct (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createProductVariation({ cmp_uuid, pro_uuid, prov_uuid, prov_code, prov_sku, prov_name, prov_description, prov_image, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice } : { cmp_uuid: string, pro_uuid: string, prov_uuid: string, prov_code: string, prov_sku: string, prov_name: string, prov_description: string, prov_image: string, prov_color: string, prov_size: string, prov_stock: number; prov_suggestedminimumsellingprice: number }) {
        try {
            const productVariationValue = new ProductVariationValue({ cmp_uuid, pro_uuid, prov_uuid, prov_code, prov_sku, prov_name, prov_description, prov_image, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice });
            const productVariationCreated = await this.productVariationRepository.createProductVariation(productVariationValue);
            if(!productVariationCreated) {
                throw new Error(`No se pudo insertar la variacion de articulo.`);
            }
            return {
                cmp_uuid: productVariationCreated.cmp_uuid,
                pro_uuid: productVariationCreated.pro_uuid,
                prov_uuid: productVariationCreated.prov_uuid,
                prov_code: productVariationCreated.prov_code,
                prov_sku: productVariationCreated.prov_sku,
                prov_name: productVariationCreated.prov_name,
                prov_description: productVariationCreated.prov_description,
                prov_image: productVariationCreated.prov_image,
                prov_color: productVariationCreated.prov_color,
                prov_size: productVariationCreated.prov_size,
                prov_stock: productVariationCreated.prov_stock,
                prov_suggestedminimumsellingprice: productVariationCreated.prov_suggestedminimumsellingprice,
                prov_createdat: TimezoneConverter.toIsoStringInTimezone(productVariationCreated.prov_createdat, 'America/Buenos_Aires'),
                prov_updatedat: TimezoneConverter.toIsoStringInTimezone(productVariationCreated.prov_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createProductVariation (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string, { prov_code, prov_sku, prov_name, prov_description, prov_image, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice } : { prov_code: string, prov_sku: string, prov_name: string, prov_description: string, prov_image: string, prov_color: string, prov_size: string, prov_stock: number, prov_suggestedminimumsellingprice: number }) {
        try {
            const productVariationUpdated = await this.productVariationRepository.updateProductVariation(cmp_uuid, pro_uuid, prov_uuid, { prov_code, prov_sku, prov_name, prov_description, prov_image, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice });
            if(!productVariationUpdated) {
                throw new Error(`No se pudo actualizar la variacion de articulo.`);
            }
            return {
                cmp_uuid: productVariationUpdated.cmp_uuid,
                pro_uuid: productVariationUpdated.pro_uuid,
                prov_uuid: productVariationUpdated.prov_uuid,
                prov_code: productVariationUpdated.prov_code,
                prov_sku: productVariationUpdated.prov_sku,
                prov_name: productVariationUpdated.prov_name,
                prov_description: productVariationUpdated.prov_description,
                prov_image: productVariationUpdated.prov_image,
                prov_color: productVariationUpdated.prov_color,
                prov_size: productVariationUpdated.prov_size,
                prov_stock: productVariationUpdated.prov_stock,
                prov_suggestedminimumsellingprice: productVariationUpdated.prov_suggestedminimumsellingprice,
                prov_createdat: TimezoneConverter.toIsoStringInTimezone(productVariationUpdated.prov_createdat, 'America/Buenos_Aires'),
                prov_updatedat: TimezoneConverter.toIsoStringInTimezone(productVariationUpdated.prov_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateProductVariation (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string) {
        try {
            const productVariationDeleted = await this.productVariationRepository.deleteProductVariation(cmp_uuid, pro_uuid, prov_uuid);
            if(!productVariationDeleted) {
                throw new Error(`No se pudo eliminar la variacion de articulo.`);
            }
            return {
                cmp_uuid: productVariationDeleted.cmp_uuid,
                pro_uuid: productVariationDeleted.pro_uuid,
                prov_uuid: productVariationDeleted.prov_uuid,
                prov_code: productVariationDeleted.prov_code,
                prov_sku: productVariationDeleted.prov_sku,
                prov_name: productVariationDeleted.prov_name,
                prov_description: productVariationDeleted.prov_description,
                prov_image: productVariationDeleted.prov_image,
                prov_color: productVariationDeleted.prov_color,
                prov_size: productVariationDeleted.prov_size,
                prov_stock: productVariationDeleted.prov_stock,
                prov_suggestedminimumsellingprice: productVariationDeleted.prov_suggestedminimumsellingprice,
                prov_createdat: TimezoneConverter.toIsoStringInTimezone(productVariationDeleted.prov_createdat, 'America/Buenos_Aires'),
                prov_updatedat: TimezoneConverter.toIsoStringInTimezone(productVariationDeleted.prov_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteProductVariation (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findProductVariationByName(cmp_uuid: string, pro_uuid: string, prov_name: string, excludeUuid?: string) {
        try {
            const productVariation = await this.productVariationRepository.findProductVariationByName(cmp_uuid, pro_uuid, prov_name, excludeUuid)
            if(productVariation) {
                throw new Error(`Ya existe una variacion de articulo con el nombre ${prov_name}.`);
            }
            return productVariation
        } catch (error: any) {
            console.error('Error en findProductVariationByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}