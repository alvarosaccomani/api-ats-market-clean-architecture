import { WarehouseLocationEntity, WarehouseLocationUpdateData } from "../../../domain/warehouse-location/warehouse-location.entity";
import { WarehouseLocationRepository } from "../../../domain/warehouse-location/warehouse-location.repository";
import { SequelizeWarehouseLocation } from "../../model/warehouse-location/warehouse-location.model";

export class SequelizeRepository implements WarehouseLocationRepository {
    async getWarehouseLocations(cmp_uuid: string, war_uuid?: string): Promise<WarehouseLocationEntity[] | null> {
        try {
            const whereCondition: any = { cmp_uuid: cmp_uuid ?? null };
            if (war_uuid) {
                whereCondition.war_uuid = war_uuid;
            }
            
            const locations = await SequelizeWarehouseLocation.findAll({
                where: whereCondition
            });
            if (!locations) {
                return null;
            }
            return locations;
        } catch (error: any) {
            console.error('Error en getWarehouseLocations (repository):', error.message);
            throw error;
        }
    }

    async findWarehouseLocationById(cmp_uuid: string, war_uuid: string, warl_uuid: string): Promise<WarehouseLocationEntity | null> {
        try {
            const location = await SequelizeWarehouseLocation.findOne({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    war_uuid: war_uuid ?? null,
                    warl_uuid: warl_uuid ?? null
                }
            });
            if (!location) {
                return null;
            }
            return location.dataValues;
        } catch (error: any) {
            console.error('Error en findWarehouseLocationById (repository):', error.message);
            throw error;
        }
    }

    async createWarehouseLocation(warehouseLocation: WarehouseLocationEntity): Promise<WarehouseLocationEntity | null> {
        try {
            const { 
                cmp_uuid, 
                war_uuid, 
                warl_uuid, 
                warl_aisle, 
                warl_sector, 
                warl_rack, 
                warl_shelf, 
                warl_bincode, 
                warl_active, 
                warl_createdat, 
                warl_updatedat 
            } = warehouseLocation;
            
            const result = await SequelizeWarehouseLocation.create({ 
                cmp_uuid, 
                war_uuid, 
                warl_uuid, 
                warl_aisle, 
                warl_sector, 
                warl_rack, 
                warl_shelf, 
                warl_bincode, 
                warl_active, 
                warl_createdat, 
                warl_updatedat 
            });
            
            if (!result) {
                throw new Error(`No se pudo agregar la ubicación de almacén`);
            }
            
            return result.dataValues as WarehouseLocationEntity;
        } catch (error: any) {
            console.error('Error en createWarehouseLocation (repository):', error.message);
            throw error;
        }
    }

    async createWarehouseLocationsBatch(locations: WarehouseLocationEntity[]): Promise<WarehouseLocationEntity[] | null> {
        try {
            const results = await SequelizeWarehouseLocation.bulkCreate(
                locations.map(loc => ({
                    cmp_uuid: loc.cmp_uuid,
                    war_uuid: loc.war_uuid,
                    warl_uuid: loc.warl_uuid,
                    warl_aisle: loc.warl_aisle,
                    warl_sector: loc.warl_sector,
                    warl_rack: loc.warl_rack,
                    warl_shelf: loc.warl_shelf,
                    warl_bincode: loc.warl_bincode,
                    warl_active: loc.warl_active,
                    warl_createdat: loc.warl_createdat,
                    warl_updatedat: loc.warl_updatedat
                })),
                {
                    returning: true
                }
            );
            return results.map(r => r.dataValues as WarehouseLocationEntity);
        } catch (error: any) {
            console.error('Error en createWarehouseLocationsBatch (repository):', error.message);
            throw error;
        }
    }

    async updateWarehouseLocation(cmp_uuid: string, war_uuid: string, warl_uuid: string, warehouseLocation: WarehouseLocationUpdateData): Promise<WarehouseLocationEntity | null> {
        try {
            const [updatedCount, [updatedLocation]] = await SequelizeWarehouseLocation.update(
                {
                    warl_aisle: warehouseLocation.warl_aisle,
                    warl_sector: warehouseLocation.warl_sector,
                    warl_rack: warehouseLocation.warl_rack,
                    warl_shelf: warehouseLocation.warl_shelf,
                    warl_bincode: warehouseLocation.warl_bincode,
                    warl_active: warehouseLocation.warl_active
                },
                {
                    where: { cmp_uuid, war_uuid, warl_uuid },
                    returning: true,
                }
            );
            
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar la ubicación de almacén`);
            }
            
            return updatedLocation.get({ plain: true }) as WarehouseLocationEntity;
        } catch (error: any) {
            console.error('Error en updateWarehouseLocation (repository):', error.message);
            throw error;
        }
    }

    async deleteWarehouseLocation(cmp_uuid: string, war_uuid: string, warl_uuid: string): Promise<WarehouseLocationEntity | null> {
        try {
            const locationToDelete = await this.findWarehouseLocationById(cmp_uuid, war_uuid, warl_uuid);
            if (!locationToDelete) {
                throw new Error(`No se ha encontrado la ubicación de almacén a eliminar`);
            }
            
            const deletedCount = await SequelizeWarehouseLocation.destroy({
                where: { cmp_uuid, war_uuid, warl_uuid }
            });
            
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar la ubicación de almacén`);
            }
            
            return locationToDelete;
        } catch (error: any) {
            console.error('Error en deleteWarehouseLocation (repository):', error.message);
            throw error;
        }
    }
}
