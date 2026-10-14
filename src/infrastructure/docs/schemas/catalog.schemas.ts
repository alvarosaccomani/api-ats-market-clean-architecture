/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         itm_uuid:
 *           type: string
 *           format: uuid
 *         cat_uuid:
 *           type: string
 *           format: uuid
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         gcat_uuid:
 *           type: string
 *           format: uuid
 *         cat_name:
 *           type: string
 *           example: "Bebidas"
 *         cat_description:
 *           type: string
 *           example: "Gaseosas, aguas y jugos"
 *         cat_createdat:
 *           type: string
 *           format: date-time
 *         cat_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateCategoryDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - itm_uuid
 *         - cat_name
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         itm_uuid:
 *           type: string
 *           format: uuid
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         gcat_uuid:
 *           type: string
 *           format: uuid
 *         cat_name:
 *           type: string
 *           example: "Lácteos"
 *         cat_description:
 *           type: string
 *           example: "Leches, yogures y quesos"
 *
 *     UpdateCategoryDto:
 *       type: object
 *       properties:
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         gcat_uuid:
 *           type: string
 *           format: uuid
 *         cat_name:
 *           type: string
 *           example: "Lácteos y Derivados"
 *         cat_description:
 *           type: string
 *           example: "Descripción actualizada"
 *
 *     ProductEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *         pro_code:
 *           type: string
 *           example: "PROD-001"
 *         pro_name:
 *           type: string
 *           example: "Coca Cola 2.25L"
 *         pro_image:
 *           type: string
 *           example: "https://storage.market.com/products/coca225.png"
 *         pro_description:
 *           type: string
 *           example: "Bebida gaseosa sabor cola"
 *         itm_uuid:
 *           type: string
 *           format: uuid
 *         cat_uuid:
 *           type: string
 *           format: uuid
 *         pro_createdat:
 *           type: string
 *           format: date-time
 *         pro_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateProductDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pro_code
 *         - pro_name
 *         - itm_uuid
 *         - cat_uuid
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         pro_code:
 *           type: string
 *           example: "PROD-002"
 *         pro_name:
 *           type: string
 *           example: "Agua Mineral 1.5L"
 *         pro_image:
 *           type: string
 *           example: "https://storage.market.com/products/agua15.png"
 *         pro_description:
 *           type: string
 *           example: "Agua mineral baja en sodio"
 *         itm_uuid:
 *           type: string
 *           format: uuid
 *         cat_uuid:
 *           type: string
 *           format: uuid
 *
 *     UpdateProductDto:
 *       type: object
 *       properties:
 *         pro_code:
 *           type: string
 *           example: "PROD-002-REV"
 *         pro_name:
 *           type: string
 *           example: "Agua Mineral sin gas 1.5L"
 *         pro_image:
 *           type: string
 *         pro_description:
 *           type: string
 *         itm_uuid:
 *           type: string
 *           format: uuid
 *         cat_uuid:
 *           type: string
 *           format: uuid
 *
 *     ProductVariationEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *         prov_uuid:
 *           type: string
 *           format: uuid
 *         prov_code:
 *           type: string
 *           example: "VAR-001"
 *         prov_sku:
 *           type: string
 *           example: "SKU-BEB-001"
 *         prov_name:
 *           type: string
 *           example: "Original 2.25L"
 *         prov_description:
 *           type: string
 *         prov_image:
 *           type: string
 *         mat_uuid:
 *           type: string
 *           format: uuid
 *         prov_color:
 *           type: string
 *           example: "Rojo"
 *         prov_size:
 *           type: string
 *           example: "2.25L"
 *         prov_stock:
 *           type: number
 *           example: 150
 *         prov_suggestedminimumsellingprice:
 *           type: number
 *           example: 3200.50
 *         prov_averagerating:
 *           type: number
 *           example: 4.8
 *         prov_reviewscount:
 *           type: number
 *           example: 24
 *         prov_isvisible:
 *           type: boolean
 *           example: true
 *
 *     CreateProductVariationDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pro_uuid
 *         - prov_code
 *         - prov_sku
 *         - prov_name
 *         - mat_uuid
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *         prov_code:
 *           type: string
 *           example: "VAR-002"
 *         prov_sku:
 *           type: string
 *           example: "SKU-BEB-002"
 *         prov_name:
 *           type: string
 *           example: "Zero Azúcar 2.25L"
 *         prov_description:
 *           type: string
 *         prov_image:
 *           type: string
 *         mat_uuid:
 *           type: string
 *           format: uuid
 *         prov_color:
 *           type: string
 *           example: "Negro"
 *         prov_size:
 *           type: string
 *           example: "2.25L"
 *         prov_stock:
 *           type: number
 *           example: 80
 *         prov_suggestedminimumsellingprice:
 *           type: number
 *           example: 3300.00
 *         prov_isvisible:
 *           type: boolean
 *           example: true
 *
 *     UpdateProductVariationDto:
 *       type: object
 *       properties:
 *         prov_code:
 *           type: string
 *         prov_sku:
 *           type: string
 *         prov_name:
 *           type: string
 *         prov_description:
 *           type: string
 *         prov_image:
 *           type: string
 *         mat_uuid:
 *           type: string
 *           format: uuid
 *         prov_color:
 *           type: string
 *         prov_size:
 *           type: string
 *         prov_stock:
 *           type: number
 *         prov_suggestedminimumsellingprice:
 *           type: number
 *         prov_isvisible:
 *           type: boolean
 *
 *     ProductVariationReviewEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *         prov_uuid:
 *           type: string
 *           format: uuid
 *         provrev_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         provrev_rating:
 *           type: number
 *           example: 5
 *         provrev_comment:
 *           type: string
 *           example: "Excelente calidad del producto."
 *         provrev_isverified:
 *           type: boolean
 *           example: true
 *
 *     CreateProductVariationReviewDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pro_uuid
 *         - prov_uuid
 *         - provrev_rating
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *         prov_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         provrev_rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         provrev_comment:
 *           type: string
 *           example: "Muy buen producto y rápida entrega."
 *
 *     UpdateProductVariationReviewDto:
 *       type: object
 *       properties:
 *         provrev_rating:
 *           type: number
 *         provrev_comment:
 *           type: string
 *         provrev_isverified:
 *           type: boolean
 *
 *     ItemEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         itm_uuid:
 *           type: string
 *           format: uuid
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         itm_name:
 *           type: string
 *           example: "Gaseosas"
 *         itm_description:
 *           type: string
 *           example: "Línea de bebidas con gas"
 *
 *     CreateItemDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - itm_name
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         itm_name:
 *           type: string
 *           example: "Jugos Naturales"
 *         itm_description:
 *           type: string
 *           example: "Línea de jugos prensados"
 *
 *     UpdateItemDto:
 *       type: object
 *       properties:
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         itm_name:
 *           type: string
 *         itm_description:
 *           type: string
 *
 *     MaterialEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         mat_uuid:
 *           type: string
 *           format: uuid
 *         gmat_uuid:
 *           type: string
 *           format: uuid
 *         mat_name:
 *           type: string
 *           example: "Plástico PET"
 *         mat_description:
 *           type: string
 *
 *     CreateMaterialDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - mat_name
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         gmat_uuid:
 *           type: string
 *           format: uuid
 *         mat_name:
 *           type: string
 *           example: "Vidrio Retornable"
 *         mat_description:
 *           type: string
 *
 *     UpdateMaterialDto:
 *       type: object
 *       properties:
 *         gmat_uuid:
 *           type: string
 *           format: uuid
 *         mat_name:
 *           type: string
 *         mat_description:
 *           type: string
 *
 *     GlobalCategoryEntity:
 *       type: object
 *       properties:
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         gcat_uuid:
 *           type: string
 *           format: uuid
 *         gcat_name:
 *           type: string
 *           example: "Alimentos y Bebidas"
 *         gcat_description:
 *           type: string
 *         gcat_image:
 *           type: string
 *
 *     CreateGlobalCategoryDto:
 *       type: object
 *       required:
 *         - gitm_uuid
 *         - gcat_name
 *       properties:
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         gcat_name:
 *           type: string
 *           example: "Limpieza y Hogar"
 *         gcat_description:
 *           type: string
 *         gcat_image:
 *           type: string
 *
 *     UpdateGlobalCategoryDto:
 *       type: object
 *       properties:
 *         gcat_name:
 *           type: string
 *         gcat_description:
 *           type: string
 *         gcat_image:
 *           type: string
 *
 *     GlobalItemEntity:
 *       type: object
 *       properties:
 *         gitm_uuid:
 *           type: string
 *           format: uuid
 *         gitm_name:
 *           type: string
 *           example: "Consumo Masivo"
 *         gitm_description:
 *           type: string
 *         gitm_image:
 *           type: string
 *
 *     CreateGlobalItemDto:
 *       type: object
 *       required:
 *         - gitm_name
 *       properties:
 *         gitm_name:
 *           type: string
 *           example: "Bazar y Textil"
 *         gitm_description:
 *           type: string
 *         gitm_image:
 *           type: string
 *
 *     UpdateGlobalItemDto:
 *       type: object
 *       properties:
 *         gitm_name:
 *           type: string
 *         gitm_description:
 *           type: string
 *         gitm_image:
 *           type: string
 *
 *     GlobalMaterialEntity:
 *       type: object
 *       properties:
 *         gmat_uuid:
 *           type: string
 *           format: uuid
 *         gmat_name:
 *           type: string
 *           example: "Aluminio"
 *         gmat_description:
 *           type: string
 *         gmat_image:
 *           type: string
 *
 *     CreateGlobalMaterialDto:
 *       type: object
 *       required:
 *         - gmat_name
 *       properties:
 *         gmat_name:
 *           type: string
 *           example: "Cartón Corrugado"
 *         gmat_description:
 *           type: string
 *         gmat_image:
 *           type: string
 *
 *     UpdateGlobalMaterialDto:
 *       type: object
 *       properties:
 *         gmat_name:
 *           type: string
 *         gmat_description:
 *           type: string
 *         gmat_image:
 *           type: string
 */

export const CATALOG_SCHEMAS_LOADED = true;
