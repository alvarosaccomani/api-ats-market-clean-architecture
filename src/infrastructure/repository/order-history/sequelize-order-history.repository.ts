import { OrderHistoryEntity, OrderHistoryUpdateData } from "../../../domain/order-history/order-history.entity";
import { OrderHistoryRepository } from "../../../domain/order-history/order-history.repository";
import { SequelizeOrderHistory } from "../../model/order-history/order-history.model";

export class SequelizeRepository implements OrderHistoryRepository {
    async getOrdersHistory(cmp_uuid: string, ord_uuid: string): Promise<OrderHistoryEntity[] | null> {
        try {
            const histories = await SequelizeOrderHistory.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    ord_uuid: ord_uuid ?? null
                },
                order: [['ordh_createdat', 'ASC']]
            });
            if (!histories) {
                return null;
            }
            return histories;
        } catch (error: any) {
            console.error('Error en getOrdersHistory (repository):', error.message);
            throw error;
        }
    }

    async findOrderHistoryById(cmp_uuid: string, ord_uuid: string, ordh_uuid: string): Promise<OrderHistoryEntity | null> {
        try {
            const history = await SequelizeOrderHistory.findOne({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    ord_uuid: ord_uuid ?? null,
                    ordh_uuid: ordh_uuid ?? null
                }
            });
            if (!history) {
                return null;
            }
            return history.dataValues;
        } catch (error: any) {
            console.error('Error en findOrderHistoryById (repository):', error.message);
            throw error;
        }
    }

    async createOrderHistory(orderHistory: OrderHistoryEntity, options?: { transaction?: any }): Promise<OrderHistoryEntity | null> {
        try {
            const { 
                cmp_uuid, 
                ord_uuid, 
                ordh_uuid, 
                ords_uuid, 
                usr_uuid, 
                ordh_comment, 
                ordh_createdat 
            } = orderHistory;
            
            const result = await SequelizeOrderHistory.create({ 
                cmp_uuid, 
                ord_uuid, 
                ordh_uuid, 
                ords_uuid, 
                usr_uuid, 
                ordh_comment, 
                ordh_createdat 
            }, { transaction: options?.transaction });
            
            if (!result) {
                throw new Error(`No se pudo agregar la trazabilidad de la orden`);
            }
            
            return result.dataValues as OrderHistoryEntity;
        } catch (error: any) {
            console.error('Error en createOrderHistory (repository):', error.message);
            throw error;
        }
    }

    async updateOrderHistory(cmp_uuid: string, ord_uuid: string, ordh_uuid: string, orderHistory: OrderHistoryUpdateData): Promise<OrderHistoryEntity | null> {
        try {
            const [updatedCount, [updatedHistory]] = await SequelizeOrderHistory.update(
                {
                    ordh_comment: orderHistory.ordh_comment
                },
                {
                    where: { cmp_uuid, ord_uuid, ordh_uuid },
                    returning: true,
                }
            );
            
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar la trazabilidad de la orden`);
            }
            
            return updatedHistory.get({ plain: true }) as OrderHistoryEntity;
        } catch (error: any) {
            console.error('Error en updateOrderHistory (repository):', error.message);
            throw error;
        }
    }

    async deleteOrderHistory(cmp_uuid: string, ord_uuid: string, ordh_uuid: string): Promise<OrderHistoryEntity | null> {
        try {
            const historyToDelete = await this.findOrderHistoryById(cmp_uuid, ord_uuid, ordh_uuid);
            if (!historyToDelete) {
                throw new Error(`No se ha encontrado la trazabilidad a eliminar`);
            }
            
            const deletedCount = await SequelizeOrderHistory.destroy({
                where: { cmp_uuid, ord_uuid, ordh_uuid }
            });
            
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar la trazabilidad`);
            }
            
            return historyToDelete;
        } catch (error: any) {
            console.error('Error en deleteOrderHistory (repository):', error.message);
            throw error;
        }
    }
}
