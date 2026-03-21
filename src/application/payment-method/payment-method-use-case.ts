import { v4 as uuid } from "uuid";
import { PaymentMethodRepository } from "../../domain/payment-method/payment-method.repository";
import { PaymentMethodValue } from "../../domain/payment-method/payment-method.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class PaymentMethodUseCase {
    constructor(
        private readonly paymentMethodRepository: PaymentMethodRepository
    ) {
        this.getPaymentMethods = this.getPaymentMethods.bind(this);
        this.getDetailPaymentMethod = this.getDetailPaymentMethod.bind(this);
        this.createPaymentMethod = this.createPaymentMethod.bind(this);
        this.updatePaymentMethod = this.updatePaymentMethod.bind(this);
        this.deletePaymentMethod = this.deletePaymentMethod.bind(this);
        this.findPaymentMethodByName = this.findPaymentMethodByName.bind(this);
    }

    public async getPaymentMethods(cmp_uuid: string) {
        try {
            const paymentMethod = await this.paymentMethodRepository.getPaymentMethods(cmp_uuid);
            if(!paymentMethod) {
                throw new Error('No hay metodos de pago.');
            }
            return paymentMethod.map(paymentMethod => ({
                cmp_uuid: paymentMethod.cmp_uuid,
                pmt_uuid: paymentMethod.pmt_uuid,
                pmt_name: paymentMethod.pmt_name,
                pmt_order: paymentMethod.pmt_order,
                pmt_bkcolor: paymentMethod.pmt_bkcolor,
                pmt_frcolor: paymentMethod.pmt_frcolor,
                pmt_active: paymentMethod.pmt_active,
                pmt_createdat: TimezoneConverter.toIsoStringInTimezone(paymentMethod.pmt_createdat, 'America/Buenos_Aires'),
                pmt_updatedat: TimezoneConverter.toIsoStringInTimezone(paymentMethod.pmt_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailPaymentMethod(cmp_uuid: string, pmt_uuid: string) {
        try {
            const paymentMethod = await this.paymentMethodRepository.findPaymentMethodById(cmp_uuid, pmt_uuid);
            if(!paymentMethod) {
                throw new Error(`No hay metodo de pago con el Id: ${cmp_uuid}, ${pmt_uuid}`);
            }
            return {
                cmp_uuid: paymentMethod.cmp_uuid,
                pmt_uuid: paymentMethod.pmt_uuid,
                pmt_name: paymentMethod.pmt_name,
                pmt_order: paymentMethod.pmt_order,
                pmt_bkcolor: paymentMethod.pmt_bkcolor,
                pmt_frcolor: paymentMethod.pmt_frcolor,
                pmt_active: paymentMethod.pmt_active,
                pmt_createdat: TimezoneConverter.toIsoStringInTimezone(paymentMethod.pmt_createdat, 'America/Buenos_Aires'),
                pmt_updatedat: TimezoneConverter.toIsoStringInTimezone(paymentMethod.pmt_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailPaymentMethod (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createPaymentMethod({ cmp_uuid, pmt_uuid, pmt_name, pmt_order, pmt_bkcolor, pmt_frcolor, pmt_active } : { cmp_uuid: string, pmt_uuid: string, pmt_name: string, pmt_order: number, pmt_bkcolor: string, pmt_frcolor: string, pmt_active: boolean }) {
        try {
            const paymentMethodValue = new PaymentMethodValue({ cmp_uuid, pmt_uuid, pmt_name, pmt_order, pmt_bkcolor, pmt_frcolor, pmt_active });
            const paymentMethodCreated = await this.paymentMethodRepository.createPaymentMethod(paymentMethodValue);
            if(!paymentMethodCreated) {
                throw new Error(`No se pudo insertar el articulo.`);
            }
            return {
                cmp_uuid: paymentMethodCreated.cmp_uuid,
                pmt_uuid: paymentMethodCreated.pmt_uuid,
                pmt_name: paymentMethodCreated.pmt_name,
                pmt_order: paymentMethodCreated.pmt_order,
                pmt_bkcolor: paymentMethodCreated.pmt_bkcolor,
                pmt_frcolor: paymentMethodCreated.pmt_frcolor,
                pmt_active: paymentMethodCreated.pmt_active,
                pmt_createdat: TimezoneConverter.toIsoStringInTimezone(paymentMethodCreated.pmt_createdat, 'America/Buenos_Aires'),
                pmt_updatedat: TimezoneConverter.toIsoStringInTimezone(paymentMethodCreated.pmt_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createPaymentMethod (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updatePaymentMethod(cmp_uuid: string, pmt_uuid: string, { pmt_name, pmt_order, pmt_bkcolor, pmt_frcolor, pmt_active } : { pmt_name: string, pmt_order: number, pmt_bkcolor: string, pmt_frcolor: string, pmt_active: boolean }) {
        try {
            const paymentMethodUpdated = await this.paymentMethodRepository.updatePaymentMethod(cmp_uuid, pmt_uuid, { pmt_name, pmt_order, pmt_bkcolor, pmt_frcolor, pmt_active });
            if(!paymentMethodUpdated) {
                throw new Error(`No se pudo actualizar el metodo de pago.`);
            }
            return {
                cmp_uuid: paymentMethodUpdated.cmp_uuid,
                pmt_uuid: paymentMethodUpdated.pmt_uuid,
                pmt_name: paymentMethodUpdated.pmt_name,
                pmt_order: paymentMethodUpdated.pmt_order,
                pmt_bkcolor: paymentMethodUpdated.pmt_bkcolor,
                pmt_frcolor: paymentMethodUpdated.pmt_frcolor,
                pmt_active: paymentMethodUpdated.pmt_active,
                pmt_createdat: TimezoneConverter.toIsoStringInTimezone(paymentMethodUpdated.pmt_createdat, 'America/Buenos_Aires'),
                pmt_updatedat: TimezoneConverter.toIsoStringInTimezone(paymentMethodUpdated.pmt_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updatePaymentMethod (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deletePaymentMethod(cmp_uuid: string, pmt_uuid: string) {
        try {
            const paymentMethodDeleted = await this.paymentMethodRepository.deletePaymentMethod(cmp_uuid, pmt_uuid);
            if(!paymentMethodDeleted) {
                throw new Error(`No se pudo eliminar el metodo de pago.`);
            }
            return {
                cmp_uuid: paymentMethodDeleted.cmp_uuid,
                pmt_uuid: paymentMethodDeleted.pmt_uuid,
                pmt_name: paymentMethodDeleted.pmt_name,
                pmt_order: paymentMethodDeleted.pmt_order,
                pmt_bkcolor: paymentMethodDeleted.pmt_bkcolor,
                pmt_frcolor: paymentMethodDeleted.pmt_frcolor,
                pmt_active: paymentMethodDeleted.pmt_active,
                pmt_createdat: TimezoneConverter.toIsoStringInTimezone(paymentMethodDeleted.pmt_createdat, 'America/Buenos_Aires'),
                pmt_updatedat: TimezoneConverter.toIsoStringInTimezone(paymentMethodDeleted.pmt_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deletePaymentMethod (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findPaymentMethodByName(cmp_uuid: string, pmt_name: string, excludeUuid?: string) {
        try {
            const paymentMethod = await this.paymentMethodRepository.findPaymentMethodByName(cmp_uuid, pmt_name, excludeUuid)
            if(paymentMethod) {
                throw new Error(`Ya existe un metodo de pago con el nombre ${pmt_name}.`);
            }
            return paymentMethod
        } catch (error: any) {
            console.error('Error en findPaymentMethodByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}