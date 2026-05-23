import { TypeStockMovementEntity, TypeStockMovementUpdateData } from "./type-stock-movement.entity";

export interface TypeStockMovementRepository {
    getTypeStockMovements(): Promise<TypeStockMovementEntity[] | null>;
    findTypeStockMovementById(tsmo_uuid: string): Promise<TypeStockMovementEntity | null>;
    createTypeStockMovement(typeStockMovement: TypeStockMovementEntity): Promise<TypeStockMovementEntity | null>;
    updateTypeStockMovement(tsmo_uuid: string, typeStockMovement: TypeStockMovementUpdateData): Promise<TypeStockMovementEntity | null>;
    deleteTypeStockMovement(tsmo_uuid: string): Promise<TypeStockMovementEntity | null>;
    findTypeStockMovementByName(tsmo_name: string, excludeUuid?: string | null): Promise<TypeStockMovementEntity | null>;
}