import { OrderHistoryRepository } from "../../domain/order-history/order-history.repository";
import { OrderHistoryValue } from "../../domain/order-history/order-history.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class OrderHistoryUseCase {
    constructor(
        private readonly orderHistoryRepository: OrderHistoryRepository
    ) {
        this.getOrderHistories = this.getOrderHistories.bind(this);
        this.createOrderHistory = this.createOrderHistory.bind(this);
    }

    public async getOrderHistories(cmp_uuid: string, ord_uuid: string) {
        try {
            const histories = await this.orderHistoryRepository.getOrdersHistory(cmp_uuid, ord_uuid);
            if (!histories) {
                return [];
            }
            return histories.map(history => ({
                cmp_uuid: history.cmp_uuid,
                ord_uuid: history.ord_uuid,
                ordh_uuid: history.ordh_uuid,
                ords_uuid: history.ords_uuid,
                usr_uuid: history.usr_uuid,
                ordh_comment: history.ordh_comment,
                ordh_createdat: history.ordh_createdat ? TimezoneConverter.toIsoStringInTimezone(history.ordh_createdat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getOrderHistories (use case):', error.message);
            throw error;
        }
    }

    public async createOrderHistory(data: { cmp_uuid: string, ord_uuid: string, ordh_uuid?: string, ords_uuid: string, usr_uuid: string, ordh_comment: string }) {
        try {
            const historyValue = new OrderHistoryValue(data);
            const historyCreated = await this.orderHistoryRepository.createOrderHistory(historyValue);
            if (!historyCreated) {
                throw new Error(`No se pudo registrar la trazabilidad de la orden.`);
            }

            return {
                cmp_uuid: historyCreated.cmp_uuid,
                ord_uuid: historyCreated.ord_uuid,
                ordh_uuid: historyCreated.ordh_uuid,
                ords_uuid: historyCreated.ords_uuid,
                usr_uuid: historyCreated.usr_uuid,
                ordh_comment: historyCreated.ordh_comment,
                ordh_createdat: historyCreated.ordh_createdat ? TimezoneConverter.toIsoStringInTimezone(historyCreated.ordh_createdat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createOrderHistory (use case):', error.message);
            throw error;
        }
    }
}
