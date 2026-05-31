import { OrderEntity, OrderUpdateData } from "./order.entity";

export interface OrderRepository {
    getOrders(cmp_uuid: string): Promise<OrderEntity[] | null>;
    findOrderById(cmp_uuid: string, ord_uuid: string): Promise<OrderEntity | null>;
    createOrder(order: OrderEntity): Promise<OrderEntity | null>;
    updateOrder(cmp_uuid: string, ord_uuid: string, order: OrderUpdateData): Promise<OrderEntity | null>;
    changeOrderStatus(cmp_uuid: string, ord_uuid: string, ords_uuid: string): Promise<OrderEntity | null>;
    deleteOrder(cmp_uuid: string, ord_uuid: string): Promise<OrderEntity | null>;
    getOrdersByCustomer(cus_uuid: string): Promise<OrderEntity[] | null>;
}