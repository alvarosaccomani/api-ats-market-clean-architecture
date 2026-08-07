import { OrderDetailEntity, OrderDetailUpdateData } from "./order-detail.entity";

export interface OrderDetailRepository {
    getDetailOrders(cmp_uuid: string, ord_uuid: string): Promise<OrderDetailEntity[] | null>;
    findDetailOrderById(cmp_uuid: string, ord_uuid: string, ordd_uuid: string): Promise<OrderDetailEntity | null>;
    createDetailOrder(orderDetail: OrderDetailEntity, options?: { transaction?: any }): Promise<OrderDetailEntity | null>;
    updateDetailOrder(cmp_uuid: string, ord_uuid: string, ordd_uuid: string, orderDetail: OrderDetailUpdateData, options?: { transaction?: any }): Promise<OrderDetailEntity | null>;
    deleteDetailOrder(cmp_uuid: string, ord_uuid: string, ordd_uuid: string, options?: { transaction?: any }): Promise<OrderDetailEntity | null>;
}