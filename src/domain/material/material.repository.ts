import { MaterialEntity, MaterialUpdateData } from "./material.entity";

export interface MaterialRepository {
    getMaterials(cmp_uuid: string): Promise<MaterialEntity[] | null>;
    findMaterialById(cmp_uuid: string, mat_uuid: string): Promise<MaterialEntity | null>;
    createMaterial(material: MaterialEntity): Promise<MaterialEntity | null>;
    updateMaterial(cmp_uuid: string, mat_uuid: string, material: MaterialUpdateData): Promise<MaterialEntity | null>;
    deleteMaterial(cmp_uuid: string, mat_uuid: string): Promise<MaterialEntity | null>;
    findMaterialByName(cmp_uuid: string, mat_name: string, excludeUuid?: string | null): Promise<MaterialEntity | null>;
}