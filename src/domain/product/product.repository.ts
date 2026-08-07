import { ProductEntity, ProductUpdateData } from "./product.entity";

export interface ProductRepository {
    getProducts(
        cmp_uuid: string,
        page?: number,
        perPage?: number,
        filters?: {
            itm_uuid?: string;
            cat_uuid?: string;
            stockStatus?: string;
            search?: string;
        }
    ): Promise<{ rows: ProductEntity[]; count: number } | ProductEntity[] | null>;
    findProductById(cmp_uuid: string, pro_uuid: string): Promise<ProductEntity | null>;
    createProduct(product: ProductEntity, options?: { transaction?: any }): Promise<ProductEntity | null>;
    updateProduct(cmp_uuid: string, pro_uuid: string, product: ProductUpdateData, options?: { transaction?: any }): Promise<ProductEntity | null>;
    deleteProduct(cmp_uuid: string, pro_uuid: string): Promise<ProductEntity | null>;
    findProductByName(cmp_uuid: string, pro_name: string, excludeUuid?: string | null): Promise<ProductEntity | null>;
}