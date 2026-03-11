import { ItemEntity, ItemUpdateData } from "./item.entity";

export interface ItemRepository {
    getItems(cmp_uuid: string): Promise<ItemEntity[] | null>;
    findItemById(cmp_uuid: string, itm_uuid: string): Promise<ItemEntity | null>;
    createItem(item: ItemEntity): Promise<ItemEntity | null>;
    updateItem(cmp_uuid: string, itm_uuid: string, item: ItemUpdateData): Promise<ItemEntity | null>;
    deleteItem(cmp_uuid: string, itm_uuid: string): Promise<ItemEntity | null>;
    findItemByName(cmp_uuid: string, itm_name: string, excludeUuid?: string | null): Promise<ItemEntity | null>;
}