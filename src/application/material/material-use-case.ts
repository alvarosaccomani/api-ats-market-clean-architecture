import { v4 as uuid } from "uuid";
import { MaterialRepository } from "../../domain/material/material.repository";
import { MaterialValue } from "../../domain/material/material.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class MaterialUseCase {
    constructor(
        private readonly materialRepository: MaterialRepository
    ) {
        this.getMaterials = this.getMaterials.bind(this);
        this.getDetailMaterial = this.getDetailMaterial.bind(this);
        this.createMaterial = this.createMaterial.bind(this);
        this.updateMaterial = this.updateMaterial.bind(this);
        this.deleteMaterial = this.deleteMaterial.bind(this);
        this.findMaterialByName = this.findMaterialByName.bind(this);
    }

    public async getMaterials(cmp_uuid: string) {
        try {
            const material = await this.materialRepository.getMaterials(cmp_uuid);
            if(!material) {
                throw new Error('No hay materiales.');
            }
            return material.map(material => ({
                cmp_uuid: material.cmp_uuid,
                mat_uuid: material.mat_uuid,
                gmat_uuid: material.gmat_uuid,
                mat_name: material.mat_name,
                mat_description: material.mat_description,
                mat_createdat: TimezoneConverter.toIsoStringInTimezone(material.mat_createdat, 'America/Buenos_Aires'),
                mat_updatedat: TimezoneConverter.toIsoStringInTimezone(material.mat_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getMaterials (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailMaterial(cmp_uuid: string, mat_uuid: string) {
        try {
            const material = await this.materialRepository.findMaterialById(cmp_uuid, mat_uuid);
            if(!material) {
                throw new Error(`No hay material con el Id: ${cmp_uuid}, ${mat_uuid}`);
            }
            return {
                cmp_uuid: material.cmp_uuid,
                mat_uuid: material.mat_uuid,
                gmat_uuid: material.gmat_uuid,
                mat_name: material.mat_name,
                mat_description: material.mat_description,
                mat_createdat: TimezoneConverter.toIsoStringInTimezone(material.mat_createdat, 'America/Buenos_Aires'),
                mat_updatedat: TimezoneConverter.toIsoStringInTimezone(material.mat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailMaterial (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createMaterial({ cmp_uuid, mat_uuid, gmat_uuid, mat_name, mat_description } : { cmp_uuid: string, mat_uuid: string, gmat_uuid: string, mat_name: string, mat_description: string }) {
        try {
            const materialValue = new MaterialValue({ cmp_uuid, mat_uuid, gmat_uuid, mat_name, mat_description });
            const materialCreated = await this.materialRepository.createMaterial(materialValue);
            if(!materialCreated) {
                throw new Error(`No se pudo insertar el material.`);
            }
            return {
                cmp_uuid: materialCreated.cmp_uuid,
                mat_uuid: materialCreated.mat_uuid,
                gmat_uuid: materialCreated.gmat_uuid,
                mat_name: materialCreated.mat_name,
                mat_description: materialCreated.mat_description,
                mat_createdat: TimezoneConverter.toIsoStringInTimezone(materialCreated.mat_createdat, 'America/Buenos_Aires'),
                mat_updatedat: TimezoneConverter.toIsoStringInTimezone(materialCreated.mat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createMaterial (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateMaterial(cmp_uuid: string, mat_uuid: string, { gmat_uuid, mat_name, mat_description } : { gmat_uuid: string, mat_name: string, mat_description: string }) {
        try {
            const materialUpdated = await this.materialRepository.updateMaterial(cmp_uuid, mat_uuid, { gmat_uuid, mat_name, mat_description });
            if(!materialUpdated) {
                throw new Error(`No se pudo actualizar el material.`);
            }
            return {
                cmp_uuid: materialUpdated.cmp_uuid,
                mat_uuid: materialUpdated.mat_uuid,
                gmat_uuid: materialUpdated.gmat_uuid,
                mat_name: materialUpdated.mat_name,
                mat_description: materialUpdated.mat_description,
                mat_createdat: TimezoneConverter.toIsoStringInTimezone(materialUpdated.mat_createdat, 'America/Buenos_Aires'),
                mat_updatedat: TimezoneConverter.toIsoStringInTimezone(materialUpdated.mat_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateMaterial (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteMaterial(cmp_uuid: string, mat_uuid: string) {
        try {
            const materialDeleted = await this.materialRepository.deleteMaterial(cmp_uuid, mat_uuid);
            if(!materialDeleted) {
                throw new Error(`No se pudo eliminar el material.`);
            }
            return {
                cmp_uuid: materialDeleted.cmp_uuid,
                mat_uuid: materialDeleted.mat_uuid,
                gmat_uuid: materialDeleted.gmat_uuid,
                mat_name: materialDeleted.mat_name,
                mat_description: materialDeleted.mat_description,
                mat_createdat: TimezoneConverter.toIsoStringInTimezone(materialDeleted.mat_createdat, 'America/Buenos_Aires'),
                mat_updatedat: TimezoneConverter.toIsoStringInTimezone(materialDeleted.mat_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteMaterial (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findMaterialByName(cmp_uuid: string, mat_name: string, excludeUuid?: string) {
        try {
            const material = await this.materialRepository.findMaterialByName(cmp_uuid, mat_name, excludeUuid)
            if(material) {
                throw new Error(`Ya existe un material con el nombre ${mat_name}.`);
            }
            return material
        } catch (error: any) {
            console.error('Error en findMaterialByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}