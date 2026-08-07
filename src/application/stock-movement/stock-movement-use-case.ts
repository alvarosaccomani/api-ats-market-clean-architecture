import { StockMovementRepository } from "../../domain/stock-movement/stock-movement.repository";
import { StockMovementValue } from "../../domain/stock-movement/stock-movement.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";
import { InventoryStockRepository } from "../../domain/inventory-stock/inventory-stock.repository";
import { ProductVariationRepository } from "../../domain/product-variation/product-variation.repository";
import { InventoryStockValue } from "../../domain/inventory-stock/inventory-stock.value";
import { sequelize } from "../../infrastructure/db/sequelize";

export class StockMovementUseCase {
    constructor(
        private readonly stockMovementRepository: StockMovementRepository,
        private readonly inventoryStockRepository: InventoryStockRepository,
        private readonly productVariationRepository: ProductVariationRepository
    ) {
        this.getStockMovements = this.getStockMovements.bind(this);
        this.findStockMovementById = this.findStockMovementById.bind(this);
        this.createStockMovement = this.createStockMovement.bind(this);
        this.updateStockMovement = this.updateStockMovement.bind(this);
        this.deleteStockMovement = this.deleteStockMovement.bind(this);
        this.registerStockAdjustment = this.registerStockAdjustment.bind(this);
    }

    public async getStockMovements(cmp_uuid: string) {
        try {
            const movements = await this.stockMovementRepository.getStockMovements(cmp_uuid);
            if (!movements) {
                return [];
            }
            return movements.map(movement => ({
                cmp_uuid: movement.cmp_uuid,
                pro_uuid: movement.pro_uuid,
                prov_uuid: movement.prov_uuid,
                smo_uuid: movement.smo_uuid,
                ord_uuid: movement.ord_uuid,
                usr_uuid: movement.usr_uuid,
                tsmo_uuid: movement.tsmo_uuid,
                smo_quantity: movement.smo_quantity,
                smo_previousstock: movement.smo_previousstock,
                smo_currentstock: movement.smo_currentstock,
                smo_reason: movement.smo_reason,
                smo_createdat: movement.smo_createdat ? TimezoneConverter.toIsoStringInTimezone(movement.smo_createdat, 'America/Buenos_Aires') : undefined,
                smo_updatedat: movement.smo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movement.smo_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getStockMovements (use case):', error.message);
            throw error;
        }
    }

    public async findStockMovementById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string) {
        try {
            const movement = await this.stockMovementRepository.findStockMovementById(cmp_uuid, pro_uuid, prov_uuid, smo_uuid);
            if (!movement) {
                throw new Error(`No se encontró el movimiento de stock.`);
            }
            return {
                cmp_uuid: movement.cmp_uuid,
                pro_uuid: movement.pro_uuid,
                prov_uuid: movement.prov_uuid,
                smo_uuid: movement.smo_uuid,
                ord_uuid: movement.ord_uuid,
                usr_uuid: movement.usr_uuid,
                tsmo_uuid: movement.tsmo_uuid,
                smo_quantity: movement.smo_quantity,
                smo_previousstock: movement.smo_previousstock,
                smo_currentstock: movement.smo_currentstock,
                smo_reason: movement.smo_reason,
                smo_createdat: movement.smo_createdat ? TimezoneConverter.toIsoStringInTimezone(movement.smo_createdat, 'America/Buenos_Aires') : undefined,
                smo_updatedat: movement.smo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movement.smo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findStockMovementById (use case):', error.message);
            throw error;
        }
    }

    public async createStockMovement(data: { cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid?: string, ord_uuid?: string, usr_uuid?: string, tsmo_uuid: string, smo_quantity: number, smo_previousstock: number, smo_currentstock: number, smo_reason: string }) {
        try {
            const movementValue = new StockMovementValue(data);
            const movementCreated = await this.stockMovementRepository.createStockMovement(movementValue);
            if (!movementCreated) {
                throw new Error(`No se pudo registrar el movimiento de stock.`);
            }
            return {
                cmp_uuid: movementCreated.cmp_uuid,
                pro_uuid: movementCreated.pro_uuid,
                prov_uuid: movementCreated.prov_uuid,
                smo_uuid: movementCreated.smo_uuid,
                ord_uuid: movementCreated.ord_uuid,
                usr_uuid: movementCreated.usr_uuid,
                tsmo_uuid: movementCreated.tsmo_uuid,
                smo_quantity: movementCreated.smo_quantity,
                smo_previousstock: movementCreated.smo_previousstock,
                smo_currentstock: movementCreated.smo_currentstock,
                smo_reason: movementCreated.smo_reason,
                smo_createdat: movementCreated.smo_createdat ? TimezoneConverter.toIsoStringInTimezone(movementCreated.smo_createdat, 'America/Buenos_Aires') : undefined,
                smo_updatedat: movementCreated.smo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movementCreated.smo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createStockMovement (use case):', error.message);
            throw error;
        }
    }

    public async updateStockMovement(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string, data: { ord_uuid?: string, usr_uuid?: string, tsmo_uuid: string, smo_quantity: number, smo_previousstock: number, smo_currentstock: number, smo_reason: string }) {
        try {
            const movementUpdated = await this.stockMovementRepository.updateStockMovement(cmp_uuid, pro_uuid, prov_uuid, smo_uuid, data);
            if (!movementUpdated) {
                throw new Error(`No se pudo actualizar el movimiento de stock.`);
            }
            return {
                cmp_uuid: movementUpdated.cmp_uuid,
                pro_uuid: movementUpdated.pro_uuid,
                prov_uuid: movementUpdated.prov_uuid,
                smo_uuid: movementUpdated.smo_uuid,
                ord_uuid: movementUpdated.ord_uuid,
                usr_uuid: movementUpdated.usr_uuid,
                tsmo_uuid: movementUpdated.tsmo_uuid,
                smo_quantity: movementUpdated.smo_quantity,
                smo_previousstock: movementUpdated.smo_previousstock,
                smo_currentstock: movementUpdated.smo_currentstock,
                smo_reason: movementUpdated.smo_reason,
                smo_createdat: movementUpdated.smo_createdat ? TimezoneConverter.toIsoStringInTimezone(movementUpdated.smo_createdat, 'America/Buenos_Aires') : undefined,
                smo_updatedat: movementUpdated.smo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movementUpdated.smo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateStockMovement (use case):', error.message);
            throw error;
        }
    }

    public async deleteStockMovement(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string) {
        try {
            const movementDeleted = await this.stockMovementRepository.deleteStockMovement(cmp_uuid, pro_uuid, prov_uuid, smo_uuid);
            if (!movementDeleted) {
                throw new Error(`No se pudo eliminar el movimiento de stock.`);
            }
            return {
                cmp_uuid: movementDeleted.cmp_uuid,
                pro_uuid: movementDeleted.pro_uuid,
                prov_uuid: movementDeleted.prov_uuid,
                smo_uuid: movementDeleted.smo_uuid,
                ord_uuid: movementDeleted.ord_uuid,
                usr_uuid: movementDeleted.usr_uuid,
                tsmo_uuid: movementDeleted.tsmo_uuid,
                smo_quantity: movementDeleted.smo_quantity,
                smo_previousstock: movementDeleted.smo_previousstock,
                smo_currentstock: movementDeleted.smo_currentstock,
                smo_reason: movementDeleted.smo_reason,
                smo_createdat: movementDeleted.smo_createdat ? TimezoneConverter.toIsoStringInTimezone(movementDeleted.smo_createdat, 'America/Buenos_Aires') : undefined,
                smo_updatedat: movementDeleted.smo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movementDeleted.smo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteStockMovement (use case):', error.message);
            throw error;
        }
    }

    public async registerStockAdjustment(data: {
        cmp_uuid: string;
        pro_uuid: string;
        prov_uuid: string;
        war_uuid: string;
        warl_uuid: string;
        usr_uuid: string | null;
        tsmo_uuid: string;
        smo_quantity: number;
        smo_previousstock: number;
        smo_currentstock: number;
        smo_reason: string;
    }) {
        const transaction = await sequelize.transaction();
        try {
            // A) Insertar el movimiento en stock_movements
            const movementValue = new StockMovementValue({
                cmp_uuid: data.cmp_uuid,
                pro_uuid: data.pro_uuid,
                prov_uuid: data.prov_uuid,
                usr_uuid: data.usr_uuid || undefined,
                tsmo_uuid: data.tsmo_uuid,
                smo_quantity: data.smo_quantity,
                smo_previousstock: data.smo_previousstock,
                smo_currentstock: data.smo_currentstock,
                smo_reason: data.smo_reason
            });
            const movementCreated = await this.stockMovementRepository.createStockMovement(movementValue, { transaction });
            if (!movementCreated) {
                throw new Error("No se pudo registrar el movimiento de stock.");
            }

            // B) Crear o actualizar el stock en inventory_stock:
            const existingStock = await this.inventoryStockRepository.findInventoryStockById(
                data.cmp_uuid,
                data.pro_uuid,
                data.prov_uuid,
                data.war_uuid,
                data.warl_uuid
            );

            if (existingStock) {
                await this.inventoryStockRepository.updateInventoryStock(
                    data.cmp_uuid,
                    data.pro_uuid,
                    data.prov_uuid,
                    data.war_uuid,
                    data.warl_uuid,
                    {
                        ist_quanty: data.smo_currentstock,
                        ist_quantyreserved: existingStock.ist_quantyreserved
                    },
                    { transaction }
                );
            } else {
                const newStock = new InventoryStockValue({
                    cmp_uuid: data.cmp_uuid,
                    pro_uuid: data.pro_uuid,
                    prov_uuid: data.prov_uuid,
                    war_uuid: data.war_uuid,
                    warl_uuid: data.warl_uuid,
                    ist_quanty: data.smo_currentstock,
                    ist_quantyreserved: 0
                });
                await this.inventoryStockRepository.createInventoryStock(newStock, { transaction });
            }

            // C) Actualizar el stock global acumulado en la variación del producto (ProductVariation):
            const variation = await this.productVariationRepository.findProductVariationById(
                data.cmp_uuid,
                data.pro_uuid,
                data.prov_uuid
            );
            if (!variation) {
                throw new Error(`No se encontró la variación de producto con ID: ${data.prov_uuid}`);
            }

            const delta = data.smo_currentstock - data.smo_previousstock;
            const newVariationStock = (variation.prov_stock || 0) + delta;

            await this.productVariationRepository.updateProductVariation(
                data.cmp_uuid,
                data.pro_uuid,
                data.prov_uuid,
                {
                    prov_code: variation.prov_code,
                    prov_sku: variation.prov_sku,
                    prov_name: variation.prov_name,
                    prov_description: variation.prov_description,
                    prov_image: variation.prov_image,
                    mat_uuid: variation.mat_uuid,
                    prov_color: variation.prov_color,
                    prov_size: variation.prov_size,
                    prov_stock: newVariationStock,
                    prov_suggestedminimumsellingprice: variation.prov_suggestedminimumsellingprice
                },
                { transaction }
            );

            // D) Hacer commit y retornar el movimiento.
            await transaction.commit();

            return {
                cmp_uuid: movementCreated.cmp_uuid,
                pro_uuid: movementCreated.pro_uuid,
                prov_uuid: movementCreated.prov_uuid,
                smo_uuid: movementCreated.smo_uuid,
                ord_uuid: movementCreated.ord_uuid,
                usr_uuid: movementCreated.usr_uuid,
                tsmo_uuid: movementCreated.tsmo_uuid,
                smo_quantity: movementCreated.smo_quantity,
                smo_previousstock: movementCreated.smo_previousstock,
                smo_currentstock: movementCreated.smo_currentstock,
                smo_reason: movementCreated.smo_reason,
                smo_createdat: movementCreated.smo_createdat ? TimezoneConverter.toIsoStringInTimezone(movementCreated.smo_createdat, 'America/Buenos_Aires') : undefined,
                smo_updatedat: movementCreated.smo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movementCreated.smo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
