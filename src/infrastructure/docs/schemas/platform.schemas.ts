/**
 * @swagger
 * components:
 *   schemas:
 *     CompanyEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         cmp_name:
 *           type: string
 *           example: "Supermercado Central"
 *         cmp_address:
 *           type: string
 *           example: "Av. San Martín 1500"
 *         cmp_lat:
 *           type: number
 *           example: -34.6037
 *         cmp_lng:
 *           type: number
 *           example: -58.3816
 *         cmp_phone:
 *           type: string
 *           example: "+54 11 4444-1234"
 *         cmp_email:
 *           type: string
 *           format: email
 *           example: "info@supercentral.com"
 *         cmp_slug:
 *           type: string
 *           example: "super-central"
 *         cmp_logo:
 *           type: string
 *           example: "https://storage.example.com/logos/central.png"
 *         cmp_banner:
 *           type: string
 *           example: "https://storage.example.com/banners/central.png"
 *         cmp_description:
 *           type: string
 *           example: "El mejor surtido para tu hogar al mejor precio"
 *         cmp_currency:
 *           type: string
 *           example: "ARS"
 *         cmp_whatsapp:
 *           type: string
 *           example: "+5491112345678"
 *         cmp_instagram:
 *           type: string
 *           example: "@supercentral"
 *         cmp_facebook:
 *           type: string
 *           example: "supercentraloficial"
 *         cmp_allowbackorders:
 *           type: boolean
 *           example: false
 *         cmp_primarycolor:
 *           type: string
 *           example: "#ff5722"
 *         cmp_isfeatured:
 *           type: boolean
 *           example: true
 *         cmp_status:
 *           type: string
 *           enum: ["active", "inactive", "pending"]
 *           example: "active"
 *         cmp_createdat:
 *           type: string
 *           format: date-time
 *         cmp_updatedat:
 *           type: string
 *           format: date-time
 *         companySettings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CompanySettingEntity'
 *
 *     CreateCompanyDto:
 *       type: object
 *       required:
 *         - cmp_name
 *         - cmp_slug
 *       properties:
 *         cmp_name:
 *           type: string
 *           example: "Supermercado Central"
 *         cmp_address:
 *           type: string
 *           example: "Av. San Martín 1500"
 *         cmp_lat:
 *           type: number
 *           example: -34.6037
 *         cmp_lng:
 *           type: number
 *           example: -58.3816
 *         cmp_phone:
 *           type: string
 *           example: "+54 11 4444-1234"
 *         cmp_email:
 *           type: string
 *           format: email
 *           example: "info@supercentral.com"
 *         cmp_slug:
 *           type: string
 *           example: "super-central"
 *         cmp_logo:
 *           type: string
 *         cmp_banner:
 *           type: string
 *         cmp_description:
 *           type: string
 *         cmp_currency:
 *           type: string
 *           example: "ARS"
 *         cmp_whatsapp:
 *           type: string
 *         cmp_instagram:
 *           type: string
 *         cmp_facebook:
 *           type: string
 *         cmp_allowbackorders:
 *           type: boolean
 *           example: false
 *         cmp_primarycolor:
 *           type: string
 *           example: "#ff5722"
 *         cmp_isfeatured:
 *           type: boolean
 *           example: false
 *         cmp_status:
 *           type: string
 *           enum: ["active", "inactive", "pending"]
 *           example: "active"
 *
 *     UpdateCompanyDto:
 *       type: object
 *       properties:
 *         cmp_name:
 *           type: string
 *         cmp_address:
 *           type: string
 *         cmp_lat:
 *           type: number
 *         cmp_lng:
 *           type: number
 *         cmp_phone:
 *           type: string
 *         cmp_email:
 *           type: string
 *           format: email
 *         cmp_slug:
 *           type: string
 *         cmp_logo:
 *           type: string
 *         cmp_banner:
 *           type: string
 *         cmp_description:
 *           type: string
 *         cmp_currency:
 *           type: string
 *         cmp_whatsapp:
 *           type: string
 *         cmp_instagram:
 *           type: string
 *         cmp_facebook:
 *           type: string
 *         cmp_allowbackorders:
 *           type: boolean
 *         cmp_primarycolor:
 *           type: string
 *         cmp_isfeatured:
 *           type: boolean
 *         cmp_status:
 *           type: string
 *           enum: ["active", "inactive", "pending"]
 *
 *     CompanySettingEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         cmps_uuid:
 *           type: string
 *           format: uuid
 *         cmps_key:
 *           type: string
 *           example: "PAYMENT_MERCADOPAGO_ACCESS_TOKEN"
 *         cmps_parameter:
 *           type: string
 *           example: "access_token"
 *         cmps_description:
 *           type: string
 *           example: "Token de acceso para procesar pagos con Mercado Pago"
 *         cmps_value:
 *           type: string
 *           example: "APP_USR-xxxxxx"
 *         cmps_datatype:
 *           type: string
 *           example: "string"
 *         cmps_options:
 *           type: string
 *         cmps_group:
 *           type: string
 *           example: "PAYMENT"
 *         cmps_createdat:
 *           type: string
 *           format: date-time
 *         cmps_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateCompanySettingDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - cmps_key
 *         - cmps_value
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         cmps_key:
 *           type: string
 *           example: "SHIPPING_FLAT_RATE"
 *         cmps_parameter:
 *           type: string
 *           example: "cost"
 *         cmps_description:
 *           type: string
 *           example: "Costo fijo de envío en la ciudad"
 *         cmps_value:
 *           type: string
 *           example: "1500"
 *         cmps_datatype:
 *           type: string
 *           example: "number"
 *         cmps_options:
 *           type: string
 *         cmps_group:
 *           type: string
 *           example: "SHIPPING"
 *
 *     UpdateCompanySettingDto:
 *       type: object
 *       properties:
 *         cmps_key:
 *           type: string
 *         cmps_parameter:
 *           type: string
 *         cmps_description:
 *           type: string
 *         cmps_value:
 *           type: string
 *         cmps_datatype:
 *           type: string
 *         cmps_options:
 *           type: string
 *         cmps_group:
 *           type: string
 *
 *     CurrencyEntity:
 *       type: object
 *       properties:
 *         cur_uuid:
 *           type: string
 *           format: uuid
 *         cur_code:
 *           type: string
 *           example: "ARS"
 *         cur_symbol:
 *           type: string
 *           example: "$"
 *         cur_name:
 *           type: string
 *           example: "Peso Argentino"
 *         cur_description:
 *           type: string
 *           example: "Moneda de curso legal en la República Argentina"
 *         cur_image:
 *           type: string
 *         cur_createdat:
 *           type: string
 *           format: date-time
 *         cur_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateCurrencyDto:
 *       type: object
 *       required:
 *         - cur_code
 *         - cur_name
 *       properties:
 *         cur_code:
 *           type: string
 *           example: "USD"
 *         cur_symbol:
 *           type: string
 *           example: "U$S"
 *         cur_name:
 *           type: string
 *           example: "Dólar Estadounidense"
 *         cur_description:
 *           type: string
 *         cur_image:
 *           type: string
 *
 *     UpdateCurrencyDto:
 *       type: object
 *       properties:
 *         cur_code:
 *           type: string
 *         cur_symbol:
 *           type: string
 *         cur_name:
 *           type: string
 *         cur_description:
 *           type: string
 *         cur_image:
 *           type: string
 *
 *     MenuEntity:
 *       type: object
 *       properties:
 *         mnu_uuid:
 *           type: string
 *           format: uuid
 *         mnu_parent_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         mnu_title:
 *           type: string
 *           example: "Ventas"
 *         mnu_description:
 *           type: string
 *           example: "Módulo de gestión de ventas y pedidos"
 *         mnu_icon:
 *           type: string
 *           example: "shopping_cart"
 *         mnu_route:
 *           type: string
 *           example: "/sales/orders"
 *         mnu_order:
 *           type: integer
 *           example: 3
 *         mnu_itemactive:
 *           type: boolean
 *           example: true
 *         mnu_active:
 *           type: boolean
 *           example: true
 *         mnu_showifcompanyactive:
 *           type: boolean
 *           example: true
 *         mnu_createdat:
 *           type: string
 *           format: date-time
 *         mnu_updatedat:
 *           type: string
 *           format: date-time
 *
 *     MenuItemTree:
 *       type: object
 *       properties:
 *         mnu_uuid:
 *           type: string
 *           format: uuid
 *         mnu_parent_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         mnu_title:
 *           type: string
 *         mnu_description:
 *           type: string
 *         mnu_icon:
 *           type: string
 *         mnu_route:
 *           type: string
 *         mnu_order:
 *           type: integer
 *         mnu_itemactive:
 *           type: boolean
 *         mnu_active:
 *           type: boolean
 *         mnu_showifcompanyactive:
 *           type: boolean
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MenuItemTree'
 *
 *     CreateMenuDto:
 *       type: object
 *       required:
 *         - mnu_title
 *       properties:
 *         mnu_parent_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         mnu_title:
 *           type: string
 *           example: "Reportes"
 *         mnu_description:
 *           type: string
 *           example: "Módulo de analíticas y reportes de gestión"
 *         mnu_icon:
 *           type: string
 *           example: "bar_chart"
 *         mnu_route:
 *           type: string
 *           example: "/analytics/reports"
 *         mnu_order:
 *           type: integer
 *           example: 5
 *         mnu_itemactive:
 *           type: boolean
 *           example: true
 *         mnu_active:
 *           type: boolean
 *           example: true
 *         mnu_showifcompanyactive:
 *           type: boolean
 *           example: true
 *
 *     UpdateMenuDto:
 *       type: object
 *       properties:
 *         mnu_parent_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         mnu_title:
 *           type: string
 *         mnu_description:
 *           type: string
 *         mnu_icon:
 *           type: string
 *         mnu_route:
 *           type: string
 *         mnu_order:
 *           type: integer
 *         mnu_itemactive:
 *           type: boolean
 *         mnu_active:
 *           type: boolean
 *         mnu_showifcompanyactive:
 *           type: boolean
 *
 *     NotificationEntity:
 *       type: object
 *       properties:
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         ntf_uuid:
 *           type: string
 *           format: uuid
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         ntf_title:
 *           type: string
 *           example: "¡Tu pedido fue despachado!"
 *         ntf_message:
 *           type: string
 *           example: "Tu orden #10045 ya está en camino con el transportista"
 *         ntf_type:
 *           type: string
 *           example: "ORDER_STATUS"
 *         ntf_isread:
 *           type: boolean
 *           example: false
 *         ntf_actionurl:
 *           type: string
 *           example: "/orders/detail/10045"
 *         ntf_createdat:
 *           type: string
 *           format: date-time
 *
 *     CreateNotificationDto:
 *       type: object
 *       required:
 *         - usr_uuid
 *         - cus_uuid
 *         - cmp_uuid
 *         - ntf_title
 *         - ntf_message
 *       properties:
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         ntf_title:
 *           type: string
 *           example: "Nuevo mensaje de soporte"
 *         ntf_message:
 *           type: string
 *           example: "El vendedor ha respondido a tu consulta"
 *         ntf_type:
 *           type: string
 *           example: "CHAT"
 *         ntf_actionurl:
 *           type: string
 *
 *     UpdateNotificationDto:
 *       type: object
 *       properties:
 *         ntf_title:
 *           type: string
 *         ntf_message:
 *           type: string
 *         ntf_type:
 *           type: string
 *         ntf_isread:
 *           type: boolean
 *           example: true
 *
 *     MessageEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         msg_uuid:
 *           type: string
 *           format: uuid
 *         ord_uuid:
 *           type: string
 *           format: uuid
 *         msg_sender:
 *           type: string
 *           example: "SELLER"
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         msg_sendername:
 *           type: string
 *           example: "Atención al Cliente"
 *         msg_text:
 *           type: string
 *           example: "Hola Juan, tu pedido está empaquetado y sale hoy a las 16hs."
 *         msg_createdat:
 *           type: string
 *           format: date-time
 *         msg_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateMessageDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - ord_uuid
 *         - msg_text
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         ord_uuid:
 *           type: string
 *           format: uuid
 *         msg_sender:
 *           type: string
 *           example: "BUYER"
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         msg_sendername:
 *           type: string
 *           example: "Juan Pérez"
 *         msg_text:
 *           type: string
 *           example: "¿Tienen stock en color azul?"
 *
 *     AnalyticEventEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         aev_uuid:
 *           type: string
 *           format: uuid
 *         aev_eventtype:
 *           type: string
 *           example: "PRODUCT_VIEW"
 *         aev_targetuuid:
 *           type: string
 *           format: uuid
 *         aev_metadata:
 *           type: string
 *           example: "{\"device\":\"Mobile\",\"location\":{\"city\":\"Rosario\"}}"
 *         aev_createdat:
 *           type: string
 *           format: date-time
 *         aev_updatedat:
 *           type: string
 *           format: date-time
 *
 *     TrackAnalyticEventDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - aev_eventtype
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         aev_eventtype:
 *           type: string
 *           example: "ADD_TO_CART"
 *         aev_targetuuid:
 *           type: string
 *           format: uuid
 *         aev_metadata:
 *           type: string
 *           example: "{\"qty\":1,\"price\":5000}"
 */

export const PLATFORM_SCHEMAS_LOADED = true;
