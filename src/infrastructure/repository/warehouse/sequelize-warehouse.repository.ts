import { WarehouseEntity, WarehouseUpdateData } from "../../../domain/warehouse/warehouse.entity";
import { WarehouseRepository } from "../../../domain/warehouse/warehouse.repository";
import { SequelizeWarehouse } from "../../model/warehouse/warehouse.model";
import { Op } from "sequelize";

export class SequelizeRepository implements WarehouseRepository {
    async getWarehouses(cmp_uuid: string): Promise<WarehouseEntity[] | null> {
        try {
            const warehouses = await SequelizeWarehouse.findAll({
                where: { cmp_uuid: cmp_uuid ?? null }
            });
            if (!warehouses) {
                return null;
            }
            return warehouses;
        } catch (error: any) {
            console.error('Error en getWarehouses (repository):', error.message);
            throw error;
        }
    }

    async findWarehouseById(cmp_uuid: string, war_uuid: string): Promise<WarehouseEntity | null> {
        try {
            const warehouse = await SequelizeWarehouse.findOne({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    war_uuid: war_uuid ?? null
                }
            });
            if (!warehouse) {
                return null;
            }
            return warehouse.dataValues;
        } catch (error: any) {
            console.error('Error en findWarehouseById (repository):', error.message);
            throw error;
        }
    }

    async createWarehouse(warehouse: WarehouseEntity): Promise<WarehouseEntity | null> {
        try {
            let { cmp_uuid, war_uuid, war_name, war_address, war_lat, war_lng, war_active, war_createdat, war_updatedat } = warehouse;
            const result = await SequelizeWarehouse.create({ cmp_uuid, war_uuid, war_name, war_address, war_lat, war_lng, war_active, war_createdat, war_updatedat });
            if (!result) {
                throw new Error(`No se pudo agregar el almacén`);
            }
            let newWarehouse = result.dataValues as SequelizeWarehouse;
            return newWarehouse;
        } catch (error: any) {
            console.error('Error en createWarehouse (repository):', error.message);
            throw error;
        }
    }

    async updateWarehouse(cmp_uuid: string, war_uuid: string, warehouse: WarehouseUpdateData): Promise<WarehouseEntity | null> {
        try {
            const [updatedCount, [updatedWarehouse]] = await SequelizeWarehouse.update(
                {
                    war_name: warehouse.war_name,
                    war_address: warehouse.war_address,
                    war_lat: warehouse.war_lat,
                    war_lng: warehouse.war_lng,
                    war_active: warehouse.war_active
                },
                {
                    where: { cmp_uuid, war_uuid },
                    returning: true,
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar el almacén`);
            }
            return updatedWarehouse.get({ plain: true }) as WarehouseEntity;
        } catch (error: any) {
            console.error('Error en updateWarehouse (repository):', error.message);
            throw error;
        }
    }

    async deleteWarehouse(cmp_uuid: string, war_uuid: string): Promise<WarehouseEntity | null> {
        try {
            const warehouseToDelete = await this.findWarehouseById(cmp_uuid, war_uuid);
            if (!warehouseToDelete) {
                throw new Error(`No se ha encontrado el almacén a eliminar`);
            }
            const deletedCount = await SequelizeWarehouse.destroy({
                where: { cmp_uuid, war_uuid }
            });
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar el almacén`);
            }
            return warehouseToDelete;
        } catch (error: any) {
            console.error('Error en deleteWarehouse (repository):', error.message);
            throw error;
        }
    }

    async findWarehouseByName(war_name: string, excludeUuid?: string | null): Promise<WarehouseEntity | null> {
        try {
            const whereCondition: any = {
                war_name: war_name ?? null
            };
            if (excludeUuid) {
                whereCondition.war_uuid = { [Op.ne]: excludeUuid };
            }
            const warehouse = await SequelizeWarehouse.findOne({
                where: whereCondition
            });
            if (!warehouse) {
                return null;
            }
            return warehouse.dataValues;
        } catch (error: any) {
            console.error('Error en findWarehouseByName (repository):', error.message);
            throw error;
        }
    }
}
