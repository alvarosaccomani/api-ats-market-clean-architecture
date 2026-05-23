import { OrderStatusEntity, OrderStatusUpdateData } from "../../../domain/order-status/order-status.entity";
import { OrderStatusRepository } from "../../../domain/order-status/order-status.repository";
import { SequelizeOrderStatus } from "../../model/order-status/order-status.model";
import { Op } from "sequelize";

export class SequelizeRepository implements OrderStatusRepository {
    async getOrderStatuses(): Promise<OrderStatusEntity[] | null> {
        try {
            const statuses = await SequelizeOrderStatus.findAll();
            if (!statuses) {
                return null;
            }
            return statuses;
        } catch (error: any) {
            console.error('Error en getOrderStatuses (repository):', error.message);
            throw error;
        }
    }

    async findOrderStatusById(ords_uuid: string): Promise<OrderStatusEntity | null> {
        try {
            const status = await SequelizeOrderStatus.findOne({
                where: { ords_uuid: ords_uuid ?? null }
            });
            if (!status) {
                return null;
            }
            return status.dataValues;
        } catch (error: any) {
            console.error('Error en findOrderStatusById (repository):', error.message);
            throw error;
        }
    }

    async createOrderStatus(orderStatus: OrderStatusEntity): Promise<OrderStatusEntity | null> {
        try {
            let { ords_uuid, ords_code, ords_name, ords_description, ords_bkcolor, ords_frcolor, ords_createdat, ords_updatedat } = orderStatus;
            const result = await SequelizeOrderStatus.create({ ords_uuid, ords_code, ords_name, ords_description, ords_bkcolor, ords_frcolor, ords_createdat, ords_updatedat });
            if (!result) {
                throw new Error(`No se pudo agregar el estado de orden`);
            }
            let newStatus = result.dataValues as SequelizeOrderStatus;
            return newStatus;
        } catch (error: any) {
            console.error('Error en createOrderStatus (repository):', error.message);
            throw error;
        }
    }

    async updateOrderStatus(ords_uuid: string, orderStatus: OrderStatusUpdateData): Promise<OrderStatusEntity | null> {
        try {
            const [updatedCount, [updatedStatus]] = await SequelizeOrderStatus.update(
                {
                    ords_code: orderStatus.ords_code,
                    ords_name: orderStatus.ords_name,
                    ords_description: orderStatus.ords_description,
                    ords_bkcolor: orderStatus.ords_bkcolor,
                    ords_frcolor: orderStatus.ords_frcolor
                },
                {
                    where: { ords_uuid },
                    returning: true,
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar el estado de orden`);
            }
            return updatedStatus.get({ plain: true }) as OrderStatusEntity;
        } catch (error: any) {
            console.error('Error en updateOrderStatus (repository):', error.message);
            throw error;
        }
    }

    async deleteOrderStatus(ords_uuid: string): Promise<OrderStatusEntity | null> {
        try {
            const statusToDelete = await this.findOrderStatusById(ords_uuid);
            if (!statusToDelete) {
                throw new Error(`No se ha encontrado el estado de orden a eliminar`);
            }
            const deletedCount = await SequelizeOrderStatus.destroy({
                where: { ords_uuid }
            });
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar el estado de orden`);
            }
            return statusToDelete;
        } catch (error: any) {
            console.error('Error en deleteOrderStatus (repository):', error.message);
            throw error;
        }
    }

    async findOrderStatusByName(ords_name: string, excludeUuid?: string | null): Promise<OrderStatusEntity | null> {
        try {
            const whereCondition: any = {
                ords_name: ords_name ?? null
            };
            if (excludeUuid) {
                whereCondition.ords_uuid = { [Op.ne]: excludeUuid };
            }
            const status = await SequelizeOrderStatus.findOne({
                where: whereCondition
            });
            if (!status) {
                return null;
            }
            return status.dataValues;
        } catch (error: any) {
            console.error('Error en findOrderStatusByName (repository):', error.message);
            throw error;
        }
    }
}
