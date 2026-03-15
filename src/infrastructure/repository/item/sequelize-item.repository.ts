import { ItemEntity, ItemUpdateData } from "../../../domain/item/item.entity";
import { ItemRepository } from "../../../domain/item/item.repository";
import { SequelizeItem } from "../../model/item/item.model";
import { Op } from "sequelize";

export class SequelizeRepository implements ItemRepository {
    async getItems(cmp_uuid: string): Promise<ItemEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const items = await SequelizeItem.findAll(config);
            if(!items) {
                throw new Error(`No hay items`)
            };
            return items;
        } catch (error: any) {
            console.error('Error en getItems:', error.message);
            throw error;
        }
    }
    async findItemById(cmp_uuid: string, itm_uuid: string): Promise<ItemEntity | null> {
        try {
            const item = await SequelizeItem.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null
                }
            });
            if(!item) {
                throw new Error(`No hay item con el Id: ${cmp_uuid}, ${itm_uuid}`);
            };
            return item.dataValues;
        } catch (error: any) {
            console.error('Error en findItemById:', error.message);
            throw error;
        }
    }
    async createItem(item: ItemEntity): Promise<ItemEntity | null> {
        try {
            let { cmp_uuid, itm_uuid, gitm_uuid, itm_name, itm_description, itm_createdat, itm_updatedat } = item
            const result = await SequelizeItem.create({ cmp_uuid, itm_uuid, gitm_uuid, itm_name, itm_description, itm_createdat, itm_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el item`);
            }
            let newItem = result.dataValues as SequelizeItem
            return newItem;
        } catch (error: any) {
            console.error('Error en createItem:', error.message);
            throw error;
        }
    }
    async updateItem(cmp_uuid: string, itm_uuid: string, item: ItemUpdateData): Promise<ItemEntity | null> {
        try {
            const [updatedCount, [updatedItem]] = await SequelizeItem.update(
                { 
                    itm_name: item.itm_name,
                    itm_description: item.itm_description
                },
                { 
                    where: { cmp_uuid, itm_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el item`);
            };
            return updatedItem.get({ plain: true }) as ItemEntity;
        } catch (error: any) {
            console.error('Error en updateItem:', error.message);
            throw error;
        }
    }
    async deleteItem(cmp_uuid: string, itm_uuid: string): Promise<ItemEntity | null> {
        try {
            const item = await this.findItemById(cmp_uuid, itm_uuid);
            const result = await SequelizeItem.destroy({ where: { cmp_uuid, itm_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el item`);
            };
            return item;
        } catch (error: any) {
            console.error('Error en deleteItem:', error.message);
            throw error;
        }
    }
    async findItemByName(cmp_uuid: string, itm_name: string, excludeUuid?: string): Promise<ItemEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                itm_name: itm_name ?? null
             };
            if (excludeUuid) {
                whereCondition.itm_uuid = { [Op.ne]: excludeUuid };
            }
            const item = await SequelizeItem.findOne({ 
                where: whereCondition
            });
            return item;
        } catch (error: any) {
            console.error('Error en findItemByName:', error.message);
            throw error;
        }
    }
    
}