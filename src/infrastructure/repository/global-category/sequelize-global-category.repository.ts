import { GlobalCategoryEntity, GlobalCategoryUpdateData } from "../../../domain/global-category/global-category.entity";
import { GlobalCategoryRepository } from "../../../domain/global-category/global-category.repository";
import { SequelizeGlobalCategory } from "../../model/global-category/global-category.model";
import { Op } from "sequelize";
import { ImageOptimizer } from "../../utils/ImageOptimizer";

export class SequelizeRepository implements GlobalCategoryRepository {
    async getGlobalCategories(): Promise<GlobalCategoryEntity[] | null> {
        try {
            const categories = await SequelizeGlobalCategory.findAll();
            if(!categories) {
                throw new Error(`No hay categorias`)
            };
            return categories;
        } catch (error: any) {
            console.error('Error en getCategories:', error.message);
            throw error;
        }
    }
    async findGlobalCategoryById(gitm_uuid: string, gcat_uuid: string): Promise<GlobalCategoryEntity | null> {
        try {
            const category = await SequelizeGlobalCategory.findOne({ 
                where: { 
                    gitm_uuid: gitm_uuid ?? null,
                    gcat_uuid: gcat_uuid ?? null
                }
            });
            if(!category) {
                throw new Error(`No hay categoria con el Id: ${gcat_uuid}`);
            };
            return category.dataValues;
        } catch (error: any) {
            console.error('Error en findCategoryById:', error.message);
            throw error;
        }
    }
    async createGlobalCategory(globalCategory: GlobalCategoryEntity): Promise<GlobalCategoryEntity | null> {
        try {
            let { gitm_uuid, gcat_uuid, gcat_name, gcat_description, gcat_image, gcat_createdat, gcat_updatedat } = globalCategory
            if (gcat_image) {
                gcat_image = await ImageOptimizer.optimizeBase64(gcat_image);
            }
            const result = await SequelizeGlobalCategory.create({ gitm_uuid, gcat_uuid, gcat_name, gcat_description, gcat_image, gcat_createdat, gcat_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado la categoria`);
            }
            let newGlobalCategory = result.dataValues as SequelizeGlobalCategory
            return newGlobalCategory;
        } catch (error: any) {
            console.error('Error en createCategory:', error.message);
            throw error;
        }
    }
    async updateGlobalCategory(gitm_uuid: string, gcat_uuid: string, globalCategory: GlobalCategoryUpdateData): Promise<GlobalCategoryEntity | null> {
        try {
            let gcat_image = globalCategory.gcat_image;
            if (gcat_image) {
                gcat_image = await ImageOptimizer.optimizeBase64(gcat_image);
            }
            const [updatedCount, [updatedGlobalCategory]] = await SequelizeGlobalCategory.update(
                { 
                    gcat_name: globalCategory.gcat_name,
                    gcat_description: globalCategory.gcat_description,
                    gcat_image: gcat_image
                },
                { 
                    where: { gitm_uuid, gcat_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado la categoria`);
            };
            return updatedGlobalCategory.get({ plain: true }) as GlobalCategoryEntity;
        } catch (error: any) {
            console.error('Error en updateItem:', error.message);
            throw error;
        }
    }
    async deleteGlobalCategory(gitm_uuid: string, gcat_uuid: string): Promise<GlobalCategoryEntity | null> {
        try {
            const globalCategory = await this.findGlobalCategoryById(gitm_uuid, gcat_uuid);
            const result = await SequelizeGlobalCategory.destroy({ where: { gitm_uuid, gcat_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado la categoria`);
            };
            return globalCategory;
        } catch (error: any) {
            console.error('Error en deleteCategory:', error.message);
            throw error;
        }
    }
    async findGlobalCategoryByName(gitm_uuid: string, gcat_name: string): Promise<GlobalCategoryEntity | null> {
        try {
            const whereCondition: any = { 
                gitm_uuid: gitm_uuid ?? null,
                gcat_name: gcat_name ?? null
             };
            const globalCategory = await SequelizeGlobalCategory.findOne({ 
                where: whereCondition
            });
            return globalCategory;
        } catch (error: any) {
            console.error('Error en findGlobalCategoryByName:', error.message);
            throw error;
        }
    }
    
}