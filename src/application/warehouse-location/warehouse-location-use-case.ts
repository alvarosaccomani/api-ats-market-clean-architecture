import { WarehouseLocationRepository } from "../../domain/warehouse-location/warehouse-location.repository";
import { WarehouseLocationValue } from "../../domain/warehouse-location/warehouse-location.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class WarehouseLocationUseCase {
    constructor(
        private readonly warehouseLocationRepository: WarehouseLocationRepository
    ) {
        this.getWarehouseLocations = this.getWarehouseLocations.bind(this);
        this.findWarehouseLocationById = this.findWarehouseLocationById.bind(this);
        this.createWarehouseLocation = this.createWarehouseLocation.bind(this);
        this.createWarehouseLocationsBatch = this.createWarehouseLocationsBatch.bind(this);
        this.updateWarehouseLocation = this.updateWarehouseLocation.bind(this);
        this.deleteWarehouseLocation = this.deleteWarehouseLocation.bind(this);
    }

    public async getWarehouseLocations(cmp_uuid: string, war_uuid?: string) {
        try {
            const locations = await this.warehouseLocationRepository.getWarehouseLocations(cmp_uuid, war_uuid);
            if (!locations) {
                return [];
            }
            return locations.map(location => ({
                cmp_uuid: location.cmp_uuid,
                war_uuid: location.war_uuid,
                warl_uuid: location.warl_uuid,
                warl_aisle: location.warl_aisle,
                warl_sector: location.warl_sector,
                warl_rack: location.warl_rack,
                warl_shelf: location.warl_shelf,
                warl_bincode: location.warl_bincode,
                warl_active: location.warl_active,
                warl_createdat: location.warl_createdat ? TimezoneConverter.toIsoStringInTimezone(location.warl_createdat, 'America/Buenos_Aires') : undefined,
                warl_updatedat: location.warl_updatedat ? TimezoneConverter.toIsoStringInTimezone(location.warl_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getWarehouseLocations (use case):', error.message);
            throw error;
        }
    }

    public async findWarehouseLocationById(cmp_uuid: string, war_uuid: string, warl_uuid: string) {
        try {
            const location = await this.warehouseLocationRepository.findWarehouseLocationById(cmp_uuid, war_uuid, warl_uuid);
            if (!location) {
                throw new Error(`No se encontró la ubicación de almacén.`);
            }
            return {
                cmp_uuid: location.cmp_uuid,
                war_uuid: location.war_uuid,
                warl_uuid: location.warl_uuid,
                warl_aisle: location.warl_aisle,
                warl_sector: location.warl_sector,
                warl_rack: location.warl_rack,
                warl_shelf: location.warl_shelf,
                warl_bincode: location.warl_bincode,
                warl_active: location.warl_active,
                warl_createdat: location.warl_createdat ? TimezoneConverter.toIsoStringInTimezone(location.warl_createdat, 'America/Buenos_Aires') : undefined,
                warl_updatedat: location.warl_updatedat ? TimezoneConverter.toIsoStringInTimezone(location.warl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findWarehouseLocationById (use case):', error.message);
            throw error;
        }
    }

    public async createWarehouseLocation(data: { cmp_uuid: string, war_uuid: string, warl_uuid: string, warl_aisle: string, warl_sector: string, warl_rack: string, warl_shelf: string, warl_bincode: string, warl_active: boolean }) {
        try {
            const locationValue = new WarehouseLocationValue(data);
            const locationCreated = await this.warehouseLocationRepository.createWarehouseLocation(locationValue);
            if (!locationCreated) {
                throw new Error(`No se pudo crear la ubicación de almacén.`);
            }

            return {
                cmp_uuid: locationCreated.cmp_uuid,
                war_uuid: locationCreated.war_uuid,
                warl_uuid: locationCreated.warl_uuid,
                warl_aisle: locationCreated.warl_aisle,
                warl_sector: locationCreated.warl_sector,
                warl_rack: locationCreated.warl_rack,
                warl_shelf: locationCreated.warl_shelf,
                warl_bincode: locationCreated.warl_bincode,
                warl_active: locationCreated.warl_active,
                warl_createdat: locationCreated.warl_createdat ? TimezoneConverter.toIsoStringInTimezone(locationCreated.warl_createdat, 'America/Buenos_Aires') : undefined,
                warl_updatedat: locationCreated.warl_updatedat ? TimezoneConverter.toIsoStringInTimezone(locationCreated.warl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createWarehouseLocation (use case):', error.message);
            throw error;
        }
    }

    public async createWarehouseLocationsBatch(data: { cmp_uuid: string, war_uuid: string, locations: any[] }) {
        try {
            const { cmp_uuid, war_uuid, locations } = data;
            if (!Array.isArray(locations)) {
                throw new Error("locations debe ser un arreglo.");
            }

            const locationValues = locations.map(loc => {
                return new WarehouseLocationValue({
                    cmp_uuid: loc.cmp_uuid || cmp_uuid,
                    war_uuid: loc.war_uuid || war_uuid,
                    warl_uuid: loc.warl_uuid,
                    warl_aisle: loc.warl_aisle || "",
                    warl_sector: loc.warl_sector || "",
                    warl_rack: loc.warl_rack || "",
                    warl_shelf: loc.warl_shelf || "",
                    warl_bincode: loc.warl_bincode || "",
                    warl_active: loc.warl_active !== undefined ? loc.warl_active : true,
                    warl_createdat: loc.warl_createdat ? new Date(loc.warl_createdat) : undefined,
                    warl_updatedat: loc.warl_updatedat ? new Date(loc.warl_updatedat) : undefined
                });
            });

            const results = await this.warehouseLocationRepository.createWarehouseLocationsBatch(locationValues);
            if (!results) {
                return [];
            }

            return results.map(locationCreated => ({
                cmp_uuid: locationCreated.cmp_uuid,
                war_uuid: locationCreated.war_uuid,
                warl_uuid: locationCreated.warl_uuid,
                warl_aisle: locationCreated.warl_aisle,
                warl_sector: locationCreated.warl_sector,
                warl_rack: locationCreated.warl_rack,
                warl_shelf: locationCreated.warl_shelf,
                warl_bincode: locationCreated.warl_bincode,
                warl_active: locationCreated.warl_active,
                warl_createdat: locationCreated.warl_createdat ? TimezoneConverter.toIsoStringInTimezone(locationCreated.warl_createdat, 'America/Buenos_Aires') : undefined,
                warl_updatedat: locationCreated.warl_updatedat ? TimezoneConverter.toIsoStringInTimezone(locationCreated.warl_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en createWarehouseLocationsBatch (use case):', error.message);
            throw error;
        }
    }

    public async updateWarehouseLocation(cmp_uuid: string, war_uuid: string, warl_uuid: string, data: { warl_aisle: string, warl_sector: string, warl_rack: string, warl_shelf: string, warl_bincode: string, warl_active: boolean }) {
        try {
            const locationUpdated = await this.warehouseLocationRepository.updateWarehouseLocation(cmp_uuid, war_uuid, warl_uuid, data);
            if (!locationUpdated) {
                throw new Error(`No se pudo actualizar la ubicación de almacén.`);
            }

            return {
                cmp_uuid: locationUpdated.cmp_uuid,
                war_uuid: locationUpdated.war_uuid,
                warl_uuid: locationUpdated.warl_uuid,
                warl_aisle: locationUpdated.warl_aisle,
                warl_sector: locationUpdated.warl_sector,
                warl_rack: locationUpdated.warl_rack,
                warl_shelf: locationUpdated.warl_shelf,
                warl_bincode: locationUpdated.warl_bincode,
                warl_active: locationUpdated.warl_active,
                warl_createdat: locationUpdated.warl_createdat ? TimezoneConverter.toIsoStringInTimezone(locationUpdated.warl_createdat, 'America/Buenos_Aires') : undefined,
                warl_updatedat: locationUpdated.warl_updatedat ? TimezoneConverter.toIsoStringInTimezone(locationUpdated.warl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateWarehouseLocation (use case):', error.message);
            throw error;
        }
    }

    public async deleteWarehouseLocation(cmp_uuid: string, war_uuid: string, warl_uuid: string) {
        try {
            const locationDeleted = await this.warehouseLocationRepository.deleteWarehouseLocation(cmp_uuid, war_uuid, warl_uuid);
            if (!locationDeleted) {
                throw new Error(`No se pudo eliminar la ubicación de almacén.`);
            }

            return {
                cmp_uuid: locationDeleted.cmp_uuid,
                war_uuid: locationDeleted.war_uuid,
                warl_uuid: locationDeleted.warl_uuid,
                warl_aisle: locationDeleted.warl_aisle,
                warl_sector: locationDeleted.warl_sector,
                warl_rack: locationDeleted.warl_rack,
                warl_shelf: locationDeleted.warl_shelf,
                warl_bincode: locationDeleted.warl_bincode,
                warl_active: locationDeleted.warl_active,
                warl_createdat: locationDeleted.warl_createdat ? TimezoneConverter.toIsoStringInTimezone(locationDeleted.warl_createdat, 'America/Buenos_Aires') : undefined,
                warl_updatedat: locationDeleted.warl_updatedat ? TimezoneConverter.toIsoStringInTimezone(locationDeleted.warl_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteWarehouseLocation (use case):', error.message);
            throw error;
        }
    }
}
