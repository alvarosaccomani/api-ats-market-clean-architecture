import { v4 as uuid } from "uuid";
import { ProductVariationRepository } from "../../domain/product-variation/product-variation.repository";
import { ProductVariationValue } from "../../domain/product-variation/product-variation.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";
import { CostPerSupplierEntity } from "../../domain/cost-per-supplier/cost-per-supplier.entity";
import { CostPerSupplierRepository } from "../../domain/cost-per-supplier/cost-per-supplier.repository";

export class ProductVariationUseCase {
    constructor(
        private readonly productVariationRepository: ProductVariationRepository,
        private readonly costPerSupplierRepository: CostPerSupplierRepository
    ) {
        this.getProductVariations = this.getProductVariations.bind(this);
        this.getDetailProductVariation = this.getDetailProductVariation.bind(this);
        this.createProductVariation = this.createProductVariation.bind(this);
        this.updateProductVariation = this.updateProductVariation.bind(this);
        this.deleteProductVariation = this.deleteProductVariation.bind(this);
        this.findProductVariationByName = this.findProductVariationByName.bind(this);
        this.checkStock = this.checkStock.bind(this);
        this.searchProductVariations = this.searchProductVariations.bind(this);
    }

    public async getProductVariations(cmp_uuid: string, pro_uuid: string, prov_isvisible?: boolean) {
        try {
            const productVariation = await this.productVariationRepository.getProductVariations(cmp_uuid, pro_uuid, prov_isvisible);
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
                prov_averagerating: productVariation.prov_averagerating ?? 0,
                prov_reviewscount: productVariation.prov_reviewscount ?? 0,
                prov_isvisible: productVariation.prov_isvisible,
                mat_uuid: productVariation.mat_uuid,
                gmat_uuid: productVariation.gmat_uuid,
                gmat_name: productVariation.gmat_name,
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
                prov_averagerating: productVariation.prov_averagerating ?? 0,
                prov_reviewscount: productVariation.prov_reviewscount ?? 0,
                inventoryStock: productVariation.inventoryStock,
                prov_createdat: TimezoneConverter.toIsoStringInTimezone(productVariation.prov_createdat, 'America/Buenos_Aires'),
                prov_updatedat: TimezoneConverter.toIsoStringInTimezone(productVariation.prov_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailProduct (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createProductVariation({ cmp_uuid, pro_uuid, prov_uuid, prov_code, prov_sku, prov_name, prov_description, prov_image, mat_uuid, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice, costsPerSupplier } : { cmp_uuid: string, pro_uuid: string, prov_uuid: string, prov_code: string, prov_sku: string, prov_name: string, prov_description: string, prov_image: string, mat_uuid: string, prov_color: string, prov_size: string, prov_stock: number; prov_suggestedminimumsellingprice: number, costsPerSupplier?: CostPerSupplierEntity[] }) {
        try {
            const productVariationValue = new ProductVariationValue({ cmp_uuid, pro_uuid, prov_uuid, prov_code, prov_sku, prov_name, prov_description, prov_image, mat_uuid, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice, costsPerSupplier });
            const productVariationCreated = await this.productVariationRepository.createProductVariation(productVariationValue);
            if(!productVariationCreated) {
                throw new Error(`No se pudo insertar la variacion de articulo.`);
            }
            if (productVariationValue.costsPerSupplier && productVariationValue.costsPerSupplier.length) {
                const costsPerSupplierCreated = [];
                for (const costPerSupplier of productVariationValue.costsPerSupplier) {
                    costPerSupplier.prov_uuid = productVariationCreated.prov_uuid;
                    costPerSupplier.cps_uuid = uuid();
                    const costPerSupplierCreated = await this.costPerSupplierRepository.createCostPerSupplier(costPerSupplier);
                    if (!costPerSupplierCreated) {
                        throw new Error(`No se pudo insertar el costo por proveedor.`);
                    }
                    costsPerSupplierCreated.push(costPerSupplierCreated);
                }
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
                prov_averagerating: productVariationCreated.prov_averagerating ?? 0,
                prov_reviewscount: productVariationCreated.prov_reviewscount ?? 0,
                prov_createdat: TimezoneConverter.toIsoStringInTimezone(productVariationCreated.prov_createdat, 'America/Buenos_Aires'),
                prov_updatedat: TimezoneConverter.toIsoStringInTimezone(productVariationCreated.prov_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createProductVariation (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateProductVariation(cmp_uuid: string, pro_uuid: string, prov_uuid: string, { prov_code, prov_sku, prov_name, prov_description, prov_image, mat_uuid, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice, costsPerSupplier } : { prov_code: string, prov_sku: string, prov_name: string, prov_description: string, prov_image: string, mat_uuid: string, prov_color: string, prov_size: string, prov_stock: number, prov_suggestedminimumsellingprice: number, costsPerSupplier?: CostPerSupplierEntity[] }) {
        try {
            const productVariationUpdated = await this.productVariationRepository.updateProductVariation(cmp_uuid, pro_uuid, prov_uuid, { prov_code, prov_sku, prov_name, prov_description, prov_image, mat_uuid, prov_color, prov_size, prov_stock, prov_suggestedminimumsellingprice });
            if(!productVariationUpdated) {
                throw new Error(`No se pudo actualizar la variacion de articulo.`);
            }
            if (costsPerSupplier && costsPerSupplier?.length) {
                const costsPerSupplierCreated = [];
                for (const costPerSupplier of costsPerSupplier) {
                    if (!costPerSupplier.cps_uuid) {
                        costPerSupplier.prov_uuid = productVariationUpdated.prov_uuid;
                        costPerSupplier.cps_uuid = uuid();
                        const costPerSupplierCreated = await this.costPerSupplierRepository.createCostPerSupplier(costPerSupplier);
                        if (!costPerSupplierCreated) {
                            throw new Error(`No se pudo insertar el costo por proveedor.`);
                        }
                        costsPerSupplierCreated.push(costPerSupplierCreated);
                    } else {
                        const costsPerSupplierUpdated = await this.costPerSupplierRepository.updateCostPerSupplier(costPerSupplier.cmp_uuid, costPerSupplier.pro_uuid, costPerSupplier.prov_uuid, costPerSupplier.sup_uuid, costPerSupplier.cps_uuid, costPerSupplier);
                        if (!costsPerSupplierUpdated) {
                            throw new Error(`No se pudo actualizar el costo por proveedor.`);
                        }
                        costsPerSupplierCreated.push(costsPerSupplierUpdated);
                    }
                }
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
                prov_averagerating: productVariationUpdated.prov_averagerating ?? 0,
                prov_reviewscount: productVariationUpdated.prov_reviewscount ?? 0,
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
                prov_averagerating: productVariationDeleted.prov_averagerating ?? 0,
                prov_reviewscount: productVariationDeleted.prov_reviewscount ?? 0,
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

    public async checkStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<number> {
        try {
            const stock = await this.productVariationRepository.checkStock(cmp_uuid, pro_uuid, prov_uuid);
            return stock;
        } catch (error: any) {
            console.error('Error en checkStock (use case):', error.message);
            throw error;
        }
    }

    public async searchProductVariations(query: string, cmp_uuid?: string, prov_isvisible?: boolean) {
        try {
            const variations = await this.productVariationRepository.searchProductVariations(query, cmp_uuid, prov_isvisible);
            if (!variations) {
                return [];
            }
            return variations.map(variation => ({
                cmp_uuid: variation.cmp_uuid,
                pro_uuid: variation.pro_uuid,
                prov_uuid: variation.prov_uuid,
                prov_code: variation.prov_code,
                prov_sku: variation.prov_sku,
                prov_name: variation.prov_name,
                prov_description: variation.prov_description,
                prov_image: variation.prov_image,
                prov_color: variation.prov_color,
                prov_size: variation.prov_size,
                prov_stock: variation.prov_stock,
                prov_suggestedminimumsellingprice: variation.prov_suggestedminimumsellingprice,
                prov_averagerating: variation.prov_averagerating ?? 0,
                prov_reviewscount: variation.prov_reviewscount ?? 0,
                prov_isvisible: variation.prov_isvisible,
                cat_uuid: variation.cat_uuid,
                itm_uuid: variation.itm_uuid,
                pro_name: variation.pro_name,
                cmp_name: variation.cmp_name,
                mat_uuid: variation.mat_uuid,
                gmat_uuid: variation.gmat_uuid,
                gmat_name: variation.gmat_name,
                prov_createdat: TimezoneConverter.toIsoStringInTimezone(variation.prov_createdat, 'America/Buenos_Aires'),
                prov_updatedat: TimezoneConverter.toIsoStringInTimezone(variation.prov_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en searchProductVariations (use case):', error.message);
            throw error;
        }
    }

}