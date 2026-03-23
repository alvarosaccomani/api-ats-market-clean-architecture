import { CategoryEntity, CategoryUpdateData } from "./category.entity";

export interface CategoryRepository {
    getCategories(cmp_uuid: string, itm_uuid: string): Promise<CategoryEntity[] | null>;
    findCategoryById(cmp_uuid: string, itm_uuid: string, cat_uuid: string): Promise<CategoryEntity | null>;
    createCategory(category: CategoryEntity): Promise<CategoryEntity | null>;
    updateCategory(cmp_uuid: string, itm_uuid: string, cat_uuid: string, category: CategoryUpdateData): Promise<CategoryEntity | null>;
    deleteCategory(cmp_uuid: string, itm_uuid: string, cat_uuid: string): Promise<CategoryEntity | null>;
    findCategoryByName(cmp_uuid: string, itm_uuid: string, cat_name: string, excludeUuid?: string | null): Promise<CategoryEntity | null>;
}