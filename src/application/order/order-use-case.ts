import { v4 as uuid } from "uuid";
import { OrderRepository } from "../../domain/order/order.repository";
import { OrderValue } from "../../domain/order/order.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class OrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {
        this.getOrders = this.getOrders.bind(this);
        this.getOrderDetail = this.getOrderDetail.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    public async getOrders(cmp_uuid: string) {
        try {
            const order = await this.orderRepository.getOrders(cmp_uuid);
            if(!order) {
                throw new Error('No hay ordenes.');
            }
            return order.map(order => ({
                cmp_uuid: order.cmp_uuid,
                ord_uuid: order.ord_uuid,
                usr_uuid: order.usr_uuid,
                cus_uuid: order.cus_uuid,
                adr_uuid: order.adr_uuid,
                ord_ordernumber: order.ord_ordernumber,
                ord_status: order.ord_status,
                ord_date: order.ord_date,
                ord_subtotal: order.ord_subtotal,
                ord_shippingcost: order.ord_shippingcost,
                ord_tax: order.ord_tax,
                ord_total: order.ord_total,
                ord_customernotes: order.ord_customernotes,
                ord_trackingnumber: order.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(order.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(order.ord_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getOrders (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getOrderDetail(cmp_uuid: string, ord_uuid: string) {
        try {
            const order = await this.orderRepository.findOrderById(cmp_uuid, ord_uuid);
            if(!order) {
                throw new Error(`No hay orden con el Id: ${cmp_uuid}, ${ord_uuid}`);
            }
            return {
                cmp_uuid: order.cmp_uuid,
                ord_uuid: order.ord_uuid,
                usr_uuid: order.usr_uuid,
                cus_uuid: order.cus_uuid,
                adr_uuid: order.adr_uuid,
                ord_ordernumber: order.ord_ordernumber,
                ord_status: order.ord_status,
                ord_date: order.ord_date,
                ord_subtotal: order.ord_subtotal,
                ord_shippingcost: order.ord_shippingcost,
                ord_tax: order.ord_tax,
                ord_total: order.ord_total,
                ord_customernotes: order.ord_customernotes,
                ord_trackingnumber: order.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(order.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(order.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getOrderDetail (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createOrder({ cmp_uuid, usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_status, ord_date, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber } : { cmp_uuid: string, usr_uuid: string, cus_uuid: string, adr_uuid: string, ord_ordernumber: number, ord_status: string, ord_date: Date, ord_subtotal: number, ord_shippingcost: number, ord_tax: number, ord_total: number, ord_customernotes: string, ord_trackingnumber: string }) {
        try {
            const orderValue = new OrderValue({ cmp_uuid, ord_uuid: uuid(), usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_status, ord_date, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber });
            const orderCreated = await this.orderRepository.createOrder(orderValue);
            if(!orderCreated) {
                throw new Error(`No se pudo insertar la orden.`);
            }
            return {
                cmp_uuid: orderCreated.cmp_uuid,
                ord_uuid: orderCreated.ord_uuid,
                usr_uuid: orderCreated.usr_uuid,
                cus_uuid: orderCreated.cus_uuid,
                adr_uuid: orderCreated.adr_uuid,
                ord_ordernumber: orderCreated.ord_ordernumber,
                ord_status: orderCreated.ord_status,
                ord_date: orderCreated.ord_date,
                ord_subtotal: orderCreated.ord_subtotal,
                ord_shippingcost: orderCreated.ord_shippingcost,
                ord_tax: orderCreated.ord_tax,
                ord_total: orderCreated.ord_total,
                ord_customernotes: orderCreated.ord_customernotes,
                ord_trackingnumber: orderCreated.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(orderCreated.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(orderCreated.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createOrder (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateOrder(cmp_uuid: string, ord_uuid: string, { usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_status, ord_date, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber } : { usr_uuid: string, cus_uuid: string, adr_uuid: string, ord_ordernumber: number, ord_status: string, ord_date: Date, ord_subtotal: number, ord_shippingcost: number, ord_tax: number, ord_total: number, ord_customernotes: string, ord_trackingnumber: string }) {
        try {
            const orderUpdated = await this.orderRepository.updateOrder(cmp_uuid, ord_uuid, { usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_status, ord_date, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber });
            if(!orderUpdated) {
                throw new Error(`No se pudo actualizar la orden.`);
            }
            return {
                cmp_uuid: orderUpdated.cmp_uuid,
                ord_uuid: orderUpdated.ord_uuid,
                usr_uuid: orderUpdated.usr_uuid,
                cus_uuid: orderUpdated.cus_uuid,
                adr_uuid: orderUpdated.adr_uuid,
                ord_ordernumber: orderUpdated.ord_ordernumber,
                ord_status: orderUpdated.ord_status,
                ord_date: orderUpdated.ord_date,
                ord_subtotal: orderUpdated.ord_subtotal,
                ord_shippingcost: orderUpdated.ord_shippingcost,
                ord_tax: orderUpdated.ord_tax,
                ord_total: orderUpdated.ord_total,
                ord_customernotes: orderUpdated.ord_customernotes,
                ord_trackingnumber: orderUpdated.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(orderUpdated.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(orderUpdated.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateOrder (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteOrder(cmp_uuid: string, ord_uuid: string) {
        try {
            const orderDeleted = await this.orderRepository.deleteOrder(cmp_uuid, ord_uuid);
            if(!orderDeleted) {
                throw new Error(`No se pudo eliminar la orden.`);
            }
            return {
                cmp_uuid: orderDeleted.cmp_uuid,
                ord_uuid: orderDeleted.ord_uuid,
                usr_uuid: orderDeleted.usr_uuid,
                cus_uuid: orderDeleted.cus_uuid,
                adr_uuid: orderDeleted.adr_uuid,
                ord_ordernumber: orderDeleted.ord_ordernumber,
                ord_status: orderDeleted.ord_status,
                ord_date: orderDeleted.ord_date,
                ord_subtotal: orderDeleted.ord_subtotal,
                ord_shippingcost: orderDeleted.ord_shippingcost,
                ord_tax: orderDeleted.ord_tax,
                ord_total: orderDeleted.ord_total,
                ord_customernotes: orderDeleted.ord_customernotes,
                ord_trackingnumber: orderDeleted.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(orderDeleted.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(orderDeleted.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteOrder (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}