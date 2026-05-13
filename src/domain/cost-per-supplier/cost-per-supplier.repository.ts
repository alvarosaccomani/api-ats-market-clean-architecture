import { CostPerSupplierEntity, CostPerSupplierUpdateData } from "./cost-per-supplier.entity";

export interface CostPerSupplierRepository {
    getCostsPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string): Promise<CostPerSupplierEntity[] | null>;
    findCostPerSupplierById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string, cps_uuid: string): Promise<CostPerSupplierEntity | null>;
    createCostPerSupplier(costPerSupplier: CostPerSupplierEntity): Promise<CostPerSupplierEntity | null>;
    updateCostPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string, cps_uuid: string, costPerSupplier: CostPerSupplierUpdateData): Promise<CostPerSupplierEntity | null>;
    deleteCostPerSupplier(cmp_uuid: string, pro_uuid: string, prov_uuid: string, sup_uuid: string, cps_uuid: string): Promise<CostPerSupplierEntity | null>;
}