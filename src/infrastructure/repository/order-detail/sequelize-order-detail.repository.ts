import { OrderDetailEntity, OrderDetailUpdateData } from "../../../domain/order-detail/order-detail.entity";
import { OrderDetailRepository } from "../../../domain/order-detail/order-detail.repository";
import { SequelizeOrderDetail } from "../../model/order-detail/order-detail.model";

export class SequelizeRepository implements OrderDetailRepository {
    async getDetailOrders(cmp_uuid: string, ord_uuid: string): Promise<OrderDetailEntity[] | null> {
        try {
            const details = await SequelizeOrderDetail.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    ord_uuid: ord_uuid ?? null
                }
            });
            if (!details) {
                throw new Error(`No hay detalles de orden`);
            }
            return details;
        } catch (error: any) {
            console.error('Error en getDetailOrders:', error.message);
            throw error;
        }
    }

    async findDetailOrderById(cmp_uuid: string, ord_uuid: string, ordd_uuid: string): Promise<OrderDetailEntity | null> {
        try {
            const detail = await SequelizeOrderDetail.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    ord_uuid: ord_uuid ?? null,
                    ordd_uuid: ordd_uuid ?? null
                }
            });
            if (!detail) {
                throw new Error(`No hay detalle de orden con el Id: ${ordd_uuid}`);
            }
            return detail.dataValues;
        } catch (error: any) {
            console.error('Error en findDetailOrderById:', error.message);
            throw error;
        }
    }

    async createDetailOrder(orderDetail: OrderDetailEntity, options?: { transaction?: any }): Promise<OrderDetailEntity | null> {
        try {
            let { cmp_uuid, ord_uuid, ordd_uuid, pro_uuid, prov_uuid, ordd_productname, ordd_code, ordd_sku, ordd_quantity, ordd_unitprice, ordd_discount, ordd_subtotal, ordd_taxrate, ordd_tax, ordd_basecost, ordd_createdat, ordd_updatedat } = orderDetail;
            const result = await SequelizeOrderDetail.create({ cmp_uuid, ord_uuid, ordd_uuid, pro_uuid, prov_uuid, ordd_productname, ordd_code, ordd_sku, ordd_quantity, ordd_unitprice, ordd_discount, ordd_subtotal, ordd_taxrate, ordd_tax, ordd_basecost, ordd_createdat, ordd_updatedat }, { transaction: options?.transaction });
            if (!result) {
                throw new Error(`No se ha agregado el detalle de orden`);
            }
            let newDetail = result.dataValues as SequelizeOrderDetail;
            return newDetail;
        } catch (error: any) {
            console.error('Error en createDetailOrder:', error.message);
            throw error;
        }
    }

    async updateDetailOrder(cmp_uuid: string, ord_uuid: string, ordd_uuid: string, orderDetail: OrderDetailUpdateData, options?: { transaction?: any }): Promise<OrderDetailEntity | null> {
        try {
            const [updatedCount, [updatedDetail]] = await SequelizeOrderDetail.update(
                { 
                    pro_uuid: orderDetail.pro_uuid,
                    prov_uuid: orderDetail.prov_uuid,
                    ordd_productname: orderDetail.ordd_productname,
                    ordd_code: orderDetail.ordd_code,
                    ordd_sku: orderDetail.ordd_sku,
                    ordd_quantity: orderDetail.ordd_quantity,
                    ordd_unitprice: orderDetail.ordd_unitprice,
                    ordd_discount: orderDetail.ordd_discount,
                    ordd_subtotal: orderDetail.ordd_subtotal,
                    ordd_taxrate: orderDetail.ordd_taxrate,
                    ordd_tax: orderDetail.ordd_tax,
                    ordd_basecost: orderDetail.ordd_basecost
                },
                { 
                    where: { cmp_uuid, ord_uuid, ordd_uuid },
                    returning: true, // necesario en PostgreSQL
                    transaction: options?.transaction,
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el detalle de orden`);
            }
            return updatedDetail.get({ plain: true }) as OrderDetailEntity;
        } catch (error: any) {
            console.error('Error en updateDetailOrder:', error.message);
            throw error;
        }
    }

    async deleteDetailOrder(cmp_uuid: string, ord_uuid: string, ordd_uuid: string, options?: { transaction?: any }): Promise<OrderDetailEntity | null> {
        try {
            const detailToDelete = await this.findDetailOrderById(cmp_uuid, ord_uuid, ordd_uuid);
            if (!detailToDelete) {
                throw new Error(`No se ha encontrado el detalle de orden a eliminar`);
            }
            const deletedCount = await SequelizeOrderDetail.destroy({
                where: { cmp_uuid, ord_uuid, ordd_uuid },
                transaction: options?.transaction
            });
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar el detalle de orden`);
            }
            return detailToDelete;
        } catch (error: any) {
            console.error('Error en deleteDetailOrder:', error.message);
            throw error;
        }
    }
}
