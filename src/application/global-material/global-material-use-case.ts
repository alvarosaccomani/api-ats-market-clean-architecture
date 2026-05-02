import { v4 as uuid } from "uuid";
import { GlobalMaterialRepository } from "../../domain/global-material/global-material.repository";
import { GlobalMaterialValue } from "../../domain/global-material/global-material.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class GlobalMaterialUseCase {
    constructor(
        private readonly globalMaterialRepository: GlobalMaterialRepository
    ) {
        this.getGlobalMaterials = this.getGlobalMaterials.bind(this);
        this.getDetailGlobalMaterial = this.getDetailGlobalMaterial.bind(this);
        this.createGlobalMaterial = this.createGlobalMaterial.bind(this);
        this.updateGlobalMaterial = this.updateGlobalMaterial.bind(this);
        this.deleteGlobalMaterial = this.deleteGlobalMaterial.bind(this);
        this.findGlobalMaterialByName = this.findGlobalMaterialByName.bind(this);
    }

    public async getGlobalMaterials() {
        try {
            const globalMaterial = await this.globalMaterialRepository.getGlobalMaterials();
            if(!globalMaterial) {
                throw new Error('No hay materiales.');
            }
            return globalMaterial.map(globalMaterial => ({
                gmat_uuid: globalMaterial.gmat_uuid,
                gmat_name: globalMaterial.gmat_name,
                gmat_description: globalMaterial.gmat_description,
                gmat_image: globalMaterial.gmat_image,
                gmat_createdat: TimezoneConverter.toIsoStringInTimezone(globalMaterial.gmat_createdat, 'America/Buenos_Aires'),
                gmat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalMaterial.gmat_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getGlobalMaterials (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailGlobalMaterial(gmat_uuid: string) {
        try {
            const globalMaterial = await this.globalMaterialRepository.findGlobalMaterialById(gmat_uuid);
            if(!globalMaterial) {
                throw new Error(`No hay material con el Id: ${gmat_uuid}`);
            }
            return {
                gmat_uuid: globalMaterial.gmat_uuid,
                gmat_name: globalMaterial.gmat_name,
                gmat_description: globalMaterial.gmat_description,
                gmat_image: globalMaterial.gmat_image,
                gmat_createdat: TimezoneConverter.toIsoStringInTimezone(globalMaterial.gmat_createdat, 'America/Buenos_Aires'),
                gmat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalMaterial.gmat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailGlobalMaterial (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createGlobalMaterial({ gmat_uuid, gmat_name, gmat_description, gmat_image } : { gmat_uuid: string, gmat_name: string, gmat_description: string, gmat_image: string }) {
        try {
            const globalMaterialValue = new GlobalMaterialValue({ gmat_uuid, gmat_name, gmat_description, gmat_image });
            const globalMaterialCreated = await this.globalMaterialRepository.createGlobalMaterial(globalMaterialValue);
            if(!globalMaterialCreated) {
                throw new Error(`No se pudo insertar el material global.`);
            }
            return {
                gmat_uuid: globalMaterialCreated.gmat_uuid,
                gmat_name: globalMaterialCreated.gmat_name,
                gmat_description: globalMaterialCreated.gmat_description,
                gmat_createdat: TimezoneConverter.toIsoStringInTimezone(globalMaterialCreated.gmat_createdat, 'America/Buenos_Aires'),
                gmat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalMaterialCreated.gmat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createGlobalMaterial (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateGlobalMaterial(gmat_uuid: string, { gmat_name, gmat_description, gmat_image } : { gmat_name: string, gmat_description: string, gmat_image: string }) {
        try {
            const globalMaterialUpdated = await this.globalMaterialRepository.updateGlobalMaterial(gmat_uuid, { gmat_name, gmat_description, gmat_image });
            if(!globalMaterialUpdated) {
                throw new Error(`No se pudo actualizar el material global.`);
            }
            return {
                gmat_uuid: globalMaterialUpdated.gmat_uuid,
                gmat_name: globalMaterialUpdated.gmat_name,
                gmat_description: globalMaterialUpdated.gmat_description,
                gmat_createdat: TimezoneConverter.toIsoStringInTimezone(globalMaterialUpdated.gmat_createdat, 'America/Buenos_Aires'),
                gmat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalMaterialUpdated.gmat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateGlobalMaterial (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteGlobalMaterial(gmat_uuid: string) {
        try {
            const globalMaterialDeleted = await this.globalMaterialRepository.deleteGlobalMaterial(gmat_uuid);
            if(!globalMaterialDeleted) {
                throw new Error(`No se pudo eliminar el material global.`);
            }
            return {
                gmat_uuid: globalMaterialDeleted.gmat_uuid,
                gmat_name: globalMaterialDeleted.gmat_name,
                gmat_description: globalMaterialDeleted.gmat_description,
                gmat_createdat: TimezoneConverter.toIsoStringInTimezone(globalMaterialDeleted.gmat_createdat, 'America/Buenos_Aires'),
                gmat_updatedat: TimezoneConverter.toIsoStringInTimezone(globalMaterialDeleted.gmat_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteGlobalMaterial (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findGlobalMaterialByName(gmat_name: string) {
        try {
            const globalMaterial = await this.globalMaterialRepository.findGlobalMaterialByName(gmat_name)
            if(globalMaterial) {
                throw new Error(`Ya existe un material global con el nombre ${gmat_name}.`);
            }
            return globalMaterial
        } catch (error: any) {
            console.error('Error en findGlobalMaterialByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}