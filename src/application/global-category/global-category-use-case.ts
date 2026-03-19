import { v4 as uuid } from "uuid";
import { GlobalCategoryRepository } from "../../domain/global-category/global-category.repository";
import { GlobalCategoryValue } from "../../domain/global-category/global-category.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class GlobalCategoryUseCase {
    constructor(
        private readonly globalCategoryRepository: GlobalCategoryRepository
    ) {
        this.getGlobalCategories = this.getGlobalCategories.bind(this);
        this.getDetailGlobalCategory = this.getDetailGlobalCategory.bind(this);
        this.createGlobalCategory = this.createGlobalCategory.bind(this);
        this.updateGlobalCategory = this.updateGlobalCategory.bind(this);
        this.deleteGlobalCategory = this.deleteGlobalCategory.bind(this);
        this.findGlobalCategoryByName = this.findGlobalCategoryByName.bind(this);
    }

    public async getGlobalCategories() {
        try {
            const globalCategory = await this.globalCategoryRepository.getGlobalCategories();
            if(!globalCategory) {
                throw new Error('No hay categorias.');
            }
            return globalCategory.map(globalCategory => ({
                gitm_uuid: globalCategory.gitm_uuid,
                gcat_uuid: globalCategory.gcat_uuid,
                gcat_name: globalCategory.gcat_name,
                gcat_description: globalCategory.gcat_description,
                gcat_image: globalCategory.gcat_image,
                gcat_createdat: TimezoneConverter.toIsoStringInTimezone(globalCategory.gcat_createdat, 'America/Buenos_Aires'),
                gcat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalCategory.gcat_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getGlobalCategories (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailGlobalCategory(gitm_uuid: string, gcat_uuid: string) {
        try {
            const globalCategory = await this.globalCategoryRepository.findGlobalCategoryById(gitm_uuid, gcat_uuid);
            if(!globalCategory) {
                throw new Error(`No hay categoria con el Id: ${gcat_uuid}`);
            }
            return {
                gitm_uuid: globalCategory.gitm_uuid,
                gcat_uuid: globalCategory.gcat_uuid,
                gcat_name: globalCategory.gcat_name,
                gcat_description: globalCategory.gcat_description,
                gcat_image: globalCategory.gcat_image,
                gcat_createdat: TimezoneConverter.toIsoStringInTimezone(globalCategory.gcat_createdat, 'America/Buenos_Aires'),
                gcat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalCategory.gcat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailGlobalCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createGlobalCategory({ gitm_uuid, gcat_uuid, gcat_name, gcat_description, gcat_image } : { gitm_uuid: string, gcat_uuid: string, gcat_name: string, gcat_description: string, gcat_image: string }) {
        try {
            const globalCategoryValue = new GlobalCategoryValue({ gitm_uuid, gcat_uuid, gcat_name, gcat_description, gcat_image });
            const globalCategoryCreated = await this.globalCategoryRepository.createGlobalCategory(globalCategoryValue);
            if(!globalCategoryCreated) {
                throw new Error(`No se pudo insertar la categoria global.`);
            }
            return {
                gitm_uuid: globalCategoryCreated.gitm_uuid,
                gcat_uuid: globalCategoryCreated.gcat_uuid,
                gcat_name: globalCategoryCreated.gcat_name,
                gcat_description: globalCategoryCreated.gcat_description,
                gcat_image: globalCategoryCreated.gcat_image,
                gcat_createdat: TimezoneConverter.toIsoStringInTimezone(globalCategoryCreated.gcat_createdat, 'America/Buenos_Aires'),
                gcat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalCategoryCreated.gcat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createGlobalCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateGlobalCategory(gitm_uuid: string, gcat_uuid: string, { gcat_name, gcat_description, gcat_image } : { gcat_name: string, gcat_description: string, gcat_image: string }) {
        try {
            const globalCategoryUpdated = await this.globalCategoryRepository.updateGlobalCategory(gitm_uuid, gcat_uuid, { gcat_name, gcat_description, gcat_image });
            if(!globalCategoryUpdated) {
                throw new Error(`No se pudo actualizar la categoria global.`);
            }
            return {
                gitm_uuid: globalCategoryUpdated.gitm_uuid,
                gcat_uuid: globalCategoryUpdated.gcat_uuid,
                gcat_name: globalCategoryUpdated.gcat_name,
                gcat_description: globalCategoryUpdated.gcat_description,
                gcat_image: globalCategoryUpdated.gcat_image,
                gcat_createdat: TimezoneConverter.toIsoStringInTimezone(globalCategoryUpdated.gcat_createdat, 'America/Buenos_Aires'),
                gcat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalCategoryUpdated.gcat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateGlobalCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteGlobalCategory(gitm_uuid: string, gcat_uuid: string) {
        try {
            const globalCategoryDeleted = await this.globalCategoryRepository.deleteGlobalCategory(gitm_uuid, gcat_uuid);
            if(!globalCategoryDeleted) {
                throw new Error(`No se pudo eliminar la categoria global.`);
            }
            return {
                gitm_uuid: globalCategoryDeleted.gitm_uuid,
                gcat_uuid: globalCategoryDeleted.gcat_uuid,
                gcat_name: globalCategoryDeleted.gcat_name,
                gcat_description: globalCategoryDeleted.gcat_description,
                gcat_image: globalCategoryDeleted.gcat_image,
                gcat_createdat: TimezoneConverter.toIsoStringInTimezone(globalCategoryDeleted.gcat_createdat, 'America/Buenos_Aires'),
                gcat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalCategoryDeleted.gcat_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteGlobalCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findGlobalCategoryByName(gitm_uuid: string, gcat_name: string) {
        try {
            const globalCategory = await this.globalCategoryRepository.findGlobalCategoryByName(gitm_uuid, gcat_name)
            if(globalCategory) {
                throw new Error(`Ya existe una categoria global con el nombre ${gcat_name}.`);
            }
            return globalCategory
        } catch (error: any) {
            console.error('Error en findGlobalCategoryByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}