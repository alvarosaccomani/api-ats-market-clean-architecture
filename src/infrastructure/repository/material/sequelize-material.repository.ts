import { MaterialEntity, MaterialUpdateData } from "../../../domain/material/material.entity";
import { MaterialRepository } from "../../../domain/material/material.repository";
import { SequelizeMaterial } from "../../model/material/material.model";
import { Op } from "sequelize";

export class SequelizeRepository implements MaterialRepository {
    async getMaterials(cmp_uuid: string): Promise<MaterialEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const materials = await SequelizeMaterial.findAll(config);
            if(!materials) {
                throw new Error(`No hay materiales`)
            };
            return materials;
        } catch (error: any) {
            console.error('Error en getMaterials:', error.message);
            throw error;
        }
    }
    async findMaterialById(cmp_uuid: string, mat_uuid: string): Promise<MaterialEntity | null> {
        try {
            const material = await SequelizeMaterial.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    mat_uuid: mat_uuid ?? null
                }
            });
            if(!material) {
                throw new Error(`No hay material con el Id: ${cmp_uuid}, ${mat_uuid}`);
            };
            return material.dataValues;
        } catch (error: any) {
            console.error('Error en findMaterialById:', error.message);
            throw error;
        }
    }
    async createMaterial(material: MaterialEntity): Promise<MaterialEntity | null> {
        try {
            let { cmp_uuid, mat_uuid, gmat_uuid, mat_name, mat_description, mat_createdat, mat_updatedat } = material
            const result = await SequelizeMaterial.create({ cmp_uuid, mat_uuid, gmat_uuid, mat_name, mat_description, mat_createdat, mat_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el material`);
            }
            let newMaterial = result.dataValues as SequelizeMaterial
            return newMaterial;
        } catch (error: any) {
            console.error('Error en createMaterial:', error.message);
            throw error;
        }
    }
    async updateMaterial(cmp_uuid: string, mat_uuid: string, material: MaterialUpdateData): Promise<MaterialEntity | null> {
        try {
            const [updatedCount, [updatedMaterial]] = await SequelizeMaterial.update(
                { 
                    gmat_uuid: material.gmat_uuid,
                    mat_name: material.mat_name,
                    mat_description: material.mat_description
                },
                { 
                    where: { cmp_uuid, mat_uuid },
                    returning: true,
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el material`);
            };
            return updatedMaterial.get({ plain: true }) as MaterialEntity;
        } catch (error: any) {
            console.error('Error en updateMaterial:', error.message);
            throw error;
        }
    }
    async deleteMaterial(cmp_uuid: string, mat_uuid: string): Promise<MaterialEntity | null> {
        try {
            const material = await this.findMaterialById(cmp_uuid, mat_uuid);
            const result = await SequelizeMaterial.destroy({ where: { cmp_uuid, mat_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el material`);
            };
            return material;
        } catch (error: any) {
            console.error('Error en deleteMaterial:', error.message);
            throw error;
        }
    }
    async findMaterialByName(cmp_uuid: string, mat_name: string, excludeUuid?: string): Promise<MaterialEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                mat_name: mat_name ?? null
             };
            if (excludeUuid) {
                whereCondition.mat_uuid = { [Op.ne]: excludeUuid };
            }
            const material = await SequelizeMaterial.findOne({ 
                where: whereCondition
            });
            return material;
        } catch (error: any) {
            console.error('Error en findMaterialByName:', error.message);
            throw error;
        }
    }
    
}