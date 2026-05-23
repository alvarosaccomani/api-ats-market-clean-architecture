import { StockMovementEntity, StockMovementUpdateData } from "../../../domain/stock-movement/stock-movement.entity";
import { StockMovementRepository } from "../../../domain/stock-movement/stock-movement.repository";
import { SequelizeStockMovement } from "../../model/stock-movement/stock-movement.model";

export class SequelizeRepository implements StockMovementRepository {
    async getStockMovements(cmp_uuid: string): Promise<StockMovementEntity[] | null> {
        try {
            const movements = await SequelizeStockMovement.findAll({
                where: { cmp_uuid: cmp_uuid ?? null }
            });
            if (!movements) {
                return null;
            }
            return movements;
        } catch (error: any) {
            console.error('Error en getStockMovements (repository):', error.message);
            throw error;
        }
    }

    async findStockMovementById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string): Promise<StockMovementEntity | null> {
        try {
            const movement = await SequelizeStockMovement.findOne({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null,
                    prov_uuid: prov_uuid ?? null,
                    smo_uuid: smo_uuid ?? null
                }
            });
            if (!movement) {
                return null;
            }
            return movement.dataValues;
        } catch (error: any) {
            console.error('Error en findStockMovementById (repository):', error.message);
            throw error;
        }
    }

    async createStockMovement(stockMovement: StockMovementEntity): Promise<StockMovementEntity | null> {
        try {
            let { cmp_uuid, pro_uuid, prov_uuid, smo_uuid, ord_uuid, usr_uuid, tsmo_uuid, smo_quantity, smo_previousstock, smo_currentstock, smo_reason, smo_createdat, smo_updatedat } = stockMovement;
            const result = await SequelizeStockMovement.create({ cmp_uuid, pro_uuid, prov_uuid, smo_uuid, ord_uuid, usr_uuid, tsmo_uuid, smo_quantity, smo_previousstock, smo_currentstock, smo_reason, smo_createdat, smo_updatedat });
            if (!result) {
                throw new Error(`No se pudo agregar el movimiento de stock`);
            }
            let newMovement = result.dataValues as SequelizeStockMovement;
            return newMovement;
        } catch (error: any) {
            console.error('Error en createStockMovement (repository):', error.message);
            throw error;
        }
    }

    async updateStockMovement(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string, stockMovement: StockMovementUpdateData): Promise<StockMovementEntity | null> {
        try {
            const [updatedCount, [updatedMovement]] = await SequelizeStockMovement.update(
                {
                    ord_uuid: stockMovement.ord_uuid,
                    usr_uuid: stockMovement.usr_uuid,
                    tsmo_uuid: stockMovement.tsmo_uuid,
                    smo_quantity: stockMovement.smo_quantity,
                    smo_previousstock: stockMovement.smo_previousstock,
                    smo_currentstock: stockMovement.smo_currentstock,
                    smo_reason: stockMovement.smo_reason
                },
                {
                    where: { cmp_uuid, pro_uuid, prov_uuid, smo_uuid },
                    returning: true,
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar el movimiento de stock`);
            }
            return updatedMovement.get({ plain: true }) as StockMovementEntity;
        } catch (error: any) {
            console.error('Error en updateStockMovement (repository):', error.message);
            throw error;
        }
    }

    async deleteStockMovement(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string): Promise<StockMovementEntity | null> {
        try {
            const movementToDelete = await this.findStockMovementById(cmp_uuid, pro_uuid, prov_uuid, smo_uuid);
            if (!movementToDelete) {
                throw new Error(`No se ha encontrado el movimiento de stock a eliminar`);
            }
            const deletedCount = await SequelizeStockMovement.destroy({
                where: { cmp_uuid, pro_uuid, prov_uuid, smo_uuid }
            });
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar el movimiento de stock`);
            }
            return movementToDelete;
        } catch (error: any) {
            console.error('Error en deleteStockMovement (repository):', error.message);
            throw error;
        }
    }
}
