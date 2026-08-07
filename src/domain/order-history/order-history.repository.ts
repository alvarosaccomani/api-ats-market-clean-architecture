import { OrderHistoryEntity, OrderHistoryUpdateData } from "./order-history.entity";

export interface OrderHistoryRepository {
    getOrdersHistory(cmp_uuid: string, ord_uuid: string): Promise<OrderHistoryEntity[] | null>;
    findOrderHistoryById(cmp_uuid: string, ord_uuid: string, ordh_uuid: string): Promise<OrderHistoryEntity | null>;
    createOrderHistory(orderHistory: OrderHistoryEntity, options?: { transaction?: any }): Promise<OrderHistoryEntity | null>;
    updateOrderHistory(cmp_uuid: string, ord_uuid: string, ordh_uuid: string, orderHistory: OrderHistoryUpdateData): Promise<OrderHistoryEntity | null>;
    deleteOrderHistory(cmp_uuid: string, ord_uuid: string, ordh_uuid: string): Promise<OrderHistoryEntity | null>;
}