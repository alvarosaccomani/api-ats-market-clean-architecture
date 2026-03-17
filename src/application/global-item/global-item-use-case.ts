import { v4 as uuid } from "uuid";
import { GlobalItemRepository } from "../../domain/global-item/global-item.repository";
import { GlobalItemValue } from "../../domain/global-item/global-item.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class GlobalItemUseCase {
    constructor(
        private readonly globalItemRepository: GlobalItemRepository
    ) {
        this.getGlobalItems = this.getGlobalItems.bind(this);
        this.getDetailGlobalItem = this.getDetailGlobalItem.bind(this);
        this.createGlobalItem = this.createGlobalItem.bind(this);
        this.updateGlobalItem = this.updateGlobalItem.bind(this);
        this.deleteGlobalItem = this.deleteGlobalItem.bind(this);
        this.findGlobalItemByName = this.findGlobalItemByName.bind(this);
    }

    public async getGlobalItems() {
        try {
            const globalItem = await this.globalItemRepository.getGlobalItems();
            if(!globalItem) {
                throw new Error('No hay articulos.');
            }
            return globalItem.map(globalItem => ({
                gitm_uuid: globalItem.gitm_uuid,
                gitm_name: globalItem.gitm_name,
                gitm_description: globalItem.gitm_description,
                gitm_createdat: TimezoneConverter.toIsoStringInTimezone(globalItem.gitm_createdat, 'America/Buenos_Aires'),
                gitm_updatedat: TimezoneConverter.toIsoStringInTimezone(globalItem.gitm_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getGlobalItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailGlobalItem(gitm_uuid: string) {
        try {
            const globalItem = await this.globalItemRepository.findGlobalItemById(gitm_uuid);
            if(!globalItem) {
                throw new Error(`No hay articulo con el Id: ${gitm_uuid}`);
            }
            return {
                gitm_uuid: globalItem.gitm_uuid,
                gitm_name: globalItem.gitm_name,
                gitm_description: globalItem.gitm_description,
                gitm_createdat: TimezoneConverter.toIsoStringInTimezone(globalItem.gitm_createdat, 'America/Buenos_Aires'),
                gitm_updatedat: TimezoneConverter.toIsoStringInTimezone(globalItem.gitm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailGlobalItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createGlobalItem({ gitm_uuid, gitm_name, gitm_description } : { gitm_uuid: string, gitm_name: string, gitm_description: string }) {
        try {
            const globalItemValue = new GlobalItemValue({ gitm_uuid, gitm_name, gitm_description });
            const globalItemCreated = await this.globalItemRepository.createGlobalItem(globalItemValue);
            if(!globalItemCreated) {
                throw new Error(`No se pudo insertar el articulo global.`);
            }
            return {
                gitm_uuid: globalItemCreated.gitm_uuid,
                gitm_name: globalItemCreated.gitm_name,
                gitm_description: globalItemCreated.gitm_description,
                gitm_createdat: TimezoneConverter.toIsoStringInTimezone(globalItemCreated.gitm_createdat, 'America/Buenos_Aires'),
                gitm_updatedat: TimezoneConverter.toIsoStringInTimezone(globalItemCreated.gitm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createGlobalItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateGlobalItem(gitm_uuid: string, { gitm_name, gitm_description } : { gitm_name: string, gitm_description: string }) {
        try {
            const globalItemUpdated = await this.globalItemRepository.updateGlobalItem(gitm_uuid, { gitm_name, gitm_description });
            if(!globalItemUpdated) {
                throw new Error(`No se pudo actualizar el articulo global.`);
            }
            return {
                gitm_uuid: globalItemUpdated.gitm_uuid,
                gitm_name: globalItemUpdated.gitm_name,
                gitm_description: globalItemUpdated.gitm_description,
                gitm_createdat: TimezoneConverter.toIsoStringInTimezone(globalItemUpdated.gitm_createdat, 'America/Buenos_Aires'),
                gitm_updatedat: TimezoneConverter.toIsoStringInTimezone(globalItemUpdated.gitm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateGlobalItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteGlobalItem(gitm_uuid: string) {
        try {
            const globalItemDeleted = await this.globalItemRepository.deleteGlobalItem(gitm_uuid);
            if(!globalItemDeleted) {
                throw new Error(`No se pudo eliminar el articulo global.`);
            }
            return {
                gitm_uuid: globalItemDeleted.gitm_uuid,
                gitm_name: globalItemDeleted.gitm_name,
                gitm_description: globalItemDeleted.gitm_description,
                gitm_createdat: TimezoneConverter.toIsoStringInTimezone(globalItemDeleted.gitm_createdat, 'America/Buenos_Aires'),
                gitm_updatedat: TimezoneConverter.toIsoStringInTimezone(globalItemDeleted.gitm_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteGlobalItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findGlobalItemByName(gitm_name: string) {
        try {
            const globalItem = await this.globalItemRepository.findGlobalItemByName(gitm_name)
            if(globalItem) {
                throw new Error(`Ya existe un articulo global con el nombre ${gitm_name}.`);
            }
            return globalItem
        } catch (error: any) {
            console.error('Error en findGlobalItemByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}