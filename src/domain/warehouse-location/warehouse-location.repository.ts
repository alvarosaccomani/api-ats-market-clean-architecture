import { WarehouseLocationEntity, WarehouseLocationUpdateData } from "./warehouse-location.entity";

export interface WarehouseLocationRepository {
    getWarehouseLocations(cmp_uuid: string, war_uuid?: string): Promise<WarehouseLocationEntity[] | null>;
    findWarehouseLocationById(cmp_uuid: string, war_uuid: string, warl_uuid: string): Promise<WarehouseLocationEntity | null>;
    createWarehouseLocation(warehouse: WarehouseLocationEntity): Promise<WarehouseLocationEntity | null>;
    createWarehouseLocationsBatch(locations: WarehouseLocationEntity[]): Promise<WarehouseLocationEntity[] | null>;
    updateWarehouseLocation(cmp_uuid: string, war_uuid: string, warl_uuid: string, warehouseLocation: WarehouseLocationUpdateData): Promise<WarehouseLocationEntity | null>;
    deleteWarehouseLocation(cmp_uuid: string, war_uuid: string, warl_uuid: string): Promise<WarehouseLocationEntity | null>;
}