import { TypeStockMovementRepository } from "../../domain/type-stock-movement/type-stock-movement.repository";
import { TypeStockMovementValue } from "../../domain/type-stock-movement/type-stock-movement.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class TypeStockMovementUseCase {
    constructor(
        private readonly typeStockMovementRepository: TypeStockMovementRepository
    ) {
        this.getTypeStockMovements = this.getTypeStockMovements.bind(this);
        this.findTypeStockMovementById = this.findTypeStockMovementById.bind(this);
        this.createTypeStockMovement = this.createTypeStockMovement.bind(this);
        this.updateTypeStockMovement = this.updateTypeStockMovement.bind(this);
        this.deleteTypeStockMovement = this.deleteTypeStockMovement.bind(this);
    }

    public async getTypeStockMovements() {
        try {
            const movements = await this.typeStockMovementRepository.getTypeStockMovements();
            if (!movements) {
                return [];
            }
            return movements.map(movement => ({
                tsmo_uuid: movement.tsmo_uuid,
                tsmo_code: movement.tsmo_code,
                tsmo_name: movement.tsmo_name,
                tsmo_description: movement.tsmo_description,
                tsmo_bkcolor: movement.tsmo_bkcolor,
                tsmo_frcolor: movement.tsmo_frcolor,
                tsmo_createdat: movement.tsmo_createdat ? TimezoneConverter.toIsoStringInTimezone(movement.tsmo_createdat, 'America/Buenos_Aires') : undefined,
                tsmo_updatedat: movement.tsmo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movement.tsmo_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getTypeStockMovements (use case):', error.message);
            throw error;
        }
    }

    public async findTypeStockMovementById(tsmo_uuid: string) {
        try {
            const movement = await this.typeStockMovementRepository.findTypeStockMovementById(tsmo_uuid);
            if (!movement) {
                throw new Error(`No se encontró el tipo de movimiento con Id: ${tsmo_uuid}`);
            }
            return {
                tsmo_uuid: movement.tsmo_uuid,
                tsmo_code: movement.tsmo_code,
                tsmo_name: movement.tsmo_name,
                tsmo_description: movement.tsmo_description,
                tsmo_bkcolor: movement.tsmo_bkcolor,
                tsmo_frcolor: movement.tsmo_frcolor,
                tsmo_createdat: movement.tsmo_createdat ? TimezoneConverter.toIsoStringInTimezone(movement.tsmo_createdat, 'America/Buenos_Aires') : undefined,
                tsmo_updatedat: movement.tsmo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movement.tsmo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findTypeStockMovementById (use case):', error.message);
            throw error;
        }
    }

    public async createTypeStockMovement({ tsmo_code, tsmo_name, tsmo_description, tsmo_bkcolor, tsmo_frcolor }: { tsmo_code: string, tsmo_name: string, tsmo_description: string, tsmo_bkcolor: string, tsmo_frcolor: string }) {
        try {
            // Verificar si ya existe un tipo de movimiento con el mismo nombre
            const existingMovement = await this.typeStockMovementRepository.findTypeStockMovementByName(tsmo_name);
            if (existingMovement) {
                throw new Error(`Ya existe un tipo de movimiento de stock con el nombre: '${tsmo_name}'`);
            }

            const movementValue = new TypeStockMovementValue({ tsmo_code, tsmo_name, tsmo_description, tsmo_bkcolor, tsmo_frcolor });
            const movementCreated = await this.typeStockMovementRepository.createTypeStockMovement(movementValue);
            if (!movementCreated) {
                throw new Error(`No se pudo crear el tipo de movimiento de stock.`);
            }

            return {
                tsmo_uuid: movementCreated.tsmo_uuid,
                tsmo_code: movementCreated.tsmo_code,
                tsmo_name: movementCreated.tsmo_name,
                tsmo_description: movementCreated.tsmo_description,
                tsmo_bkcolor: movementCreated.tsmo_bkcolor,
                tsmo_frcolor: movementCreated.tsmo_frcolor,
                tsmo_createdat: movementCreated.tsmo_createdat ? TimezoneConverter.toIsoStringInTimezone(movementCreated.tsmo_createdat, 'America/Buenos_Aires') : undefined,
                tsmo_updatedat: movementCreated.tsmo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movementCreated.tsmo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createTypeStockMovement (use case):', error.message);
            throw error;
        }
    }

    public async updateTypeStockMovement(tsmo_uuid: string, { tsmo_code, tsmo_name, tsmo_description, tsmo_bkcolor, tsmo_frcolor }: { tsmo_code: string, tsmo_name: string, tsmo_description: string, tsmo_bkcolor: string, tsmo_frcolor: string }) {
        try {
            // Verificar si el nombre ya está tomado por otro tipo
            const existingWithName = await this.typeStockMovementRepository.findTypeStockMovementByName(tsmo_name, tsmo_uuid);
            if (existingWithName) {
                throw new Error(`Ya existe otro tipo de movimiento de stock con el nombre: '${tsmo_name}'`);
            }

            const movementUpdated = await this.typeStockMovementRepository.updateTypeStockMovement(tsmo_uuid, { tsmo_code, tsmo_name, tsmo_description, tsmo_bkcolor, tsmo_frcolor });
            if (!movementUpdated) {
                throw new Error(`No se pudo actualizar el tipo de movimiento de stock.`);
            }

            return {
                tsmo_uuid: movementUpdated.tsmo_uuid,
                tsmo_code: movementUpdated.tsmo_code,
                tsmo_name: movementUpdated.tsmo_name,
                tsmo_description: movementUpdated.tsmo_description,
                tsmo_bkcolor: movementUpdated.tsmo_bkcolor,
                tsmo_frcolor: movementUpdated.tsmo_frcolor,
                tsmo_createdat: movementUpdated.tsmo_createdat ? TimezoneConverter.toIsoStringInTimezone(movementUpdated.tsmo_createdat, 'America/Buenos_Aires') : undefined,
                tsmo_updatedat: movementUpdated.tsmo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movementUpdated.tsmo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateTypeStockMovement (use case):', error.message);
            throw error;
        }
    }

    public async deleteTypeStockMovement(tsmo_uuid: string) {
        try {
            const movementDeleted = await this.typeStockMovementRepository.deleteTypeStockMovement(tsmo_uuid);
            if (!movementDeleted) {
                throw new Error(`No se pudo eliminar el tipo de movimiento de stock.`);
            }

            return {
                tsmo_uuid: movementDeleted.tsmo_uuid,
                tsmo_code: movementDeleted.tsmo_code,
                tsmo_name: movementDeleted.tsmo_name,
                tsmo_description: movementDeleted.tsmo_description,
                tsmo_bkcolor: movementDeleted.tsmo_bkcolor,
                tsmo_frcolor: movementDeleted.tsmo_frcolor,
                tsmo_createdat: movementDeleted.tsmo_createdat ? TimezoneConverter.toIsoStringInTimezone(movementDeleted.tsmo_createdat, 'America/Buenos_Aires') : undefined,
                tsmo_updatedat: movementDeleted.tsmo_updatedat ? TimezoneConverter.toIsoStringInTimezone(movementDeleted.tsmo_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteTypeStockMovement (use case):', error.message);
            throw error;
        }
    }
}
