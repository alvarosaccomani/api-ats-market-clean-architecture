import { v4 as uuid } from "uuid";
import { OrderDetailRepository } from "../../domain/order-detail/order-detail.repository";
import { OrderDetailValue } from "../../domain/order-detail/order-detail.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class OrderDetailUseCase {
    constructor(
        private readonly orderDetailRepository: OrderDetailRepository
    ) {
        this.getDetailOrders = this.getDetailOrders.bind(this);
        this.findDetailOrderById = this.findDetailOrderById.bind(this);
        this.createDetailOrder = this.createDetailOrder.bind(this);
        this.updateDetailOrder = this.updateDetailOrder.bind(this);
        this.deleteDetailOrder = this.deleteDetailOrder.bind(this);
    }

    public async getDetailOrders(cmp_uuid: string, ord_uuid: string) {
        try {
            const details = await this.orderDetailRepository.getDetailOrders(cmp_uuid, ord_uuid);
            if (!details) {
                throw new Error('No hay detalles para esta orden.');
            }
            return details.map(detail => ({
                cmp_uuid: detail.cmp_uuid,
                ord_uuid: detail.ord_uuid,
                ordd_uuid: detail.ordd_uuid,
                pro_uuid: detail.pro_uuid,
                prov_uuid: detail.prov_uuid,
                ordd_productname: detail.ordd_productname,
                ordd_code: detail.ordd_code,
                ordd_sku: detail.ordd_sku,
                ordd_quantity: detail.ordd_quantity,
                ordd_unitprice: detail.ordd_unitprice,
                ordd_discount: detail.ordd_discount,
                ordd_subtotal: detail.ordd_subtotal,
                ordd_taxrate: detail.ordd_taxrate,
                ordd_tax: detail.ordd_tax,
                ordd_basecost: detail.ordd_basecost,
                ordd_createdat: detail.ordd_createdat ? TimezoneConverter.toIsoStringInTimezone(detail.ordd_createdat, 'America/Buenos_Aires') : undefined,
                ordd_updatedat: detail.ordd_updatedat ? TimezoneConverter.toIsoStringInTimezone(detail.ordd_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getDetailOrders (use case):', error.message);
            throw error;
        }
    }

    public async findDetailOrderById(cmp_uuid: string, ord_uuid: string, ordd_uuid: string) {
        try {
            const detail = await this.orderDetailRepository.findDetailOrderById(cmp_uuid, ord_uuid, ordd_uuid);
            if (!detail) {
                throw new Error(`No hay detalle de orden con el Id: ${cmp_uuid}, ${ord_uuid}, ${ordd_uuid}`);
            }
            return {
                cmp_uuid: detail.cmp_uuid,
                ord_uuid: detail.ord_uuid,
                ordd_uuid: detail.ordd_uuid,
                pro_uuid: detail.pro_uuid,
                prov_uuid: detail.prov_uuid,
                ordd_productname: detail.ordd_productname,
                ordd_code: detail.ordd_code,
                ordd_sku: detail.ordd_sku,
                ordd_quantity: detail.ordd_quantity,
                ordd_unitprice: detail.ordd_unitprice,
                ordd_discount: detail.ordd_discount,
                ordd_subtotal: detail.ordd_subtotal,
                ordd_taxrate: detail.ordd_taxrate,
                ordd_tax: detail.ordd_tax,
                ordd_basecost: detail.ordd_basecost,
                ordd_createdat: detail.ordd_createdat ? TimezoneConverter.toIsoStringInTimezone(detail.ordd_createdat, 'America/Buenos_Aires') : undefined,
                ordd_updatedat: detail.ordd_updatedat ? TimezoneConverter.toIsoStringInTimezone(detail.ordd_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findDetailOrderById (use case):', error.message);
            throw error;
        }
    }

    public async createDetailOrder({ cmp_uuid, ord_uuid, pro_uuid, prov_uuid, ordd_productname, ordd_code, ordd_sku, ordd_quantity, ordd_unitprice, ordd_discount, ordd_subtotal, ordd_taxrate, ordd_tax, ordd_basecost } : { cmp_uuid: string, ord_uuid: string, pro_uuid: string, prov_uuid?: string, ordd_productname: string, ordd_code: string, ordd_sku: string, ordd_quantity: number, ordd_unitprice: number, ordd_discount?: number, ordd_subtotal?: number, ordd_taxrate?: number, ordd_tax?: number, ordd_basecost?: number }) {
        try {
            const detailValue = new OrderDetailValue({ cmp_uuid, ord_uuid, pro_uuid, prov_uuid, ordd_productname, ordd_code, ordd_sku, ordd_quantity, ordd_unitprice, ordd_discount, ordd_subtotal, ordd_taxrate, ordd_tax, ordd_basecost });
            const detailCreated = await this.orderDetailRepository.createDetailOrder(detailValue);
            if (!detailCreated) {
                throw new Error(`No se pudo insertar el detalle de orden.`);
            }
            return {
                cmp_uuid: detailCreated.cmp_uuid,
                ord_uuid: detailCreated.ord_uuid,
                ordd_uuid: detailCreated.ordd_uuid,
                pro_uuid: detailCreated.pro_uuid,
                prov_uuid: detailCreated.prov_uuid,
                ordd_productname: detailCreated.ordd_productname,
                ordd_code: detailCreated.ordd_code,
                ordd_sku: detailCreated.ordd_sku,
                ordd_quantity: detailCreated.ordd_quantity,
                ordd_unitprice: detailCreated.ordd_unitprice,
                ordd_discount: detailCreated.ordd_discount,
                ordd_subtotal: detailCreated.ordd_subtotal,
                ordd_taxrate: detailCreated.ordd_taxrate,
                ordd_tax: detailCreated.ordd_tax,
                ordd_basecost: detailCreated.ordd_basecost,
                ordd_createdat: detailCreated.ordd_createdat ? TimezoneConverter.toIsoStringInTimezone(detailCreated.ordd_createdat, 'America/Buenos_Aires') : undefined,
                ordd_updatedat: detailCreated.ordd_updatedat ? TimezoneConverter.toIsoStringInTimezone(detailCreated.ordd_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createDetailOrder (use case):', error.message);
            throw error;
        }
    }

    public async updateDetailOrder(cmp_uuid: string, ord_uuid: string, ordd_uuid: string, { pro_uuid, prov_uuid, ordd_productname, ordd_code, ordd_sku, ordd_quantity, ordd_unitprice, ordd_discount, ordd_subtotal, ordd_taxrate, ordd_tax, ordd_basecost } : { pro_uuid: string, prov_uuid?: string, ordd_productname: string, ordd_code: string, ordd_sku: string, ordd_quantity: number, ordd_unitprice: number, ordd_discount?: number, ordd_subtotal?: number, ordd_taxrate?: number, ordd_tax?: number, ordd_basecost?: number }) {
        try {
            const detailUpdated = await this.orderDetailRepository.updateDetailOrder(cmp_uuid, ord_uuid, ordd_uuid, { pro_uuid, prov_uuid, ordd_productname, ordd_code, ordd_sku, ordd_quantity, ordd_unitprice, ordd_discount, ordd_subtotal, ordd_taxrate, ordd_tax, ordd_basecost });
            if (!detailUpdated) {
                throw new Error(`No se pudo actualizar el detalle de orden.`);
            }
            return {
                cmp_uuid: detailUpdated.cmp_uuid,
                ord_uuid: detailUpdated.ord_uuid,
                ordd_uuid: detailUpdated.ordd_uuid,
                pro_uuid: detailUpdated.pro_uuid,
                prov_uuid: detailUpdated.prov_uuid,
                ordd_productname: detailUpdated.ordd_productname,
                ordd_code: detailUpdated.ordd_code,
                ordd_sku: detailUpdated.ordd_sku,
                ordd_quantity: detailUpdated.ordd_quantity,
                ordd_unitprice: detailUpdated.ordd_unitprice,
                ordd_discount: detailUpdated.ordd_discount,
                ordd_subtotal: detailUpdated.ordd_subtotal,
                ordd_taxrate: detailUpdated.ordd_taxrate,
                ordd_tax: detailUpdated.ordd_tax,
                ordd_basecost: detailUpdated.ordd_basecost,
                ordd_createdat: detailUpdated.ordd_createdat ? TimezoneConverter.toIsoStringInTimezone(detailUpdated.ordd_createdat, 'America/Buenos_Aires') : undefined,
                ordd_updatedat: detailUpdated.ordd_updatedat ? TimezoneConverter.toIsoStringInTimezone(detailUpdated.ordd_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateDetailOrder (use case):', error.message);
            throw error;
        }
    }

    public async deleteDetailOrder(cmp_uuid: string, ord_uuid: string, ordd_uuid: string) {
        try {
            const detailDeleted = await this.orderDetailRepository.deleteDetailOrder(cmp_uuid, ord_uuid, ordd_uuid);
            if (!detailDeleted) {
                throw new Error(`No se pudo eliminar el detalle de orden.`);
            }
            return {
                cmp_uuid: detailDeleted.cmp_uuid,
                ord_uuid: detailDeleted.ord_uuid,
                ordd_uuid: detailDeleted.ordd_uuid,
                pro_uuid: detailDeleted.pro_uuid,
                prov_uuid: detailDeleted.prov_uuid,
                ordd_productname: detailDeleted.ordd_productname,
                ordd_code: detailDeleted.ordd_code,
                ordd_sku: detailDeleted.ordd_sku,
                ordd_quantity: detailDeleted.ordd_quantity,
                ordd_unitprice: detailDeleted.ordd_unitprice,
                ordd_discount: detailDeleted.ordd_discount,
                ordd_subtotal: detailDeleted.ordd_subtotal,
                ordd_taxrate: detailDeleted.ordd_taxrate,
                ordd_tax: detailDeleted.ordd_tax,
                ordd_basecost: detailDeleted.ordd_basecost,
                ordd_createdat: detailDeleted.ordd_createdat ? TimezoneConverter.toIsoStringInTimezone(detailDeleted.ordd_createdat, 'America/Buenos_Aires') : undefined,
                ordd_updatedat: detailDeleted.ordd_updatedat ? TimezoneConverter.toIsoStringInTimezone(detailDeleted.ordd_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteDetailOrder (use case):', error.message);
            throw error;
        }
    }
}