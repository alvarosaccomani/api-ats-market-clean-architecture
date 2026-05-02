import { GlobalMaterialEntity, GlobalMaterialUpdateData } from "./global-material.entity";

export interface GlobalMaterialRepository {
    getGlobalMaterials(): Promise<GlobalMaterialEntity[] | null>;
    findGlobalMaterialById(gmat_uuid: string): Promise<GlobalMaterialEntity | null>;
    createGlobalMaterial(globalMaterial: GlobalMaterialEntity): Promise<GlobalMaterialEntity | null>;
    updateGlobalMaterial(gmat_uuid: string, globalMaterial: GlobalMaterialUpdateData): Promise<GlobalMaterialEntity | null>;
    deleteGlobalMaterial(gmat_uuid: string): Promise<GlobalMaterialEntity | null>;
    findGlobalMaterialByName(gmat_name: string): Promise<GlobalMaterialEntity | null>;
}