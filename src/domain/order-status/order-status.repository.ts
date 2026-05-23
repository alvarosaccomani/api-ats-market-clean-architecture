import { OrderStatusEntity, OrderStatusUpdateData } from "./order-status.entity";

export interface OrderStatusRepository {
    getOrderStatuses(): Promise<OrderStatusEntity[] | null>;
    findOrderStatusById(ords_uuid: string): Promise<OrderStatusEntity | null>;
    createOrderStatus(orderStatus: OrderStatusEntity): Promise<OrderStatusEntity | null>;
    updateOrderStatus(ords_uuid: string, orderStatus: OrderStatusUpdateData): Promise<OrderStatusEntity | null>;
    deleteOrderStatus(ords_uuid: string): Promise<OrderStatusEntity | null>;
    findOrderStatusByName(ords_name: string, excludeUuid?: string | null): Promise<OrderStatusEntity | null>;
}