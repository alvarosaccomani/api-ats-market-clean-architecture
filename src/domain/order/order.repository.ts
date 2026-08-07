import { OrderEntity, OrderUpdateData } from "./order.entity";

export interface OrderRepository {
    getOrders(cmp_uuid: string): Promise<OrderEntity[] | null>;
    findOrderById(cmp_uuid: string, ord_uuid: string): Promise<OrderEntity | null>;
    createOrder(order: OrderEntity, options?: { transaction?: any }): Promise<OrderEntity | null>;
    updateOrder(cmp_uuid: string, ord_uuid: string, order: OrderUpdateData, options?: { transaction?: any }): Promise<OrderEntity | null>;
    changeOrderStatus(cmp_uuid: string, ord_uuid: string, ords_uuid: string, options?: { transaction?: any }): Promise<OrderEntity | null>;
    deleteOrder(cmp_uuid: string, ord_uuid: string): Promise<OrderEntity | null>;
    getOrdersByCustomer(cus_uuid: string): Promise<OrderEntity[] | null>;
}