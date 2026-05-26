import { WarehouseEntity, WarehouseUpdateData } from "./warehouse.entity";

export interface WarehouseRepository {
    getWarehouses(cmp_uuid: string): Promise<WarehouseEntity[] | null>;
    findWarehouseById(cmp_uuid: string, war_uuid: string): Promise<WarehouseEntity | null>;
    createWarehouse(warehouse: WarehouseEntity): Promise<WarehouseEntity | null>;
    updateWarehouse(cmp_uuid: string, war_uuid: string, warehouse: WarehouseUpdateData): Promise<WarehouseEntity | null>;
    deleteWarehouse(cmp_uuid: string, war_uuid: string): Promise<WarehouseEntity | null>;
    findWarehouseByName(war_name: string, excludeUuid?: string | null): Promise<WarehouseEntity | null>;
}