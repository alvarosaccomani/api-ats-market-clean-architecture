import { ProductEntity, ProductUpdateData } from "./product.entity";

export interface ProductRepository {
    getProducts(cmp_uuid: string, cus_uuid: string): Promise<ProductEntity[] | null>;
    findProductById(cmp_uuid: string, cus_uuid: string): Promise<ProductEntity | null>;
    createProduct(product: ProductEntity): Promise<ProductEntity | null>;
    updateProduct(cmp_uuid: string, cus_uuid: string, product: ProductUpdateData): Promise<ProductEntity | null>;
    deleteProduct(cmp_uuid: string, cus_uuid: string): Promise<ProductEntity | null>;
    findProductByName(cmp_uuid: string, cus_uuid: string, pro_name: string, excludeUuid?: string | null): Promise<ProductEntity | null>;
}