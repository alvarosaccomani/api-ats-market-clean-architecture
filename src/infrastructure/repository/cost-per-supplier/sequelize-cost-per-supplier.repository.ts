import { CostPerSupplierEntity, CostPerSupplierUpdateData } from "../../../domain/cost-per-supplier/cost-per-supplier.entity";
import { CostPerSupplierRepository } from "../../../domain/cost-per-supplier/cost-per-supplier.repository";
import { SequelizeCostPerSupplier } from "../../model/cost-per-supplier/cost-per-supplier.model";

export class SequelizeRepository implements CostPerSupplierRepository {
    async getCostsPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string): Promise<CostPerSupplierEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null,
                    prov_uuid: prov_uuid ?? null
                }
            }
            const costPerSuppliers = await SequelizeCostPerSupplier.findAll(config);
            if(!costPerSuppliers) {
                throw new Error(`No hay costos por proveedor`)
            };
            return costPerSuppliers;
        } catch (error: any) {
            console.error('Error en getCostsPerSupplier:', error.message);
            throw error;
        }
    }
    async findCostPerSupplierById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, cps_uuid: string): Promise<CostPerSupplierEntity | null> {
        try {
            const costPerSupplier = await SequelizeCostPerSupplier.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    pro_uuid: pro_uuid ?? null,
                    prov_uuid: prov_uuid ?? null,
                    cps_uuid: cps_uuid ?? null
                }
            });
            if(!costPerSupplier) {
                throw new Error(`No hay costo por proveedor con el Id: ${cmp_uuid}, ${pro_uuid}, ${prov_uuid}`);
            };
            return costPerSupplier;
        } catch (error: any) {
            console.error('Error en findCostPerSupplierById:', error.message);
            throw error;
        }
    }
    async createCostPerSupplier(costPerSupplier: CostPerSupplierEntity): Promise<CostPerSupplierEntity | null> {
        try {
            let { cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid, cps_pricecost, cps_basecost, cur_uuid, cps_exchangerate, cps_suppliersku, cps_leadtimedays, cps_miniumorderquanty, cps_boxquantity, cps_notes, cps_suggestedminimumsellingprice, cps_date, cps_createdat, cps_updatedat } = costPerSupplier
            const result = await SequelizeCostPerSupplier.create({ cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid, cps_pricecost, cps_basecost, cur_uuid, cps_exchangerate, cps_suppliersku, cps_leadtimedays, cps_miniumorderquanty, cps_boxquantity, cps_notes, cps_suggestedminimumsellingprice, cps_date, cps_createdat, cps_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el costo por proveedor`);
            }
            let newCostPerSupplier = result.dataValues as SequelizeCostPerSupplier
            return newCostPerSupplier;
        } catch (error: any) {
            console.error('Error en createCostPerSupplier:', error.message);
            throw error;
        }
    }
    async updateCostPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string, cps_uuid: string, costPerSupplier: CostPerSupplierUpdateData): Promise<CostPerSupplierEntity | null> {
        try {
            const [updatedCount, [updatedCostPerSupplier]] = await SequelizeCostPerSupplier.update(
                { 
                    cps_pricecost: costPerSupplier.cps_pricecost, 
                    cps_basecost: costPerSupplier.cps_basecost, 
                    cps_date: costPerSupplier.cps_date
                },
                { 
                    where: { cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el cost per supplier`);
            };
            return updatedCostPerSupplier.get({ plain: true }) as CostPerSupplierEntity;
        } catch (error: any) {
            console.error('Error en updateCostPerSupplier:', error.message);
            throw error;
        }
    }
    async deleteCostPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, cps_uuid: string): Promise<CostPerSupplierEntity | null> {
        try {
            const costPerSupplier = await this.findCostPerSupplierById(cmp_uuid, pro_uuid, prov_uuid, cps_uuid);
            const result = await SequelizeCostPerSupplier.destroy({ where: { cmp_uuid, pro_uuid, prov_uuid, cps_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el cost per supplier`);
            };
            return costPerSupplier;
        } catch (error: any) {
            console.error('Error en deleteCostPerSupplier:', error.message);
            throw error;
        }
    }
    
}