import { WarehouseRepository } from "../../domain/warehouse/warehouse.repository";
import { WarehouseValue } from "../../domain/warehouse/warehouse.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class WarehouseUseCase {
    constructor(
        private readonly warehouseRepository: WarehouseRepository
    ) {
        this.getWarehouses = this.getWarehouses.bind(this);
        this.findWarehouseById = this.findWarehouseById.bind(this);
        this.createWarehouse = this.createWarehouse.bind(this);
        this.updateWarehouse = this.updateWarehouse.bind(this);
        this.deleteWarehouse = this.deleteWarehouse.bind(this);
    }

    public async getWarehouses(cmp_uuid: string) {
        try {
            const warehouses = await this.warehouseRepository.getWarehouses(cmp_uuid);
            if (!warehouses) {
                return [];
            }
            return warehouses.map(warehouse => ({
                cmp_uuid: warehouse.cmp_uuid,
                war_uuid: warehouse.war_uuid,
                war_name: warehouse.war_name,
                war_address: warehouse.war_address,
                war_lat: warehouse.war_lat,
                war_lng: warehouse.war_lng,
                war_active: warehouse.war_active,
                war_createdat: warehouse.war_createdat ? TimezoneConverter.toIsoStringInTimezone(warehouse.war_createdat, 'America/Buenos_Aires') : undefined,
                war_updatedat: warehouse.war_updatedat ? TimezoneConverter.toIsoStringInTimezone(warehouse.war_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getWarehouses (use case):', error.message);
            throw error;
        }
    }

    public async findWarehouseById(cmp_uuid: string, war_uuid: string) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(cmp_uuid, war_uuid);
            if (!warehouse) {
                throw new Error(`No se encontró el almacén con Id: ${war_uuid}`);
            }
            return {
                cmp_uuid: warehouse.cmp_uuid,
                war_uuid: warehouse.war_uuid,
                war_name: warehouse.war_name,
                war_address: warehouse.war_address,
                war_lat: warehouse.war_lat,
                war_lng: warehouse.war_lng,
                war_active: warehouse.war_active,
                war_createdat: warehouse.war_createdat ? TimezoneConverter.toIsoStringInTimezone(warehouse.war_createdat, 'America/Buenos_Aires') : undefined,
                war_updatedat: warehouse.war_updatedat ? TimezoneConverter.toIsoStringInTimezone(warehouse.war_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findWarehouseById (use case):', error.message);
            throw error;
        }
    }

    public async createWarehouse(data: { cmp_uuid: string, war_name: string, war_address: string, war_lat: number, war_lng: number, war_active: boolean }) {
        try {
            // Verificar si ya existe un almacén con el mismo nombre
            const existingWarehouse = await this.warehouseRepository.findWarehouseByName(data.war_name);
            if (existingWarehouse) {
                throw new Error(`Ya existe un almacén con el nombre: '${data.war_name}'`);
            }

            const warehouseValue = new WarehouseValue(data);
            const warehouseCreated = await this.warehouseRepository.createWarehouse(warehouseValue);
            if (!warehouseCreated) {
                throw new Error(`No se pudo crear el almacén.`);
            }

            return {
                cmp_uuid: warehouseCreated.cmp_uuid,
                war_uuid: warehouseCreated.war_uuid,
                war_name: warehouseCreated.war_name,
                war_address: warehouseCreated.war_address,
                war_lat: warehouseCreated.war_lat,
                war_lng: warehouseCreated.war_lng,
                war_active: warehouseCreated.war_active,
                war_createdat: warehouseCreated.war_createdat ? TimezoneConverter.toIsoStringInTimezone(warehouseCreated.war_createdat, 'America/Buenos_Aires') : undefined,
                war_updatedat: warehouseCreated.war_updatedat ? TimezoneConverter.toIsoStringInTimezone(warehouseCreated.war_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createWarehouse (use case):', error.message);
            throw error;
        }
    }

    public async updateWarehouse(cmp_uuid: string, war_uuid: string, data: { war_name: string, war_address: string, war_lat: number, war_lng: number, war_active: boolean }) {
        try {
            // Verificar si el nombre ya está tomado por otro almacén
            const existingWithName = await this.warehouseRepository.findWarehouseByName(data.war_name, war_uuid);
            if (existingWithName) {
                throw new Error(`Ya existe otro almacén con el nombre: '${data.war_name}'`);
            }

            const warehouseUpdated = await this.warehouseRepository.updateWarehouse(cmp_uuid, war_uuid, data);
            if (!warehouseUpdated) {
                throw new Error(`No se pudo actualizar el almacén.`);
            }

            return {
                cmp_uuid: warehouseUpdated.cmp_uuid,
                war_uuid: warehouseUpdated.war_uuid,
                war_name: warehouseUpdated.war_name,
                war_address: warehouseUpdated.war_address,
                war_lat: warehouseUpdated.war_lat,
                war_lng: warehouseUpdated.war_lng,
                war_active: warehouseUpdated.war_active,
                war_createdat: warehouseUpdated.war_createdat ? TimezoneConverter.toIsoStringInTimezone(warehouseUpdated.war_createdat, 'America/Buenos_Aires') : undefined,
                war_updatedat: warehouseUpdated.war_updatedat ? TimezoneConverter.toIsoStringInTimezone(warehouseUpdated.war_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateWarehouse (use case):', error.message);
            throw error;
        }
    }

    public async deleteWarehouse(cmp_uuid: string, war_uuid: string) {
        try {
            const warehouseDeleted = await this.warehouseRepository.deleteWarehouse(cmp_uuid, war_uuid);
            if (!warehouseDeleted) {
                throw new Error(`No se pudo eliminar el almacén.`);
            }

            return {
                cmp_uuid: warehouseDeleted.cmp_uuid,
                war_uuid: warehouseDeleted.war_uuid,
                war_name: warehouseDeleted.war_name,
                war_address: warehouseDeleted.war_address,
                war_lat: warehouseDeleted.war_lat,
                war_lng: warehouseDeleted.war_lng,
                war_active: warehouseDeleted.war_active,
                war_createdat: warehouseDeleted.war_createdat ? TimezoneConverter.toIsoStringInTimezone(warehouseDeleted.war_createdat, 'America/Buenos_Aires') : undefined,
                war_updatedat: warehouseDeleted.war_updatedat ? TimezoneConverter.toIsoStringInTimezone(warehouseDeleted.war_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteWarehouse (use case):', error.message);
            throw error;
        }
    }
}
