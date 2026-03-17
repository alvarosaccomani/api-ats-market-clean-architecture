import { GlobalItemEntity, GlobalItemUpdateData } from "./global-item.entity";

export interface GlobalItemRepository {
    getGlobalItems(): Promise<GlobalItemEntity[] | null>;
    findGlobalItemById(gitm_uuid: string): Promise<GlobalItemEntity | null>;
    createGlobalItem(globalItem: GlobalItemEntity): Promise<GlobalItemEntity | null>;
    updateGlobalItem(gitm_uuid: string, globalItem: GlobalItemUpdateData): Promise<GlobalItemEntity | null>;
    deleteGlobalItem(gitm_uuid: string): Promise<GlobalItemEntity | null>;
    findGlobalItemByName(gitm_name: string): Promise<GlobalItemEntity | null>;
}