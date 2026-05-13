import { v4 as uuid } from "uuid";
import { CostPerSupplierRepository } from "../../domain/cost-per-supplier/cost-per-supplier.repository";
import { CostPerSupplierValue } from "../../domain/cost-per-supplier/cost-per-supplier.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CostPerSupplierUseCase {
    constructor(
        private readonly costPerSupplierRepository: CostPerSupplierRepository,
    ) {
        this.getCostsPerSupplier = this.getCostsPerSupplier.bind(this);
        this.getDetailCostPerSupplier = this.getDetailCostPerSupplier.bind(this);
        this.createCostPerSupplier = this.createCostPerSupplier.bind(this);
        this.updateCostPerSupplier = this.updateCostPerSupplier.bind(this);
        this.deleteCostPerSupplier = this.deleteCostPerSupplier.bind(this);
    }

    public async getCostsPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string) {
        try {
            const product = await this.costPerSupplierRepository.getCostsPerSupplier(cmp_uuid, pro_uuid, prov_uuid, sup_uuid);
            if(!product) {
                throw new Error('No hay costos por proveedor.');
            }
            return product.map(product => ({
                cmp_uuid: product.cmp_uuid,
                pro_uuid: product.pro_uuid,
                prov_uuid: product.prov_uuid,
                sup_uuid: product.sup_uuid,
                cps_uuid: product.cps_uuid,
                cps_pricecost: product.cps_pricecost,
                cps_basecost: product.cps_basecost,
                cur_uuid: product.cur_uuid,
                cps_exchangerate: product.cps_exchangerate,
                cps_suppliersku: product.cps_suppliersku,
                cps_leadtimedays: product.cps_leadtimedays,
                cps_miniumorderquanty: product.cps_miniumorderquanty,
                cps_boxquantity: product.cps_boxquantity,
                cps_notes: product.cps_notes,
                cps_suggestedminimumsellingprice: product.cps_suggestedminimumsellingprice,
                cps_date: product.cps_date,
                cps_createdat: TimezoneConverter.toIsoStringInTimezone(product.cps_createdat, 'America/Buenos_Aires'),
                cps_updatedat: TimezoneConverter.toIsoStringInTimezone(product.cps_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCostsPerSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCostPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string, cps_uuid: string) {
        try {
            const product = await this.costPerSupplierRepository.findCostPerSupplierById(cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid);
            if(!product) {
                throw new Error(`No hay costo por proveedor con el Id: ${cmp_uuid}, ${pro_uuid}, ${prov_uuid}, ${sup_uuid}, ${cps_uuid}`);
            }
            return {
                cmp_uuid: product.cmp_uuid,
                pro_uuid: product.pro_uuid,
                prov_uuid: product.prov_uuid,
                sup_uuid: product.sup_uuid,
                cps_uuid: product.cps_uuid,
                cps_pricecost: product.cps_pricecost,
                cps_basecost: product.cps_basecost,
                cur_uuid: product.cur_uuid,
                cps_exchangerate: product.cps_exchangerate,
                cps_suppliersku: product.cps_suppliersku,
                cps_leadtimedays: product.cps_leadtimedays,
                cps_miniumorderquanty: product.cps_miniumorderquanty,
                cps_boxquantity: product.cps_boxquantity,
                cps_notes: product.cps_notes,
                cps_suggestedminimumsellingprice: product.cps_suggestedminimumsellingprice,
                cps_date: product.cps_date,
                cps_createdat: TimezoneConverter.toIsoStringInTimezone(product.cps_createdat, 'America/Buenos_Aires'),
                cps_updatedat: TimezoneConverter.toIsoStringInTimezone(product.cps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCostPerSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCostPerSupplier({ cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid, cps_pricecost, cps_basecost, cur_uuid, cps_exchangerate, cps_suppliersku, cps_leadtimedays, cps_miniumorderquanty, cps_boxquantity, cps_notes, cps_suggestedminimumsellingprice, cps_date } : { cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string, cps_uuid: string, cps_pricecost: number, cps_basecost: boolean, cur_uuid: string, cps_exchangerate: number, cps_suppliersku: string, cps_leadtimedays: number, cps_miniumorderquanty: number, cps_boxquantity: number, cps_notes: string, cps_suggestedminimumsellingprice: number, cps_date: Date }) {
        try {
            const costPerSupplierValue = new CostPerSupplierValue({ cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid, cps_pricecost, cps_basecost, cur_uuid, cps_exchangerate, cps_suppliersku, cps_leadtimedays, cps_miniumorderquanty, cps_boxquantity, cps_notes, cps_suggestedminimumsellingprice, cps_date });
            const costPerSupplierCreated = await this.costPerSupplierRepository.createCostPerSupplier(costPerSupplierValue);
            if(!costPerSupplierCreated) {
                throw new Error(`No se pudo insertar el costo por proveedor.`);
            }
            return {
                cmp_uuid: costPerSupplierCreated.cmp_uuid,
                pro_uuid: costPerSupplierCreated.pro_uuid,
                prov_uuid: costPerSupplierCreated.prov_uuid,
                sup_uuid: costPerSupplierCreated.sup_uuid,
                cps_uuid: costPerSupplierCreated.cps_uuid,
                cps_pricecost: costPerSupplierCreated.cps_pricecost,
                cps_basecost: costPerSupplierCreated.cps_basecost,
                cur_uuid: costPerSupplierCreated.cur_uuid,
                cps_exchangerate: costPerSupplierCreated.cps_exchangerate,
                cps_suppliersku: costPerSupplierCreated.cps_suppliersku,
                cps_leadtimedays: costPerSupplierCreated.cps_leadtimedays,
                cps_miniumorderquanty: costPerSupplierCreated.cps_miniumorderquanty,
                cps_boxquantity: costPerSupplierCreated.cps_boxquantity,
                cps_notes: costPerSupplierCreated.cps_notes,
                cps_suggestedminimumsellingprice: costPerSupplierCreated.cps_suggestedminimumsellingprice,
                cps_date: costPerSupplierCreated.cps_date,
                cps_createdat: TimezoneConverter.toIsoStringInTimezone(costPerSupplierCreated.cps_createdat, 'America/Buenos_Aires'),
                cps_updatedat: TimezoneConverter.toIsoStringInTimezone(costPerSupplierCreated.cps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCostPerSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCostPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string, cps_uuid: string, { cps_pricecost, cps_basecost, cur_uuid, cps_exchangerate, cps_suppliersku, cps_leadtimedays, cps_miniumorderquanty, cps_boxquantity, cps_notes, cps_suggestedminimumsellingprice, cps_date } : { cps_pricecost: number, cps_basecost: boolean, cur_uuid: string, cps_exchangerate: number, cps_suppliersku: string, cps_leadtimedays: number, cps_miniumorderquanty: number, cps_boxquantity: number, cps_notes: string, cps_suggestedminimumsellingprice: number, cps_date: Date }) {
        try {
            const costPerSupplierUpdated = await this.costPerSupplierRepository.updateCostPerSupplier(cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid, { cps_pricecost, cps_basecost, cur_uuid, cps_exchangerate, cps_suppliersku, cps_leadtimedays, cps_miniumorderquanty, cps_boxquantity, cps_notes, cps_suggestedminimumsellingprice, cps_date });
            if(!costPerSupplierUpdated) {
                throw new Error(`No se pudo actualizar el costo por proveedor.`);
            }
            return {
                cmp_uuid: costPerSupplierUpdated.cmp_uuid,
                pro_uuid: costPerSupplierUpdated.pro_uuid,
                prov_uuid: costPerSupplierUpdated.prov_uuid,
                sup_uuid: costPerSupplierUpdated.sup_uuid,
                cps_uuid: costPerSupplierUpdated.cps_uuid,
                cps_pricecost: costPerSupplierUpdated.cps_pricecost,
                cps_basecost: costPerSupplierUpdated.cps_basecost,
                cur_uuid: costPerSupplierUpdated.cur_uuid,
                cps_exchangerate: costPerSupplierUpdated.cps_exchangerate,
                cps_suppliersku: costPerSupplierUpdated.cps_suppliersku,
                cps_leadtimedays: costPerSupplierUpdated.cps_leadtimedays,
                cps_miniumorderquanty: costPerSupplierUpdated.cps_miniumorderquanty,
                cps_boxquantity: costPerSupplierUpdated.cps_boxquantity,
                cps_notes: costPerSupplierUpdated.cps_notes,
                cps_suggestedminimumsellingprice: costPerSupplierUpdated.cps_suggestedminimumsellingprice,
                cps_date: costPerSupplierUpdated.cps_date,
                cps_createdat: TimezoneConverter.toIsoStringInTimezone(costPerSupplierUpdated.cps_createdat, 'America/Buenos_Aires'),
                cps_updatedat: TimezoneConverter.toIsoStringInTimezone(costPerSupplierUpdated.cps_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCostPerSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCostPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string, cps_uuid: string) {
        try {
            const costPerSupplierDeleted = await this.costPerSupplierRepository.deleteCostPerSupplier(cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid);
            if(!costPerSupplierDeleted) {
                throw new Error(`No se pudo eliminar el costo por proveedor.`);
            }
            return {
                cmp_uuid: costPerSupplierDeleted.cmp_uuid,
                pro_uuid: costPerSupplierDeleted.pro_uuid,
                prov_uuid: costPerSupplierDeleted.prov_uuid,
                sup_uuid: costPerSupplierDeleted.sup_uuid,
                cps_uuid: costPerSupplierDeleted.cps_uuid,
                cps_pricecost: costPerSupplierDeleted.cps_pricecost,
                cps_basecost: costPerSupplierDeleted.cps_basecost,
                cur_uuid: costPerSupplierDeleted.cur_uuid,
                cps_exchangerate: costPerSupplierDeleted.cps_exchangerate,
                cps_suppliersku: costPerSupplierDeleted.cps_suppliersku,
                cps_leadtimedays: costPerSupplierDeleted.cps_leadtimedays,
                cps_miniumorderquanty: costPerSupplierDeleted.cps_miniumorderquanty,
                cps_boxquantity: costPerSupplierDeleted.cps_boxquantity,
                cps_notes: costPerSupplierDeleted.cps_notes,
                cps_suggestedminimumsellingprice: costPerSupplierDeleted.cps_suggestedminimumsellingprice,
                cps_date: costPerSupplierDeleted.cps_date,
                cps_createdat: TimezoneConverter.toIsoStringInTimezone(costPerSupplierDeleted.cps_createdat, 'America/Buenos_Aires'),
                cps_updatedat: TimezoneConverter.toIsoStringInTimezone(costPerSupplierDeleted.cps_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteCostPerSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}