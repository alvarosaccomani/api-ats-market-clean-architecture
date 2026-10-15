/**
 * @swagger
 * components:
 *   schemas:
 *     OrderEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         ord_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         cus:
 *           $ref: '#/components/schemas/CustomerEntity'
 *         adr_uuid:
 *           type: string
 *           format: uuid
 *         ord_ordernumber:
 *           type: integer
 *           example: 10045
 *         ord_customername:
 *           type: string
 *           example: "Juan Pérez"
 *         ord_customeremail:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         ord_contactphone:
 *           type: string
 *           example: "+54 11 1234-5678"
 *         ords_uuid:
 *           type: string
 *           format: uuid
 *         ord_date:
 *           type: string
 *           format: date-time
 *         cou_uuid:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         ord_couponcode:
 *           type: string
 *           nullable: true
 *           example: "DESCUENTO10"
 *         ord_discountamount:
 *           type: number
 *           example: 1500.00
 *         ord_subtotal:
 *           type: number
 *           example: 15000.00
 *         ord_shippingcost:
 *           type: number
 *           example: 2500.00
 *         ord_tax:
 *           type: number
 *           example: 3150.00
 *         ord_total:
 *           type: number
 *           example: 19150.00
 *         ord_customernotes:
 *           type: string
 *           example: "Entregar por la tarde"
 *         ord_trackingnumber:
 *           type: string
 *           example: "AR-TRACK-998822"
 *         ord_createdat:
 *           type: string
 *           format: date-time
 *         ord_updatedat:
 *           type: string
 *           format: date-time
 *         orderDetails:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderDetailEntity'
 *
 *     CreateOrderDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - usr_uuid
 *         - cus_uuid
 *         - adr_uuid
 *         - ords_uuid
 *         - ord_subtotal
 *         - ord_total
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
 *         adr_uuid:
 *           type: string
 *           format: uuid
 *         ord_ordernumber:
 *           type: integer
 *           example: 10046
 *         ord_customername:
 *           type: string
 *           example: "Juan Pérez"
 *         ord_customeremail:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         ord_contactphone:
 *           type: string
 *           example: "+54 11 1234-5678"
 *         ords_uuid:
 *           type: string
 *           format: uuid
 *         ord_date:
 *           type: string
 *           format: date-time
 *         cou_uuid:
 *           type: string
 *           format: uuid
 *         ord_couponcode:
 *           type: string
 *           example: "PROMOVERANO"
 *         ord_discountamount:
 *           type: number
 *           example: 500.00
 *         ord_subtotal:
 *           type: number
 *           example: 10000.00
 *         ord_shippingcost:
 *           type: number
 *           example: 1500.00
 *         ord_tax:
 *           type: number
 *           example: 2100.00
 *         ord_total:
 *           type: number
 *           example: 13100.00
 *         ord_customernotes:
 *           type: string
 *           example: "Timbre 4B"
 *         ord_trackingnumber:
 *           type: string
 *         orderDetails:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateOrderDetailDto'
 *
 *     UpdateOrderDto:
 *       type: object
 *       properties:
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         cus_uuid:
 *           type: string
 *           format: uuid
 *         adr_uuid:
 *           type: string
 *           format: uuid
 *         ord_ordernumber:
 *           type: integer
 *         ord_customername:
 *           type: string
 *         ord_customeremail:
 *           type: string
 *           format: email
 *         ord_contactphone:
 *           type: string
 *         ords_uuid:
 *           type: string
 *           format: uuid
 *         ord_date:
 *           type: string
 *           format: date-time
 *         cou_uuid:
 *           type: string
 *           format: uuid
 *         ord_couponcode:
 *           type: string
 *         ord_discountamount:
 *           type: number
 *         ord_subtotal:
 *           type: number
 *         ord_shippingcost:
 *           type: number
 *         ord_tax:
 *           type: number
 *         ord_total:
 *           type: number
 *         ord_customernotes:
 *           type: string
 *         ord_trackingnumber:
 *           type: string
 *
 *     ChangeOrderStatusDto:
 *       type: object
 *       required:
 *         - ords_uuid
 *       properties:
 *         ords_uuid:
 *           type: string
 *           format: uuid
 *           example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         ordh_comment:
 *           type: string
 *           example: "Pedido despachado por correo privado"
 *
 *     OrderDetailEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         ord_uuid:
 *           type: string
 *           format: uuid
 *         ordd_uuid:
 *           type: string
 *           format: uuid
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *         prov_uuid:
 *           type: string
 *           format: uuid
 *         ordd_productname:
 *           type: string
 *           example: "Remera Oversize Algodón"
 *         ordd_code:
 *           type: string
 *           example: "REM-001"
 *         ordd_sku:
 *           type: string
 *           example: "REM-NEG-L"
 *         ordd_quantity:
 *           type: number
 *           example: 2
 *         ordd_unitprice:
 *           type: number
 *           example: 5000.00
 *         ordd_discount:
 *           type: number
 *           example: 0
 *         ordd_subtotal:
 *           type: number
 *           example: 10000.00
 *         ordd_taxrate:
 *           type: number
 *           example: 21.00
 *         ordd_tax:
 *           type: number
 *           example: 2100.00
 *         ordd_basecost:
 *           type: number
 *           example: 2500.00
 *         ordd_createdat:
 *           type: string
 *           format: date-time
 *         ordd_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateOrderDetailDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - ord_uuid
 *         - pro_uuid
 *         - ordd_productname
 *         - ordd_quantity
 *         - ordd_unitprice
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         ord_uuid:
 *           type: string
 *           format: uuid
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *         prov_uuid:
 *           type: string
 *           format: uuid
 *         ordd_productname:
 *           type: string
 *           example: "Remera Oversize Algodón"
 *         ordd_code:
 *           type: string
 *           example: "REM-001"
 *         ordd_sku:
 *           type: string
 *           example: "REM-NEG-L"
 *         ordd_quantity:
 *           type: number
 *           example: 2
 *         ordd_unitprice:
 *           type: number
 *           example: 5000.00
 *         ordd_discount:
 *           type: number
 *           example: 0
 *         ordd_subtotal:
 *           type: number
 *           example: 10000.00
 *         ordd_taxrate:
 *           type: number
 *           example: 21.00
 *         ordd_tax:
 *           type: number
 *           example: 2100.00
 *         ordd_basecost:
 *           type: number
 *           example: 2500.00
 *
 *     UpdateOrderDetailDto:
 *       type: object
 *       properties:
 *         pro_uuid:
 *           type: string
 *           format: uuid
 *         prov_uuid:
 *           type: string
 *           format: uuid
 *         ordd_productname:
 *           type: string
 *         ordd_code:
 *           type: string
 *         ordd_sku:
 *           type: string
 *         ordd_quantity:
 *           type: number
 *         ordd_unitprice:
 *           type: number
 *         ordd_discount:
 *           type: number
 *         ordd_subtotal:
 *           type: number
 *         ordd_taxrate:
 *           type: number
 *         ordd_tax:
 *           type: number
 *         ordd_basecost:
 *           type: number
 *
 *     OrderHistoryEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         ord_uuid:
 *           type: string
 *           format: uuid
 *         ordh_uuid:
 *           type: string
 *           format: uuid
 *         ords_uuid:
 *           type: string
 *           format: uuid
 *         usr_uuid:
 *           type: string
 *           format: uuid
 *         ordh_comment:
 *           type: string
 *           example: "Pedido confirmado por el vendedor"
 *         ordh_createdat:
 *           type: string
 *           format: date-time
 *
 *     OrderStatusEntity:
 *       type: object
 *       properties:
 *         ords_uuid:
 *           type: string
 *           format: uuid
 *         ords_code:
 *           type: string
 *           example: "PENDING"
 *         ords_name:
 *           type: string
 *           example: "Pendiente de Pago"
 *         ords_description:
 *           type: string
 *           example: "El pedido fue generado y espera confirmación de cobro"
 *         ords_bkcolor:
 *           type: string
 *           example: "#ffc107"
 *         ords_frcolor:
 *           type: string
 *           example: "#000000"
 *         ords_createdat:
 *           type: string
 *           format: date-time
 *         ords_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateOrderStatusDto:
 *       type: object
 *       required:
 *         - ords_code
 *         - ords_name
 *       properties:
 *         ords_code:
 *           type: string
 *           example: "SHIPPED"
 *         ords_name:
 *           type: string
 *           example: "Enviado"
 *         ords_description:
 *           type: string
 *           example: "El paquete está en camino al domicilio del comprador"
 *         ords_bkcolor:
 *           type: string
 *           example: "#17a2b8"
 *         ords_frcolor:
 *           type: string
 *           example: "#ffffff"
 *
 *     UpdateOrderStatusDto:
 *       type: object
 *       properties:
 *         ords_code:
 *           type: string
 *         ords_name:
 *           type: string
 *         ords_description:
 *           type: string
 *         ords_bkcolor:
 *           type: string
 *         ords_frcolor:
 *           type: string
 *
 *     PaymentMethodEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         pmt_uuid:
 *           type: string
 *           format: uuid
 *         pmt_name:
 *           type: string
 *           example: "Mercado Pago"
 *         pmt_order:
 *           type: integer
 *           example: 1
 *         pmt_bkcolor:
 *           type: string
 *           example: "#009ee3"
 *         pmt_frcolor:
 *           type: string
 *           example: "#ffffff"
 *         pmt_active:
 *           type: boolean
 *           example: true
 *         pmt_createdat:
 *           type: string
 *           format: date-time
 *         pmt_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreatePaymentMethodDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - pmt_name
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         pmt_name:
 *           type: string
 *           example: "Transferencia Bancaria"
 *         pmt_order:
 *           type: integer
 *           example: 2
 *         pmt_bkcolor:
 *           type: string
 *           example: "#28a745"
 *         pmt_frcolor:
 *           type: string
 *           example: "#ffffff"
 *         pmt_active:
 *           type: boolean
 *           example: true
 *
 *     UpdatePaymentMethodDto:
 *       type: object
 *       properties:
 *         pmt_name:
 *           type: string
 *         pmt_order:
 *           type: integer
 *         pmt_bkcolor:
 *           type: string
 *         pmt_frcolor:
 *           type: string
 *         pmt_active:
 *           type: boolean
 *
 *     CouponEntity:
 *       type: object
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         cou_uuid:
 *           type: string
 *           format: uuid
 *         cou_code:
 *           type: string
 *           example: "BLACKFRIDAY"
 *         cou_type:
 *           type: string
 *           enum: ["PERCENTAGE", "FIXED"]
 *           example: "PERCENTAGE"
 *         cou_value:
 *           type: number
 *           example: 15.00
 *         cou_minpurchase:
 *           type: number
 *           example: 5000.00
 *         cou_maxdiscount:
 *           type: number
 *           example: 2000.00
 *         cou_startdate:
 *           type: string
 *           format: date-time
 *         cou_enddate:
 *           type: string
 *           format: date-time
 *         cou_limit:
 *           type: integer
 *           example: 100
 *         cou_usedcount:
 *           type: integer
 *           example: 25
 *         cou_active:
 *           type: boolean
 *           example: true
 *         cou_createdat:
 *           type: string
 *           format: date-time
 *         cou_updatedat:
 *           type: string
 *           format: date-time
 *
 *     CreateCouponDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - cou_code
 *         - cou_type
 *         - cou_value
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         cou_code:
 *           type: string
 *           example: "CYBERMONDAY"
 *         cou_type:
 *           type: string
 *           enum: ["PERCENTAGE", "FIXED"]
 *           example: "PERCENTAGE"
 *         cou_value:
 *           type: number
 *           example: 20.00
 *         cou_minpurchase:
 *           type: number
 *           example: 10000.00
 *         cou_maxdiscount:
 *           type: number
 *           example: 3000.00
 *         cou_startdate:
 *           type: string
 *           format: date-time
 *         cou_enddate:
 *           type: string
 *           format: date-time
 *         cou_limit:
 *           type: integer
 *           example: 50
 *         cou_active:
 *           type: boolean
 *           example: true
 *
 *     UpdateCouponDto:
 *       type: object
 *       properties:
 *         cou_code:
 *           type: string
 *         cou_type:
 *           type: string
 *           enum: ["PERCENTAGE", "FIXED"]
 *         cou_value:
 *           type: number
 *         cou_minpurchase:
 *           type: number
 *         cou_maxdiscount:
 *           type: number
 *         cou_startdate:
 *           type: string
 *           format: date-time
 *         cou_enddate:
 *           type: string
 *           format: date-time
 *         cou_limit:
 *           type: integer
 *         cou_usedcount:
 *           type: integer
 *         cou_active:
 *           type: boolean
 *
 *     ValidateCouponDto:
 *       type: object
 *       required:
 *         - cmp_uuid
 *         - code
 *         - purchaseAmount
 *       properties:
 *         cmp_uuid:
 *           type: string
 *           format: uuid
 *         code:
 *           type: string
 *           example: "BLACKFRIDAY"
 *         purchaseAmount:
 *           type: number
 *           example: 12500.00
 *
 *     ProcessPaymentDto:
 *       type: object
 *       required:
 *         - token
 *         - transaction_amount
 *       properties:
 *         token:
 *           type: string
 *           example: "9b2d35e9def1321c23bc29"
 *         issuer_id:
 *           type: string
 *           example: "310"
 *         payment_method_id:
 *           type: string
 *           example: "visa"
 *         transaction_amount:
 *           type: number
 *           example: 15000.00
 *         installments:
 *           type: integer
 *           example: 1
 *         payer:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: "comprador@example.com"
 *             identification:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: "DNI"
 *                 number:
 *                   type: string
 *                   example: "35123456"
 *
 *     MercadoPagoWebhookNotification:
 *       type: object
 *       properties:
 *         action:
 *           type: string
 *           example: "payment.created"
 *         api_version:
 *           type: string
 *           example: "v1"
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "1234567890"
 *         date_created:
 *           type: string
 *           format: date-time
 *         id:
 *           type: integer
 *           example: 1234567890
 *         live_mode:
 *           type: boolean
 *           example: true
 *         type:
 *           type: string
 *           example: "payment"
 *         user_id:
 *           type: string
 *           example: "456789012"
 */

export const SALES_SCHEMAS_LOADED = true;
