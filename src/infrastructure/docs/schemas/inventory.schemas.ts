/**
 * @swagger
 * components:
 *   schemas:
 *     WarehouseEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         war_uuid:
 *           type: string
 *           format: uuid
 *         war_name:
 *           type: string
 *           example: "Depósito Central"
 *         war_address:
 *           type: string
 *           example: "Av. Industrial 1234, Parque Logístico"
 *         war_lat:
 *           type: number
 *           example: -34.6037
 *         war_lng:
 *           type: number
 *           example: -58.3816
 *         war_active:
 *           type: boolean
 *           example: true
 *         war_createdat:
 *           type: string
 *           format: date-time
 *         war_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateWarehouseDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - war_name
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         war_name:
 *           type: string
 *           example: "Almacén Norte"
 *         war_address:
 *           type: string
 *           example: "Ruta 9 Km 45"
 *         war_lat:
 *           type: number
 *           example: -34.4500
 *         war_lng:
 *           type: number
 *           example: -58.6200
 *         war_active:
 *           type: boolean
 *           example: true
 *
 *     UpdateWarehouseDto:
 *       type: object
 *       properties:
 *         war_name:
 *           type: string
 *         war_address:
 *           type: string
 *         war_lat:
 *           type: number
 *         war_lng:
 *           type: number
 *         war_active:
 *           type: boolean
 *
 *     WarehouseLocationEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         war_uuid:
 *           type: string
 *           format: uuid
 *         warl_uuid:
 *           type: string
 *           format: uuid
 *         warl_aisle:
 *           type: string
 *           example: "A"
 *         warl_sector:
 *           type: string
 *           example: "Seco"
 *         warl_rack:
 *           type: string
 *           example: "01"
 *         warl_shelf:
 *           type: string
 *           example: "03"
 *         warl_bincode:
 *           type: string
 *           example: "A-01-03-B2"
 *         warl_active:
 *           type: boolean
 *           example: true
 *         warl_createdat:
 *           type: string
 *           format: date-time
 *         warl_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateWarehouseLocationDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - war_uuid
 *         - warl_aisle
 *         - warl_bincode
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         war_uuid:
 *           type: string
 *           format: uuid
 *         warl_aisle:
 *           type: string
 *           example: "B"
 *         warl_sector:
 *           type: string
 *           example: "Refrigerado"
 *         warl_rack:
 *           type: string
 *           example: "02"
 *         warl_shelf:
 *           type: string
 *           example: "01"
 *         warl_bincode:
 *           type: string
 *           example: "B-02-01-R1"
 *         warl_active:
 *           type: boolean
 *           example: true
 *
 *     BatchCreateWarehouseLocationDto:
 *       type: object
 *       required:
 *         - locations
 *       properties:
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateWarehouseLocationDto'
 *
 *     UpdateWarehouseLocationDto:
 *       type: object
 *       properties:
 *         warl_aisle:
 *           type: string
 *         warl_sector:
 *           type: string
 *         warl_rack:
 *           type: string
 *         warl_shelf:
 *           type: string
 *         warl_bincode:
 *           type: string
 *         warl_active:
 *           type: boolean
 *
 *     InventoryStockEntity:
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
 *         war_uuid:
 *           type: string
 *           format: uuid
 *         warl_uuid:
 *           type: string
 *           format: uuid
 *         ist_quanty:
 *           type: number
 *           example: 250
 *         ist_quantyreserved:
 *           type: number
 *           example: 15
 *         ist_createdat:
 *           type: string
 *           format: date-time
 *         ist_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateInventoryStockDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pro_uuid
 *         - prov_uuid
 *         - war_uuid
 *         - warl_uuid
 *         - ist_quanty
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
 *         war_uuid:
 *           type: string
 *           format: uuid
 *         warl_uuid:
 *           type: string
 *           format: uuid
 *         ist_quanty:
 *           type: number
 *           example: 100
 *         ist_quantyreserved:
 *           type: number
 *           example: 0
 *
 *     BatchCreateInventoryStockDto:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateInventoryStockDto'
 *
 *     UpdateInventoryStockDto:
 *       type: object
 *       properties:
 *         ist_quanty:
 *           type: number
 *           example: 120
 *         ist_quantyreserved:
 *           type: number
 *           example: 5
 *
 *     StockMovementEntity:
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
 *         smo_uuid:
 *           type: string
 *           format: uuid
 *         ord_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         tsmo_uuid:
 *           type: string
 *           format: uuid
 *         smo_quantity:
 *           type: number
 *           example: 25
 *         smo_previousstock:
 *           type: number
 *           example: 100
 *         smo_currentstock:
 *           type: number
 *           example: 125
 *         smo_reason:
 *           type: string
 *           example: "Ingreso por reposición de mercadería"
 *         smo_createdat:
 *           type: string
 *           format: date-time
 *         smo_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateStockMovementDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pro_uuid
 *         - prov_uuid
 *         - tsmo_uuid
 *         - smo_quantity
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
 *         ord_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         tsmo_uuid:
 *           type: string
 *           format: uuid
 *         smo_quantity:
 *           type: number
 *           example: 50
 *         smo_previousstock:
 *           type: number
 *           example: 50
 *         smo_currentstock:
 *           type: number
 *           example: 100
 *         smo_reason:
 *           type: string
 *           example: "Compra de proveedor"
 *
 *     RegisterAdjustmentDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pro_uuid
 *         - prov_uuid
 *         - war_uuid
 *         - warl_uuid
 *         - new_stock
 *         - reason
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
 *         war_uuid:
 *           type: string
 *           format: uuid
 *         warl_uuid:
 *           type: string
 *           format: uuid
 *         new_stock:
 *           type: number
 *           example: 85
 *         reason:
 *           type: string
 *           example: "Ajuste de inventario por auditoría física"
 *
 *     UpdateStockMovementDto:
 *       type: object
 *       properties:
 *         smo_reason:
 *           type: string
 *           example: "Motivo corregido"
 *
 *     TypeStockMovementEntity:
 *       type: object
 *       properties:
 *         tsmo_uuid:
 *           type: string
 *           format: uuid
 *         tsmo_code:
 *           type: string
 *           example: "ING_COMPRA"
 *         tsmo_name:
 *           type: string
 *           example: "Ingreso por Compra"
 *         tsmo_description:
 *           type: string
 *           example: "Ingreso de stock correspondiente a orden de compra"
 *         tsmo_bkcolor:
 *           type: string
 *           example: "#28a745"
 *         tsmo_frcolor:
 *           type: string
 *           example: "#ffffff"
 *         tsmo_createdat:
 *           type: string
 *           format: date-time
 *         tsmo_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateTypeStockMovementDto:
 *       type: object
 *       required:
 *         - tsmo_code
 *         - tsmo_name
 *       properties:
 *         tsmo_code:
 *           type: string
 *           example: "EG_VENTA"
 *         tsmo_name:
 *           type: string
 *           example: "Egreso por Venta"
 *         tsmo_description:
 *           type: string
 *           example: "Despacho de pedido vendido"
 *         tsmo_bkcolor:
 *           type: string
 *           example: "#dc3545"
 *         tsmo_frcolor:
 *           type: string
 *           example: "#ffffff"
 *
 *     UpdateTypeStockMovementDto:
 *       type: object
 *       properties:
 *         tsmo_code:
 *           type: string
 *         tsmo_name:
 *           type: string
 *         tsmo_description:
 *           type: string
 *         tsmo_bkcolor:
 *           type: string
 *         tsmo_frcolor:
 *           type: string
 */

export const INVENTORY_SCHEMAS_LOADED = true;
