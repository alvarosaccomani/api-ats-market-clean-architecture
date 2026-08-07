import { InventoryStockEntity, InventoryStockUpdateData } from "./inventory-stock.entity";

export interface InventoryStockRepository {
    getInventoryStocks(cmp_uuid: string, pro_uuid?: string, prov_uuid?: string, war_uuid?: string, warl_uuid?: string): Promise<InventoryStockEntity[] | null>;
    findInventoryStockById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string): Promise<InventoryStockEntity | null>;
    createInventoryStock(inventoryStock: InventoryStockEntity, options?: { transaction?: any }): Promise<InventoryStockEntity | null>;
    createInventoryStocksBatch(stocks: InventoryStockEntity[]): Promise<InventoryStockEntity[] | null>;
    updateInventoryStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string, inventoryStock: InventoryStockUpdateData, options?: { transaction?: any }): Promise<InventoryStockEntity | null>;
    deleteInventoryStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string): Promise<InventoryStockEntity | null>;
}