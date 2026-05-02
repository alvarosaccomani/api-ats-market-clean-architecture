import { GlobalMaterialEntity, GlobalMaterialUpdateData } from "../../../domain/global-material/global-material.entity";
import { GlobalMaterialRepository } from "../../../domain/global-material/global-material.repository";
import { SequelizeGlobalMaterial } from "../../model/global-material/global-material.model";
import { Op } from "sequelize";

export class SequelizeRepository implements GlobalMaterialRepository {
    async getGlobalMaterials(): Promise<GlobalMaterialEntity[] | null> {
        try {
            const materials = await SequelizeGlobalMaterial.findAll();
            if(!materials) {
                throw new Error(`No hay materiales`)
            };
            return materials;
        } catch (error: any) {
            console.error('Error en getMaterials:', error.message);
            throw error;
        }
    }
    async findGlobalMaterialById(gmat_uuid: string): Promise<GlobalMaterialEntity | null> {
        try {
            const material = await SequelizeGlobalMaterial.findOne({ 
                where: { 
                    gmat_uuid: gmat_uuid ?? null
                }
            });
            if(!material) {
                throw new Error(`No hay material con el Id: ${gmat_uuid}`);
            };
            return material.dataValues;
        } catch (error: any) {
            console.error('Error en findMaterialById:', error.message);
            throw error;
        }
    }
    async createGlobalMaterial(globalMaterial: GlobalMaterialEntity): Promise<GlobalMaterialEntity | null> {
        try {
            let { gmat_uuid, gmat_name, gmat_description, gmat_image, gmat_createdat, gmat_updatedat } = globalMaterial
            const result = await SequelizeGlobalMaterial.create({ gmat_uuid, gmat_name, gmat_description, gmat_image, gmat_createdat, gmat_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el material`);
            }
            let newGlobalMaterial = result.dataValues as SequelizeGlobalMaterial
            return newGlobalMaterial;
        } catch (error: any) {
            console.error('Error en createMaterial:', error.message);
            throw error;
        }
    }
    async updateGlobalMaterial(gmat_uuid: string, globalMaterial: GlobalMaterialUpdateData): Promise<GlobalMaterialEntity | null> {
        try {
            const [updatedCount, [updatedGlobalMaterial]] = await SequelizeGlobalMaterial.update(
                { 
                    gmat_name: globalMaterial.gmat_name,
                    gmat_description: globalMaterial.gmat_description,
                    gmat_image: globalMaterial.gmat_image,
                },
                { 
                    where: { gmat_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el material`);
            };
            return updatedGlobalMaterial.get({ plain: true }) as GlobalMaterialEntity;
        } catch (error: any) {
            console.error('Error en updateMaterial:', error.message);
            throw error;
        }
    }
    async deleteGlobalMaterial(gmat_uuid: string): Promise<GlobalMaterialEntity | null> {
        try {
            const globalMaterial = await this.findGlobalMaterialById(gmat_uuid);
            const result = await SequelizeGlobalMaterial.destroy({ where: { gmat_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el material`);
            };
            return globalMaterial;
        } catch (error: any) {
            console.error('Error en deleteMaterial:', error.message);
            throw error;
        }
    }
    async findGlobalMaterialByName(gmat_name: string): Promise<GlobalMaterialEntity | null> {
        try {
            const whereCondition: any = { 
                gmat_name: gmat_name ?? null
             };
            const globalMaterial = await SequelizeGlobalMaterial.findOne({ 
                where: whereCondition
            });
            return globalMaterial;
        } catch (error: any) {
            console.error('Error en findGlobalMaterialByName:', error.message);
            throw error;
        }
    }
    
}