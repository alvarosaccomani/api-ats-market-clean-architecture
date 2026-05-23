import { TypeStockMovementEntity, TypeStockMovementUpdateData } from "../../../domain/type-stock-movement/type-stock-movement.entity";
import { TypeStockMovementRepository } from "../../../domain/type-stock-movement/type-stock-movement.repository";
import { SequelizeTypeStockMovement } from "../../model/type-stock-movement/type-stock-movement.model";
import { Op } from "sequelize";

export class SequelizeRepository implements TypeStockMovementRepository {
    async getTypeStockMovements(): Promise<TypeStockMovementEntity[] | null> {
        try {
            const movements = await SequelizeTypeStockMovement.findAll();
            if (!movements) {
                return null;
            }
            return movements;
        } catch (error: any) {
            console.error('Error en getTypeStockMovements (repository):', error.message);
            throw error;
        }
    }

    async findTypeStockMovementById(tsmo_uuid: string): Promise<TypeStockMovementEntity | null> {
        try {
            const movement = await SequelizeTypeStockMovement.findOne({
                where: { tsmo_uuid: tsmo_uuid ?? null }
            });
            if (!movement) {
                return null;
            }
            return movement.dataValues;
        } catch (error: any) {
            console.error('Error en findTypeStockMovementById (repository):', error.message);
            throw error;
        }
    }

    async createTypeStockMovement(typeStockMovement: TypeStockMovementEntity): Promise<TypeStockMovementEntity | null> {
        try {
            let { tsmo_uuid, tsmo_code, tsmo_name, tsmo_description, tsmo_bkcolor, tsmo_frcolor, tsmo_createdat, tsmo_updatedat } = typeStockMovement;
            const result = await SequelizeTypeStockMovement.create({ tsmo_uuid, tsmo_code, tsmo_name, tsmo_description, tsmo_bkcolor, tsmo_frcolor, tsmo_createdat, tsmo_updatedat });
            if (!result) {
                throw new Error(`No se pudo agregar el tipo de movimiento de stock`);
            }
            let newMovement = result.dataValues as SequelizeTypeStockMovement;
            return newMovement;
        } catch (error: any) {
            console.error('Error en createTypeStockMovement (repository):', error.message);
            throw error;
        }
    }

    async updateTypeStockMovement(tsmo_uuid: string, typeStockMovement: TypeStockMovementUpdateData): Promise<TypeStockMovementEntity | null> {
        try {
            const [updatedCount, [updatedMovement]] = await SequelizeTypeStockMovement.update(
                {
                    tsmo_code: typeStockMovement.tsmo_code,
                    tsmo_name: typeStockMovement.tsmo_name,
                    tsmo_description: typeStockMovement.tsmo_description,
                    tsmo_bkcolor: typeStockMovement.tsmo_bkcolor,
                    tsmo_frcolor: typeStockMovement.tsmo_frcolor
                },
                {
                    where: { tsmo_uuid },
                    returning: true,
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar el tipo de movimiento de stock`);
            }
            return updatedMovement.get({ plain: true }) as TypeStockMovementEntity;
        } catch (error: any) {
            console.error('Error en updateTypeStockMovement (repository):', error.message);
            throw error;
        }
    }

    async deleteTypeStockMovement(tsmo_uuid: string): Promise<TypeStockMovementEntity | null> {
        try {
            const movementToDelete = await this.findTypeStockMovementById(tsmo_uuid);
            if (!movementToDelete) {
                throw new Error(`No se ha encontrado el tipo de movimiento de stock a eliminar`);
            }
            const deletedCount = await SequelizeTypeStockMovement.destroy({
                where: { tsmo_uuid }
            });
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar el tipo de movimiento de stock`);
            }
            return movementToDelete;
        } catch (error: any) {
            console.error('Error en deleteTypeStockMovement (repository):', error.message);
            throw error;
        }
    }

    async findTypeStockMovementByName(tsmo_name: string, excludeUuid?: string | null): Promise<TypeStockMovementEntity | null> {
        try {
            const whereCondition: any = {
                tsmo_name: tsmo_name ?? null
            };
            if (excludeUuid) {
                whereCondition.tsmo_uuid = { [Op.ne]: excludeUuid };
            }
            const movement = await SequelizeTypeStockMovement.findOne({
                where: whereCondition
            });
            if (!movement) {
                return null;
            }
            return movement.dataValues;
        } catch (error: any) {
            console.error('Error en findTypeStockMovementByName (repository):', error.message);
            throw error;
        }
    }
}
