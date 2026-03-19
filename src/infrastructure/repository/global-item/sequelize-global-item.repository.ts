import { GlobalItemEntity, GlobalItemUpdateData } from "../../../domain/global-item/global-item.entity";
import { GlobalItemRepository } from "../../../domain/global-item/global-item.repository";
import { SequelizeGlobalItem } from "../../model/global-item/global-item.model";
import { Op } from "sequelize";

export class SequelizeRepository implements GlobalItemRepository {
    async getGlobalItems(): Promise<GlobalItemEntity[] | null> {
        try {
            const items = await SequelizeGlobalItem.findAll();
            if(!items) {
                throw new Error(`No hay items`)
            };
            return items;
        } catch (error: any) {
            console.error('Error en getItems:', error.message);
            throw error;
        }
    }
    async findGlobalItemById(gitm_uuid: string): Promise<GlobalItemEntity | null> {
        try {
            const item = await SequelizeGlobalItem.findOne({ 
                where: { 
                    gitm_uuid: gitm_uuid ?? null
                }
            });
            if(!item) {
                throw new Error(`No hay item con el Id: ${gitm_uuid}`);
            };
            return item.dataValues;
        } catch (error: any) {
            console.error('Error en findItemById:', error.message);
            throw error;
        }
    }
    async createGlobalItem(globalItem: GlobalItemEntity): Promise<GlobalItemEntity | null> {
        try {
            let { gitm_uuid, gitm_name, gitm_description, gitm_image, gitm_createdat, gitm_updatedat } = globalItem
            const result = await SequelizeGlobalItem.create({ gitm_uuid, gitm_name, gitm_description, gitm_image, gitm_createdat, gitm_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el item`);
            }
            let newGlobalItem = result.dataValues as SequelizeGlobalItem
            return newGlobalItem;
        } catch (error: any) {
            console.error('Error en createItem:', error.message);
            throw error;
        }
    }
    async updateGlobalItem(gitm_uuid: string, globalItem: GlobalItemUpdateData): Promise<GlobalItemEntity | null> {
        try {
            const [updatedCount, [updatedGlobalItem]] = await SequelizeGlobalItem.update(
                { 
                    gitm_name: globalItem.gitm_name,
                    gitm_description: globalItem.gitm_description
                },
                { 
                    where: { gitm_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el item`);
            };
            return updatedGlobalItem.get({ plain: true }) as GlobalItemEntity;
        } catch (error: any) {
            console.error('Error en updateItem:', error.message);
            throw error;
        }
    }
    async deleteGlobalItem(gitm_uuid: string): Promise<GlobalItemEntity | null> {
        try {
            const globalItem = await this.findGlobalItemById(gitm_uuid);
            const result = await SequelizeGlobalItem.destroy({ where: { gitm_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el item`);
            };
            return globalItem;
        } catch (error: any) {
            console.error('Error en deleteItem:', error.message);
            throw error;
        }
    }
    async findGlobalItemByName(gitm_name: string): Promise<GlobalItemEntity | null> {
        try {
            const whereCondition: any = { 
                gitm_name: gitm_name ?? null
             };
            const globalItem = await SequelizeGlobalItem.findOne({ 
                where: whereCondition
            });
            return globalItem;
        } catch (error: any) {
            console.error('Error en findGlobalItemByName:', error.message);
            throw error;
        }
    }
    
}