import { OrderEntity, OrderUpdateData } from "../../../domain/order/order.entity";
import { OrderRepository } from "../../../domain/order/order.repository";
import { SequelizeOrderDetail } from "../../model/order-detail/order-detail.model";
import { SequelizeOrder } from "../../model/order/order.model";
import { SequelizeCustomer } from "../../model/customer/customer.model";
import { SequelizeCoupon } from "../../model/coupon/coupon.model";

export class SequelizeRepository implements OrderRepository {
    async getOrders(cmp_uuid: string): Promise<OrderEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                },
                include: [
                    { as: 'cus', model: SequelizeCustomer }
                ]
            }
            const orders = await SequelizeOrder.findAll(config);
            if(!orders) {
                throw new Error(`No hay ordenes`)
            };
            return orders;
        } catch (error: any) {
            console.error('Error en getOrders:', error.message);
            throw error;
        }
    }
    async findOrderById(cmp_uuid: string, ord_uuid: string): Promise<OrderEntity | null> {
        try {
            const order = await SequelizeOrder.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    ord_uuid: ord_uuid ?? null
                },
                include: [
                    { 
                        as: 'orderDetails', 
                        model: SequelizeOrderDetail
                    }
                ]
            });
            if(!order) {
                throw new Error(`No hay orden con el Id: ${cmp_uuid}, ${ord_uuid}`);
            };
            return order.dataValues;
        } catch (error: any) {
            console.error('Error en findOrderById:', error.message);
            throw error;
        }
    }
    async createOrder(order: OrderEntity, options?: { transaction?: any }): Promise<OrderEntity | null> {
        try {
            let { cmp_uuid, ord_uuid, usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_customername, ord_customeremail, ord_contactphone, ords_uuid, ord_date, cou_uuid, ord_couponcode, ord_discountamount, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber, ord_createdat, ord_updatedat } = order
            const result = await SequelizeOrder.create({ cmp_uuid, ord_uuid, usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_customername, ord_customeremail, ord_contactphone, ords_uuid, ord_date, cou_uuid, ord_couponcode, ord_discountamount, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber, ord_createdat, ord_updatedat }, { transaction: options?.transaction });
            if(!result) {
                throw new Error(`No se ha agregado la orden`);
            }

            // Si se usó un cupón, incrementar su contador de uso
            if (cou_uuid) {
                try {
                    await SequelizeCoupon.increment('cou_usedcount', {
                        by: 1,
                        where: { cmp_uuid, cou_uuid },
                        transaction: options?.transaction
                    });
                } catch (couponError: any) {
                    console.error('Error al incrementar el uso del cupón:', couponError.message);
                }
            }

            let newOrder = result.dataValues as SequelizeOrder
            return newOrder;
        } catch (error: any) {
            console.error('Error en createOrder:', error.message);
            throw error;
        }
    }
    async updateOrder(cmp_uuid: string, ord_uuid: string, order: OrderUpdateData, options?: { transaction?: any }): Promise<OrderEntity | null> {
        try {
            const [updatedCount, [updatedOrder]] = await SequelizeOrder.update(
                { 
                    usr_uuid: order.usr_uuid,
                    cus_uuid: order.cus_uuid,
                    adr_uuid: order.adr_uuid,
                    ord_ordernumber: order.ord_ordernumber,
                    ords_uuid: order.ords_uuid,
                    ord_date: order.ord_date,
                    ord_subtotal: order.ord_subtotal,
                    ord_shippingcost: order.ord_shippingcost,
                    ord_tax: order.ord_tax,
                    ord_total: order.ord_total,
                    ord_customernotes: order.ord_customernotes,
                    ord_trackingnumber: order.ord_trackingnumber,
                },
                { 
                    where: { cmp_uuid, ord_uuid },
                    returning: true,
                    transaction: options?.transaction,
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado la orden`);
            };
            return updatedOrder.get({ plain: true }) as OrderEntity;
        } catch (error: any) {
            console.error('Error en updateOrder:', error.message);
            throw error;
        }
    }
    async deleteOrder(cmp_uuid: string, ord_uuid: string): Promise<OrderEntity | null> {
        try {
            const order = await this.findOrderById(cmp_uuid, ord_uuid);
            const result = await SequelizeOrder.destroy({ where: { cmp_uuid, ord_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado la orden`);
            };
            return order;
        } catch (error: any) {
            console.error('Error en deleteOrder:', error.message);
            throw error;
        }
    }
    async getOrdersByCustomer(cus_uuid: string): Promise<OrderEntity[] | null> {
        try {
            let config = {
                where: {
                    cus_uuid: cus_uuid ?? null
                }
            }
            const orders = await SequelizeOrder.findAll(config);
            if(!orders) {
                throw new Error(`No hay ordenes`)
            };
            return orders;
        } catch (error: any) {
            console.error('Error en getOrdersByCustomer:', error.message);
            throw error;
        }
    }
    async changeOrderStatus(cmp_uuid: string, ord_uuid: string, ords_uuid: string, options?: { transaction?: any }): Promise<OrderEntity | null> {
        try {
            const [updatedCount, [updatedOrder]] = await SequelizeOrder.update(
                { ords_uuid },
                { 
                    where: { cmp_uuid, ord_uuid },
                    returning: true,
                    transaction: options?.transaction,
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se pudo cambiar el estado de la orden`);
            };
            return updatedOrder.get({ plain: true }) as OrderEntity;
        } catch (error: any) {
            console.error('Error en changeOrderStatus (repository):', error.message);
            throw error;
        }
    }
}