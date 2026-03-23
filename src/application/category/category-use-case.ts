import { v4 as uuid } from "uuid";
import { CategoryRepository } from "../../domain/category/category.repository";
import { CategoryValue } from "../../domain/category/category.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CategoryUseCase {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {
        this.getCategories = this.getCategories.bind(this);
        this.getDetailCategory = this.getDetailCategory.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.findCategoryByName = this.findCategoryByName.bind(this);
    }

    public async getCategories(cmp_uuid: string, itm_uuid: string) {
        try {
            const category = await this.categoryRepository.getCategories(cmp_uuid, itm_uuid);
            if(!category) {
                throw new Error('No hay categorias.');
            }
            return category.map(category => ({
                cmp_uuid: category.cmp_uuid,
                itm_uuid: category.itm_uuid,
                cat_uuid: category.cat_uuid,
                gitm_uuid: category.gitm_uuid,
                gcat_uuid: category.gcat_uuid,
                cat_name: category.cat_name,
                cat_description: category.cat_description,
                cat_createdat: TimezoneConverter.toIsoStringInTimezone(category.cat_createdat, 'America/Buenos_Aires'),
                cat_updatedat: TimezoneConverter.toIsoStringInTimezone(category.cat_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCategories (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCategory(cmp_uuid: string, itm_uuid: string, cat_uuid: string) {
        try {
            const category = await this.categoryRepository.findCategoryById(cmp_uuid, itm_uuid, cat_uuid);
            if(!category) {
                throw new Error(`No hay categoria con el Id: ${cmp_uuid}, ${itm_uuid}, ${cat_uuid}`);
            }
            return {
                cmp_uuid: category.cmp_uuid,
                itm_uuid: category.itm_uuid,
                cat_uuid: category.cat_uuid,
                gitm_uuid: category.gitm_uuid,
                gcat_uuid: category.gcat_uuid,
                cat_name: category.cat_name,
                cat_description: category.cat_description,
                cat_createdat: TimezoneConverter.toIsoStringInTimezone(category.cat_createdat, 'America/Buenos_Aires'),
                cat_updatedat: TimezoneConverter.toIsoStringInTimezone(category.cat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCategory({ cmp_uuid, itm_uuid, gitm_uuid, gcat_uuid, cat_name, cat_description } : { cmp_uuid: string, itm_uuid: string, gitm_uuid: string, gcat_uuid: string, cat_name: string, cat_description: string }) {
        try {
            const categoryValue = new CategoryValue({ cmp_uuid, itm_uuid, cat_uuid: uuid(), gitm_uuid, gcat_uuid, cat_name, cat_description });
            const categoryCreated = await this.categoryRepository.createCategory(categoryValue);
            if(!categoryCreated) {
                throw new Error(`No se pudo insertar la categoria.`);
            }
            return {
                cmp_uuid: categoryCreated.cmp_uuid,
                itm_uuid: categoryCreated.itm_uuid,
                cat_uuid: categoryCreated.cat_uuid,
                gitm_uuid: categoryCreated.gitm_uuid,
                gcat_uuid: categoryCreated.gcat_uuid,
                cat_name: categoryCreated.cat_name,
                cat_description: categoryCreated.cat_description,
                cat_createdat: TimezoneConverter.toIsoStringInTimezone(categoryCreated.cat_createdat, 'America/Buenos_Aires'),
                cat_updatedat: TimezoneConverter.toIsoStringInTimezone(categoryCreated.cat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCategory(cmp_uuid: string, itm_uuid: string, cat_uuid: string, { gitm_uuid, gcat_uuid, cat_name, cat_description } : { gitm_uuid: string, gcat_uuid: string, cat_name: string, cat_description: string }) {
        try {
            const categoryUpdated = await this.categoryRepository.updateCategory(cmp_uuid, itm_uuid, cat_uuid, { gitm_uuid, gcat_uuid, cat_name, cat_description });
            if(!categoryUpdated) {
                throw new Error(`No se pudo actualizar la categoria.`);
            }
            return {
                cmp_uuid: categoryUpdated.cmp_uuid,
                itm_uuid: categoryUpdated.itm_uuid,
                cat_uuid: categoryUpdated.cat_uuid,
                gitm_uuid: categoryUpdated.gitm_uuid,
                gcat_uuid: categoryUpdated.gcat_uuid,
                cat_name: categoryUpdated.cat_name,
                cat_description: categoryUpdated.cat_description,
                cat_createdat: TimezoneConverter.toIsoStringInTimezone(categoryUpdated.cat_createdat, 'America/Buenos_Aires'),
                cat_updatedat: TimezoneConverter.toIsoStringInTimezone(categoryUpdated.cat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCategory(cmp_uuid: string, itm_uuid: string, cat_uuid: string) {
        try {
            const categoryDeleted = await this.categoryRepository.deleteCategory(cmp_uuid, itm_uuid, cat_uuid);
            if(!categoryDeleted) {
                throw new Error(`No se pudo eliminar la categoria.`);
            }
            return {
                cmp_uuid: categoryDeleted.cmp_uuid,
                itm_uuid: categoryDeleted.itm_uuid,
                cat_uuid: categoryDeleted.cat_uuid,
                gitm_uuid: categoryDeleted.gitm_uuid,
                gcat_uuid: categoryDeleted.gcat_uuid,
                cat_name: categoryDeleted.cat_name,
                cat_description: categoryDeleted.cat_description,
                cat_createdat: TimezoneConverter.toIsoStringInTimezone(categoryDeleted.cat_createdat, 'America/Buenos_Aires'),
                cat_updatedat: TimezoneConverter.toIsoStringInTimezone(categoryDeleted.cat_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCategoryByName(cmp_uuid: string, itm_uuid: string, cat_name: string, excludeUuid?: string) {
        try {
            const category = await this.categoryRepository.findCategoryByName(cmp_uuid, itm_uuid, cat_name, excludeUuid)
            if(category) {
                throw new Error(`Ya existe una categoria con el nombre ${cat_name}.`);
            }
            return category
        } catch (error: any) {
            console.error('Error en findCategoryByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}