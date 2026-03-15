import { v4 as uuid } from "uuid";
import { ItemRepository } from "../../domain/item/item.repository";
import { ItemValue } from "../../domain/item/item.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ItemUseCase {
    constructor(
        private readonly itemRepository: ItemRepository
    ) {
        this.getItems = this.getItems.bind(this);
        this.getDetailItem = this.getDetailItem.bind(this);
        this.createItem = this.createItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.findItemByName = this.findItemByName.bind(this);
    }

    public async getItems(cmp_uuid: string) {
        try {
            const item = await this.itemRepository.getItems(cmp_uuid);
            if(!item) {
                throw new Error('No hay articulos.');
            }
            return item.map(item => ({
                cmp_uuid: item.cmp_uuid,
                itm_uuid: item.itm_uuid,
                gitm_uuid: item.gitm_uuid,
                itm_name: item.itm_name,
                itm_description: item.itm_description,
                itm_createdat: TimezoneConverter.toIsoStringInTimezone(item.itm_createdat, 'America/Buenos_Aires'),
                itm_updatedat: TimezoneConverter.toIsoStringInTimezone(item.itm_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getItems (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailItem(cmp_uuid: string, itm_uuid: string) {
        try {
            const item = await this.itemRepository.findItemById(cmp_uuid, itm_uuid);
            if(!item) {
                throw new Error(`No hay articulo con el Id: ${cmp_uuid}, ${itm_uuid}`);
            }
            return {
                cmp_uuid: item.cmp_uuid,
                itm_uuid: item.itm_uuid,
                gitm_uuid: item.gitm_uuid,
                itm_name: item.itm_name,
                itm_description: item.itm_description,
                itm_createdat: TimezoneConverter.toIsoStringInTimezone(item.itm_createdat, 'America/Buenos_Aires'),
                itm_updatedat: TimezoneConverter.toIsoStringInTimezone(item.itm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createItem({ cmp_uuid, itm_uuid, gitm_uuid, itm_name, itm_description } : { cmp_uuid: string, itm_uuid: string, gitm_uuid: string, itm_name: string, itm_description: string }) {
        try {
            const itemValue = new ItemValue({ cmp_uuid, itm_uuid, gitm_uuid, itm_name, itm_description });
            const itemCreated = await this.itemRepository.createItem(itemValue);
            if(!itemCreated) {
                throw new Error(`No se pudo insertar el articulo.`);
            }
            return {
                cmp_uuid: itemCreated.cmp_uuid,
                itm_uuid: itemCreated.itm_uuid,
                gitm_uuid: itemCreated.gitm_uuid,
                itm_name: itemCreated.itm_name,
                itm_description: itemCreated.itm_description,
                itm_createdat: TimezoneConverter.toIsoStringInTimezone(itemCreated.itm_createdat, 'America/Buenos_Aires'),
                itm_updatedat: TimezoneConverter.toIsoStringInTimezone(itemCreated.itm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateItem(cmp_uuid: string, itm_uuid: string, { gitm_uuid, itm_name, itm_description } : { gitm_uuid: string, itm_name: string, itm_description: string }) {
        try {
            const itemUpdated = await this.itemRepository.updateItem(cmp_uuid, itm_uuid, { gitm_uuid, itm_name, itm_description });
            if(!itemUpdated) {
                throw new Error(`No se pudo actualizar el articulo.`);
            }
            return {
                cmp_uuid: itemUpdated.cmp_uuid,
                itm_uuid: itemUpdated.itm_uuid,
                gitm_uuid: itemUpdated.gitm_uuid,
                itm_name: itemUpdated.itm_name,
                itm_description: itemUpdated.itm_description,
                itm_createdat: TimezoneConverter.toIsoStringInTimezone(itemUpdated.itm_createdat, 'America/Buenos_Aires'),
                itm_updatedat: TimezoneConverter.toIsoStringInTimezone(itemUpdated.itm_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteItem(cmp_uuid: string, itm_uuid: string) {
        try {
            const itemDeleted = await this.itemRepository.deleteItem(cmp_uuid, itm_uuid);
            if(!itemDeleted) {
                throw new Error(`No se pudo eliminar el articulo.`);
            }
            return {
                cmp_uuid: itemDeleted.cmp_uuid,
                itm_uuid: itemDeleted.itm_uuid,
                gitm_uuid: itemDeleted.gitm_uuid,
                itm_name: itemDeleted.itm_name,
                itm_description: itemDeleted.itm_description,
                itm_createdat: TimezoneConverter.toIsoStringInTimezone(itemDeleted.itm_createdat, 'America/Buenos_Aires'),
                itm_updatedat: TimezoneConverter.toIsoStringInTimezone(itemDeleted.itm_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteItem (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findItemByName(cmp_uuid: string, itm_name: string, excludeUuid?: string) {
        try {
            const item = await this.itemRepository.findItemByName(cmp_uuid, itm_name, excludeUuid)
            if(item) {
                throw new Error(`Ya existe un articulo con el nombre ${itm_name}.`);
            }
            return item
        } catch (error: any) {
            console.error('Error en findItemByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}