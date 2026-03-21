import { PaymentMethodEntity, PaymentMethodUpdateData } from "../../../domain/payment-method/payment-method.entity";
import { PaymentMethodRepository } from "../../../domain/payment-method/payment-method.repository";
import { SequelizePaymentMethod } from "../../model/payment-method/payment-method.model";
import { Op } from "sequelize";

export class SequelizeRepository implements PaymentMethodRepository {
    async getPaymentMethods(cmp_uuid: string): Promise<PaymentMethodEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const paymentMethods = await SequelizePaymentMethod.findAll(config);
            if(!paymentMethods) {
                throw new Error(`No hay métodos de pago`)
            };
            return paymentMethods;
        } catch (error: any) {
            console.error('Error en getPaymentMethods:', error.message);
            throw error;
        }
    }
    async findPaymentMethodById(cmp_uuid: string, pmt_uuid: string): Promise<PaymentMethodEntity | null> {
        try {
            const paymentMethod = await SequelizePaymentMethod.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    pmt_uuid: pmt_uuid ?? null
                }
            });
            if(!paymentMethod) {
                throw new Error(`No hay método de pago con el Id: ${cmp_uuid}, ${pmt_uuid}`);
            };
            return paymentMethod.dataValues;
        } catch (error: any) {
            console.error('Error en findPaymentMethodById:', error.message);
            throw error;
        }
    }
    async createPaymentMethod(paymentMethod: PaymentMethodEntity): Promise<PaymentMethodEntity | null> {
        try {
            let { cmp_uuid, pmt_uuid, pmt_name, pmt_order, pmt_bkcolor, pmt_frcolor, pmt_active, pmt_createdat, pmt_updatedat } = paymentMethod
            const result = await SequelizePaymentMethod.create({ cmp_uuid, pmt_uuid, pmt_name, pmt_order, pmt_bkcolor, pmt_frcolor, pmt_active, pmt_createdat, pmt_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el método de pago`);
            }
            let newPaymentMethod = result.dataValues as SequelizePaymentMethod
            return newPaymentMethod;
        } catch (error: any) {
            console.error('Error en createPaymentMethod:', error.message);
            throw error;
        }
    }
    async updatePaymentMethod(cmp_uuid: string, pmt_uuid: string, paymentMethod: PaymentMethodUpdateData): Promise<PaymentMethodEntity | null> {
        try {
            const [updatedCount, [updatedPaymentMethod]] = await SequelizePaymentMethod.update(
                { 
                    pmt_name: paymentMethod.pmt_name,
                    pmt_order: paymentMethod.pmt_order,
                    pmt_bkcolor: paymentMethod.pmt_bkcolor,
                    pmt_frcolor: paymentMethod.pmt_frcolor,
                    pmt_active: paymentMethod.pmt_active,
                },
                { 
                    where: { cmp_uuid, pmt_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el método de pago`);
            };
            return updatedPaymentMethod.get({ plain: true }) as PaymentMethodEntity;
        } catch (error: any) {
            console.error('Error en updatePaymentMethod:', error.message);
            throw error;
        }
    }
    async deletePaymentMethod(cmp_uuid: string, pmt_uuid: string): Promise<PaymentMethodEntity | null> {
        try {
            const paymentMethod = await this.findPaymentMethodById(cmp_uuid, pmt_uuid);
            const result = await SequelizePaymentMethod.destroy({ where: { cmp_uuid, pmt_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el método de pago`);
            };
            return paymentMethod;
        } catch (error: any) {
            console.error('Error en deletePaymentMethod:', error.message);
            throw error;
        }
    }
    async findPaymentMethodByName(cmp_uuid: string, pmt_name: string, excludeUuid?: string): Promise<PaymentMethodEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                pmt_name: pmt_name ?? null
             };
            if (excludeUuid) {
                whereCondition.pmt_uuid = { [Op.ne]: excludeUuid };
            }
            const paymentMethod = await SequelizePaymentMethod.findOne({ 
                where: whereCondition
            });
            return paymentMethod;
        } catch (error: any) {
            console.error('Error en findPaymentMethodByName:', error.message);
            throw error;
        }
    }
    
}