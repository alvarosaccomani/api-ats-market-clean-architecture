import { InventoryStockEntity, InventoryStockUpdateData } from "../../../domain/inventory-stock/inventory-stock.entity";
import { InventoryStockRepository } from "../../../domain/inventory-stock/inventory-stock.repository";
import { SequelizeInventoryStock } from "../../model/inventory-stock/inventory-stock.model";

export class SequelizeRepository implements InventoryStockRepository {
    async getInventoryStocks(cmp_uuid: string, pro_uuid?: string, prov_uuid?: string, war_uuid?: string, warl_uuid?: string): Promise<InventoryStockEntity[] | null> {
        try {
            const whereCondition: any = { cmp_uuid: cmp_uuid ?? null };
            if (pro_uuid) {
                whereCondition.pro_uuid = pro_uuid;
            }
            if (prov_uuid) {
                whereCondition.prov_uuid = prov_uuid;
            }
            if (war_uuid) {
                whereCondition.war_uuid = war_uuid;
            }
            if (warl_uuid) {
                whereCondition.warl_uuid = warl_uuid;
            }

            const stocks = await SequelizeInventoryStock.findAll({
                where: whereCondition
            });
            if (!stocks) {
                return null;
            }
            return stocks;
        } catch (error: any) {
            console.error('Error en getInventoryStocks (repository):', error.message);
            throw error;
        }
    }

    async findInventoryStockById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string): Promise<InventoryStockEntity | null> {
        try {
            const stock = await SequelizeInventoryStock.findOne({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null,
                    prov_uuid: prov_uuid ?? null,
                    war_uuid: war_uuid ?? null,
                    warl_uuid: warl_uuid ?? null
                }
            });
            if (!stock) {
                return null;
            }
            return stock.dataValues;
        } catch (error: any) {
            console.error('Error en findInventoryStockById (repository):', error.message);
            throw error;
        }
    }

    async createInventoryStock(inventoryStock: InventoryStockEntity, options?: { transaction?: any }): Promise<InventoryStockEntity | null> {
        try {
            const { 
                cmp_uuid, 
                pro_uuid, 
                prov_uuid, 
                war_uuid,
                warl_uuid, 
                ist_quanty, 
                ist_quantyreserved, 
                ist_createdat, 
                ist_updatedat 
            } = inventoryStock;
            
            const result = await SequelizeInventoryStock.create({ 
                cmp_uuid, 
                pro_uuid, 
                prov_uuid, 
                war_uuid,
                warl_uuid, 
                ist_quanty, 
                ist_quantyreserved, 
                ist_createdat, 
                ist_updatedat 
            }, { transaction: options?.transaction });
            
            if (!result) {
                throw new Error(`No se pudo agregar el stock de inventario`);
            }
            
            return result.dataValues as InventoryStockEntity;
        } catch (error: any) {
            console.error('Error en createInventoryStock (repository):', error.message);
            throw error;
        }
    }

    async createInventoryStocksBatch(locations: InventoryStockEntity[]): Promise<InventoryStockEntity[] | null> {
        try {
            const results = await SequelizeInventoryStock.bulkCreate(
                locations.map(loc => ({
                    cmp_uuid: loc.cmp_uuid,
                    pro_uuid: loc.pro_uuid,
                    prov_uuid: loc.prov_uuid,
                    war_uuid: loc.war_uuid,
                    warl_uuid: loc.warl_uuid,
                    ist_quanty: loc.ist_quanty,
                    ist_quantyreserved: loc.ist_quantyreserved,
                    ist_createdat: loc.ist_createdat,
                    ist_updatedat: loc.ist_updatedat
                })),
                {
                    returning: true
                }
            );
            return results.map(r => r.dataValues as InventoryStockEntity);
        } catch (error: any) {
            console.error('Error en createInventoryStocksBatch (repository):', error.message);
            throw error;
        }
    }

    async updateInventoryStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string, inventoryStock: InventoryStockUpdateData, options?: { transaction?: any }): Promise<InventoryStockEntity | null> {
        try {
            const [updatedCount, [updatedStock]] = await SequelizeInventoryStock.update(
                {
                    ist_quanty: inventoryStock.ist_quanty,
                    ist_quantyreserved: inventoryStock.ist_quantyreserved
                },
                {
                    where: { cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid },
                    returning: true,
                    transaction: options?.transaction,
                }
            );
            
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar el stock de inventario`);
            }
            
            return updatedStock.get({ plain: true }) as InventoryStockEntity;
        } catch (error: any) {
            console.error('Error en updateInventoryStock (repository):', error.message);
            throw error;
        }
    }

    async deleteInventoryStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string): Promise<InventoryStockEntity | null> {
        try {
            const stockToDelete = await this.findInventoryStockById(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid);
            if (!stockToDelete) {
                throw new Error(`No se ha encontrado el stock de inventario a eliminar`);
            }
            
            const deletedCount = await SequelizeInventoryStock.destroy({
                where: { cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid }
            });
            
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar el stock de inventario`);
            }
            
            return stockToDelete;
        } catch (error: any) {
            console.error('Error en deleteInventoryStock (repository):', error.message);
            throw error;
        }
    }
}
