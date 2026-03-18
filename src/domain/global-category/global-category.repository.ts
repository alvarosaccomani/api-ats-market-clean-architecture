import { GlobalCategoryEntity, GlobalCategoryUpdateData } from "./global-category.entity";

export interface GlobalCategoryRepository {
    getGlobalCategories(): Promise<GlobalCategoryEntity[] | null>;
    findGlobalCategoryById(gitm_uuid: string,gcat_uuid: string): Promise<GlobalCategoryEntity | null>;
    createGlobalCategory(globalCategory: GlobalCategoryEntity): Promise<GlobalCategoryEntity | null>;
    updateGlobalCategory(gitm_uuid: string,gcat_uuid: string, globalCategory: GlobalCategoryUpdateData): Promise<GlobalCategoryEntity | null>;
    deleteGlobalCategory(gitm_uuid: string,gcat_uuid: string): Promise<GlobalCategoryEntity | null>;
    findGlobalCategoryByName(gitm_uuid: string,gcat_name: string): Promise<GlobalCategoryEntity | null>;
}