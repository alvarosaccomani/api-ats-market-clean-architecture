import { OrderStatusRepository } from "../../domain/order-status/order-status.repository";
import { OrderStatusValue } from "../../domain/order-status/order-status.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class OrderStatusUseCase {
    constructor(
        private readonly orderStatusRepository: OrderStatusRepository
    ) {
        this.getOrderStatuses = this.getOrderStatuses.bind(this);
        this.findOrderStatusById = this.findOrderStatusById.bind(this);
        this.createOrderStatus = this.createOrderStatus.bind(this);
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.deleteOrderStatus = this.deleteOrderStatus.bind(this);
    }

    public async getOrderStatuses() {
        try {
            const statuses = await this.orderStatusRepository.getOrderStatuses();
            if (!statuses) {
                return [];
            }
            return statuses.map(status => ({
                ords_uuid: status.ords_uuid,
                ords_code: status.ords_code,
                ords_name: status.ords_name,
                ords_description: status.ords_description,
                ords_bkcolor: status.ords_bkcolor,
                ords_frcolor: status.ords_frcolor,
                ords_createdat: status.ords_createdat ? TimezoneConverter.toIsoStringInTimezone(status.ords_createdat, 'America/Buenos_Aires') : undefined,
                ords_updatedat: status.ords_updatedat ? TimezoneConverter.toIsoStringInTimezone(status.ords_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getOrderStatuses (use case):', error.message);
            throw error;
        }
    }

    public async findOrderStatusById(ords_uuid: string) {
        try {
            const status = await this.orderStatusRepository.findOrderStatusById(ords_uuid);
            if (!status) {
                throw new Error(`No se encontró el estado con Id: ${ords_uuid}`);
            }
            return {
                ords_uuid: status.ords_uuid,
                ords_code: status.ords_code,
                ords_name: status.ords_name,
                ords_description: status.ords_description,
                ords_bkcolor: status.ords_bkcolor,
                ords_frcolor: status.ords_frcolor,
                ords_createdat: status.ords_createdat ? TimezoneConverter.toIsoStringInTimezone(status.ords_createdat, 'America/Buenos_Aires') : undefined,
                ords_updatedat: status.ords_updatedat ? TimezoneConverter.toIsoStringInTimezone(status.ords_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findOrderStatusById (use case):', error.message);
            throw error;
        }
    }

    public async createOrderStatus({ ords_code, ords_name, ords_description, ords_bkcolor, ords_frcolor }: { ords_code: string, ords_name: string, ords_description: string, ords_bkcolor: string, ords_frcolor: string }) {
        try {
            // Verificar si ya existe un estado con el mismo nombre
            const existingStatus = await this.orderStatusRepository.findOrderStatusByName(ords_name);
            if (existingStatus) {
                throw new Error(`Ya existe un estado de orden con el nombre: '${ords_name}'`);
            }

            const statusValue = new OrderStatusValue({ ords_code, ords_name, ords_description, ords_bkcolor, ords_frcolor });
            const statusCreated = await this.orderStatusRepository.createOrderStatus(statusValue);
            if (!statusCreated) {
                throw new Error(`No se pudo crear el estado de orden.`);
            }

            return {
                ords_uuid: statusCreated.ords_uuid,
                ords_code: statusCreated.ords_code,
                ords_name: statusCreated.ords_name,
                ords_description: statusCreated.ords_description,
                ords_bkcolor: statusCreated.ords_bkcolor,
                ords_frcolor: statusCreated.ords_frcolor,
                ords_createdat: statusCreated.ords_createdat ? TimezoneConverter.toIsoStringInTimezone(statusCreated.ords_createdat, 'America/Buenos_Aires') : undefined,
                ords_updatedat: statusCreated.ords_updatedat ? TimezoneConverter.toIsoStringInTimezone(statusCreated.ords_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createOrderStatus (use case):', error.message);
            throw error;
        }
    }

    public async updateOrderStatus(ords_uuid: string, { ords_code, ords_name, ords_description, ords_bkcolor, ords_frcolor }: { ords_code: string, ords_name: string, ords_description: string, ords_bkcolor: string, ords_frcolor: string }) {
        try {
            // Verificar si el nombre ya está tomado por otro estado
            const existingWithName = await this.orderStatusRepository.findOrderStatusByName(ords_name, ords_uuid);
            if (existingWithName) {
                throw new Error(`Ya existe otro estado de orden con el nombre: '${ords_name}'`);
            }

            const statusUpdated = await this.orderStatusRepository.updateOrderStatus(ords_uuid, { ords_code, ords_name, ords_description, ords_bkcolor, ords_frcolor });
            if (!statusUpdated) {
                throw new Error(`No se pudo actualizar el estado de orden.`);
            }

            return {
                ords_uuid: statusUpdated.ords_uuid,
                ords_code: statusUpdated.ords_code,
                ords_name: statusUpdated.ords_name,
                ords_description: statusUpdated.ords_description,
                ords_bkcolor: statusUpdated.ords_bkcolor,
                ords_frcolor: statusUpdated.ords_frcolor,
                ords_createdat: statusUpdated.ords_createdat ? TimezoneConverter.toIsoStringInTimezone(statusUpdated.ords_createdat, 'America/Buenos_Aires') : undefined,
                ords_updatedat: statusUpdated.ords_updatedat ? TimezoneConverter.toIsoStringInTimezone(statusUpdated.ords_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateOrderStatus (use case):', error.message);
            throw error;
        }
    }

    public async deleteOrderStatus(ords_uuid: string) {
        try {
            const statusDeleted = await this.orderStatusRepository.deleteOrderStatus(ords_uuid);
            if (!statusDeleted) {
                throw new Error(`No se pudo eliminar el estado de orden.`);
            }

            return {
                ords_uuid: statusDeleted.ords_uuid,
                ords_code: statusDeleted.ords_code,
                ords_name: statusDeleted.ords_name,
                ords_description: statusDeleted.ords_description,
                ords_bkcolor: statusDeleted.ords_bkcolor,
                ords_frcolor: statusDeleted.ords_frcolor,
                ords_createdat: statusDeleted.ords_createdat ? TimezoneConverter.toIsoStringInTimezone(statusDeleted.ords_createdat, 'America/Buenos_Aires') : undefined,
                ords_updatedat: statusDeleted.ords_updatedat ? TimezoneConverter.toIsoStringInTimezone(statusDeleted.ords_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteOrderStatus (use case):', error.message);
            throw error;
        }
    }
}
