import { CategoryEntity, CategoryUpdateData } from "../../../domain/category/category.entity";
import { CategoryRepository } from "../../../domain/category/category.repository";
import { SequelizeCategory } from "../../model/category/category.model";
import { Op } from "sequelize";

export class SequelizeRepository implements CategoryRepository {
    async getCategories(cmp_uuid: string, itm_uuid: string): Promise<CategoryEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null
                }
            }
            const categories = await SequelizeCategory.findAll(config);
            if(!categories) {
                throw new Error(`No hay categorias`)
            };
            return categories;
        } catch (error: any) {
            console.error('Error en getCategories:', error.message);
            throw error;
        }
    }
    async findCategoryById(cmp_uuid: string, itm_uuid: string, cat_uuid: string): Promise<CategoryEntity | null> {
        try {
            const category = await SequelizeCategory.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    itm_uuid: itm_uuid ?? null,
                    cat_uuid: cat_uuid ?? null
                }
            });
            if(!category) {
                throw new Error(`No hay categoria con el Id: ${cmp_uuid}, ${itm_uuid}, ${cat_uuid}`);
            };
            return category.dataValues;
        } catch (error: any) {
            console.error('Error en findCategoryById:', error.message);
            throw error;
        }
    }
    async createCategory(category: CategoryEntity): Promise<CategoryEntity | null> {
        try {
            let { cmp_uuid, itm_uuid, cat_uuid, gitm_uuid, gcat_uuid, cat_name, cat_description, cat_createdat, cat_updatedat } = category
            const result = await SequelizeCategory.create({ cmp_uuid, itm_uuid, cat_uuid, gitm_uuid, gcat_uuid, cat_name, cat_description, cat_createdat, cat_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado la categoria`);
            }
            let newCategory = result.dataValues as SequelizeCategory
            return newCategory;
        } catch (error: any) {
            console.error('Error en createCategory:', error.message);
            throw error;
        }
    }
    async updateCategory(cmp_uuid: string, itm_uuid: string, cat_uuid: string, category: CategoryUpdateData): Promise<CategoryEntity | null> {
        try {
            const [updatedCount, [updatedCategory]] = await SequelizeCategory.update(
                { 
                    gitm_uuid: category.gitm_uuid,
                    gcat_uuid: category.gcat_uuid,
                    cat_name: category.cat_name,
                    cat_description: category.cat_description
                },
                { 
                    where: { cmp_uuid, itm_uuid, cat_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado la categoria`);
            };
            return updatedCategory.get({ plain: true }) as CategoryEntity;
        } catch (error: any) {
            console.error('Error en updateCategory:', error.message);
            throw error;
        }
    }
    async deleteCategory(cmp_uuid: string, itm_uuid: string, cat_uuid: string): Promise<CategoryEntity | null> {
        try {
            const category = await this.findCategoryById(cmp_uuid, itm_uuid, cat_uuid);
            const result = await SequelizeCategory.destroy({ where: { cmp_uuid, itm_uuid, cat_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado la categoria`);
            };
            return category;
        } catch (error: any) {
            console.error('Error en deleteCategory:', error.message);
            throw error;
        }
    }
    async findCategoryByName(cmp_uuid: string, itm_uuid: string, cat_name: string, excludeUuid?: string): Promise<CategoryEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                itm_uuid: itm_uuid ?? null,
                cat_name: cat_name ?? null
             };
            if (excludeUuid) {
                whereCondition.cat_uuid = { [Op.ne]: excludeUuid };
            }
            const category = await SequelizeCategory.findOne({ 
                where: whereCondition
            });
            return category;
        } catch (error: any) {
            console.error('Error en findCategoryByName:', error.message);
            throw error;
        }
    }
    
}