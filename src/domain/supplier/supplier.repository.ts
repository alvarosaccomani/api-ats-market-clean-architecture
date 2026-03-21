import { SupplierEntity, SupplierUpdateData } from "./supplier.entity";

export interface SupplierRepository {
    getSuppliers(cmp_uuid: string): Promise<SupplierEntity[] | null>;
    findSupplierById(cmp_uuid: string, sup_uuid: string): Promise<SupplierEntity | null>;
    createSupplier(supplier: SupplierEntity): Promise<SupplierEntity | null>;
    updateSupplier(cmp_uuid: string, sup_uuid: string, supplier: SupplierUpdateData): Promise<SupplierEntity | null>;
    deleteSupplier(cmp_uuid: string, sup_uuid: string): Promise<SupplierEntity | null>;
    findSupplierByName(cmp_uuid: string, sup_name: string, excludeUuid?: string | null): Promise<SupplierEntity | null>;
}