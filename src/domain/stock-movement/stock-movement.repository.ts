import { StockMovementEntity, StockMovementUpdateData } from "./stock-movement.entity";

export interface StockMovementRepository {
    getStockMovements(cmp_uuid: string): Promise<StockMovementEntity[] | null>;
    findStockMovementById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string): Promise<StockMovementEntity | null>;
    createStockMovement(typeStockMovement: StockMovementEntity, options?: { transaction?: any }): Promise<StockMovementEntity | null>;
    updateStockMovement(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string, typeStockMovement: StockMovementUpdateData): Promise<StockMovementEntity | null>;
    deleteStockMovement(cmp_uuid: string, pro_uuid: string, prov_uuid: string, smo_uuid: string): Promise<StockMovementEntity | null>;
}