/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerEntity:
 *       type: object
 *       properties:
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         cus_fullname:
 *           type: string
 *           example: "Juan Pérez"
 *         cus_email:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         cus_phone:
 *           type: string
 *           example: "+54 9 11 1234-5678"
 *         cus_dateofbirth:
 *           type: string
 *           format: date-time
 *           example: "1990-05-15T00:00:00.000Z"
 *         cus_createdat:
 *           type: string
 *           format: date-time
 *         cus_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateCustomerDto:
 *       type: object
 *       required:
 *         - cus_uuid
 *         - cus_fullname
 *       properties:
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         cus_fullname:
 *           type: string
 *           example: "Juan Pérez"
 *         cus_email:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         cus_phone:
 *           type: string
 *           example: "+54 9 11 1234-5678"
 *         cus_dateofbirth:
 *           type: string
 *           format: date-time
 *           example: "1990-05-15T00:00:00.000Z"
 *
 *     UpdateCustomerDto:
 *       type: object
 *       properties:
 *         cus_fullname:
 *           type: string
 *           example: "Juan Manuel Pérez"
 *         cus_email:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         cus_phone:
 *           type: string
 *           example: "+54 9 11 8765-4321"
 *         cus_dateofbirth:
 *           type: string
 *           format: date-time
 *           example: "1990-05-15T00:00:00.000Z"
 *
 *     SupplierEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         sup_uuid:
 *           type: string
 *           format: uuid
 *         sup_fullname:
 *           type: string
 *           example: "Distribuidora Mayorista S.A."
 *         sup_email:
 *           type: string
 *           format: email
 *           example: "contacto@mayorista.com"
 *         sup_phone:
 *           type: string
 *           example: "+54 11 4444-5555"
 *         pmt_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         sup_createdat:
 *           type: string
 *           format: date-time
 *         sup_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateSupplierDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - sup_fullname
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         sup_uuid:
 *           type: string
 *           format: uuid
 *         sup_fullname:
 *           type: string
 *           example: "Distribuidora Mayorista S.A."
 *         sup_email:
 *           type: string
 *           format: email
 *           example: "contacto@mayorista.com"
 *         sup_phone:
 *           type: string
 *           example: "+54 11 4444-5555"
 *         pmt_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *
 *     UpdateSupplierDto:
 *       type: object
 *       properties:
 *         sup_fullname:
 *           type: string
 *           example: "Distribuidora Mayorista Central S.A."
 *         sup_email:
 *           type: string
 *           format: email
 *           example: "administracion@mayorista.com"
 *         sup_phone:
 *           type: string
 *           example: "+54 11 4444-5556"
 *         pmt_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *
 *     CostPerSupplierEntity:
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
 *         sup_uuid:
 *           type: string
 *           format: uuid
 *         cps_uuid:
 *           type: string
 *           format: uuid
 *         cps_pricecost:
 *           type: number
 *           example: 1500.50
 *         cps_basecost:
 *           type: boolean
 *           example: true
 *         cur_uuid:
 *           type: string
 *           format: uuid
 *         cps_exchangerate:
 *           type: number
 *           example: 1050.00
 *         cps_suppliersku:
 *           type: string
 *           example: "SUP-SKU-998"
 *         cps_leadtimedays:
 *           type: integer
 *           example: 7
 *         cps_miniumorderquanty:
 *           type: number
 *           example: 10
 *         cps_boxquantity:
 *           type: number
 *           example: 24
 *         cps_notes:
 *           type: string
 *           example: "Precio bonificado por compra en bulto cerrado"
 *         cps_suggestedminimumsellingprice:
 *           type: number
 *           example: 2200.00
 *         cps_date:
 *           type: string
 *           format: date-time
 *         cps_createdat:
 *           type: string
 *           format: date-time
 *         cps_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateCostPerSupplierDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pro_uuid
 *         - prov_uuid
 *         - sup_uuid
 *         - cps_pricecost
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
 *         sup_uuid:
 *           type: string
 *           format: uuid
 *         cps_pricecost:
 *           type: number
 *           example: 1500.50
 *         cps_basecost:
 *           type: boolean
 *           example: true
 *         cur_uuid:
 *           type: string
 *           format: uuid
 *         cps_exchangerate:
 *           type: number
 *           example: 1050.00
 *         cps_suppliersku:
 *           type: string
 *           example: "SUP-SKU-998"
 *         cps_leadtimedays:
 *           type: integer
 *           example: 7
 *         cps_miniumorderquanty:
 *           type: number
 *           example: 10
 *         cps_boxquantity:
 *           type: number
 *           example: 24
 *         cps_notes:
 *           type: string
 *           example: "Precio bonificado"
 *         cps_suggestedminimumsellingprice:
 *           type: number
 *           example: 2200.00
 *         cps_date:
 *           type: string
 *           format: date-time
 *
 *     UpdateCostPerSupplierDto:
 *       type: object
 *       required:
 *         - cps_pricecost
 *       properties:
 *         cps_pricecost:
 *           type: number
 *           example: 1650.00
 *         cps_basecost:
 *           type: boolean
 *           example: false
 *         cur_uuid:
 *           type: string
 *           format: uuid
 *         cps_exchangerate:
 *           type: number
 *           example: 1100.00
 *         cps_suppliersku:
 *           type: string
 *           example: "SUP-SKU-998-REV"
 *         cps_leadtimedays:
 *           type: integer
 *           example: 5
 *         cps_miniumorderquanty:
 *           type: number
 *           example: 15
 *         cps_boxquantity:
 *           type: number
 *           example: 24
 *         cps_notes:
 *           type: string
 *           example: "Ajuste por tipo de cambio"
 *         cps_suggestedminimumsellingprice:
 *           type: number
 *           example: 2400.00
 *         cps_date:
 *           type: string
 *           format: date-time
 *
 *     AddressEntity:
 *       type: object
 *       properties:
 *         adr_uuid:
 *           type: string
 *           format: uuid
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         sup_uuid:
 *           type: string
 *           format: uuid
 *         adr_alias:
 *           type: string
 *           example: "Casa"
 *         adr_recipientname:
 *           type: string
 *           example: "Juan Pérez"
 *         adr_contactphone:
 *           type: string
 *           example: "+54 11 1234-5678"
 *         adr_reference:
 *           type: string
 *           example: "Entre calles Belgrano y San Martín, portón blanco"
 *         adr_country:
 *           type: string
 *           example: "Argentina"
 *         adr_address:
 *           type: string
 *           example: "Av. Corrientes 1234 4B"
 *         adr_street:
 *           type: string
 *           example: "Av. Corrientes"
 *         adr_number:
 *           type: string
 *           example: "1234"
 *         adr_floor:
 *           type: string
 *           example: "4"
 *         adr_apartment:
 *           type: string
 *           example: "B"
 *         adr_city:
 *           type: string
 *           example: "CABA"
 *         adr_province:
 *           type: string
 *           example: "Buenos Aires"
 *         adr_postalcode:
 *           type: string
 *           example: "C1043AAZ"
 *         adr_lat:
 *           type: number
 *           example: -34.6037
 *         adr_lng:
 *           type: number
 *           example: -58.3816
 *         adr_createdat:
 *           type: string
 *           format: date-time
 *         adr_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateAddressDto:
 *       type: object
 *       required:
 *         - adr_address
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         sup_uuid:
 *           type: string
 *           format: uuid
 *         adr_alias:
 *           type: string
 *           example: "Depósito Principal"
 *         adr_recipientname:
 *           type: string
 *           example: "Carlos Gómez"
 *         adr_contactphone:
 *           type: string
 *           example: "+54 11 5555-6666"
 *         adr_reference:
 *           type: string
 *           example: "Frente al banco"
 *         adr_country:
 *           type: string
 *           example: "Argentina"
 *         adr_address:
 *           type: string
 *           example: "Av. Rivadavia 5000"
 *         adr_street:
 *           type: string
 *           example: "Av. Rivadavia"
 *         adr_number:
 *           type: string
 *           example: "5000"
 *         adr_floor:
 *           type: string
 *           example: "1"
 *         adr_apartment:
 *           type: string
 *           example: "A"
 *         adr_city:
 *           type: string
 *           example: "CABA"
 *         adr_province:
 *           type: string
 *           example: "Buenos Aires"
 *         adr_postalcode:
 *           type: string
 *           example: "C1405"
 *         adr_lat:
 *           type: number
 *           example: -34.6186
 *         adr_lng:
 *           type: number
 *           example: -58.4355
 *
 *     UpdateAddressDto:
 *       type: object
 *       properties:
 *         adr_alias:
 *           type: string
 *           example: "Casa de Verano"
 *         adr_recipientname:
 *           type: string
 *           example: "Juan Pérez"
 *         adr_contactphone:
 *           type: string
 *           example: "+54 11 9999-8888"
 *         adr_reference:
 *           type: string
 *           example: "Portón negro"
 *         adr_country:
 *           type: string
 *           example: "Argentina"
 *         adr_address:
 *           type: string
 *           example: "Calle 50 120"
 *         adr_street:
 *           type: string
 *           example: "Calle 50"
 *         adr_number:
 *           type: string
 *           example: "120"
 *         adr_floor:
 *           type: string
 *           example: ""
 *         adr_apartment:
 *           type: string
 *           example: ""
 *         adr_city:
 *           type: string
 *           example: "La Plata"
 *         adr_province:
 *           type: string
 *           example: "Buenos Aires"
 *         adr_postalcode:
 *           type: string
 *           example: "B1900"
 *         adr_lat:
 *           type: number
 *           example: -34.9214
 *         adr_lng:
 *           type: number
 *           example: -57.9545
 *
 *     FavoriteEntity:
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
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         fav_uuid:
 *           type: string
 *           format: uuid
 *         fav_createdat:
 *           type: string
 *           format: date-time
 *         fav_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateFavoriteDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pro_uuid
 *         - prov_uuid
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *           example: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e"
 *         prov_uuid:
 *           type: string
 *           format: uuid
 *           example: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f"
 */

export const STAKEHOLDERS_SCHEMAS_LOADED = true;
