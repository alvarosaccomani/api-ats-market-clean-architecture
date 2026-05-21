import { OrderDetailEntity, OrderDetailUpdateData } from "./order-detail.entity";

export interface OrderDetailRepository {
    getDetailOrders(cmp_uuid: string, ord_uuid: string): Promise<OrderDetailEntity[] | null>;
    findDetailOrderById(cmp_uuid: string, ord_uuid: string, ordd_uuid: string): Promise<OrderDetailEntity | null>;
    createDetailOrder(orderDetail: OrderDetailEntity): Promise<OrderDetailEntity | null>;
    updateDetailOrder(cmp_uuid: string, ord_uuid: string, ordd_uuid: string, orderDetail: OrderDetailUpdateData): Promise<OrderDetailEntity | null>;
    deleteDetailOrder(cmp_uuid: string, ord_uuid: string, ordd_uuid: string): Promise<OrderDetailEntity | null>;
}