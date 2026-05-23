import { StockMovementRepository } from "../../domain/stock-movement/stock-movement.repository";
import { StockMovementValue } from "../../domain/stock-movement/stock-movement.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class StockMovementUseCase {
    constructor(
        private readonly stockMovementRepository: StockMovementRepository
    ) {
        this.getStockMovements = this.getStockMovements.bind(this);
        this.findStockMovementById = this.findStockMovementById.bind(this);
        this.createStockMovement = this.createStockMovement.bind(this);
        this.updateStockMovement = this.updateStockMovement.bind(this);
        this.deleteStockMovement = this.deleteStockMovement.bind(this);
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
}
