import { v4 as uuid } from "uuid";
import { OrderRepository } from "../../domain/order/order.repository";
import { OrderValue } from "../../domain/order/order.value";
import { OrderDetailEntity } from "../../domain/order-detail/order-detail.entity";
import { OrderDetailRepository } from "../../domain/order-detail/order-detail.repository";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";
import { OrderHistoryRepository } from "../../domain/order-history/order-history.repository";
import { OrderHistoryValue } from "../../domain/order-history/order-history.value";
import { sequelize } from "../../infrastructure/db/sequelize";
import { SequelizeInventoryStock } from "../../infrastructure/model/inventory-stock/inventory-stock.model";
import { SequelizeStockMovement } from "../../infrastructure/model/stock-movement/stock-movement.model";
import { SequelizeProductVariation } from "../../infrastructure/model/product-variation/product-variation.model";
import { SequelizeWarehouseLocation } from "../../infrastructure/model/warehouse-location/warehouse-location.model";
import { SequelizeUser } from "../../infrastructure/model/user/user.model";

export class OrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly orderDetailRepository: OrderDetailRepository,
        private readonly orderHistoryRepository: OrderHistoryRepository
    ) {
        this.getOrders = this.getOrders.bind(this);
        this.getOrderDetail = this.getOrderDetail.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.getOrdersByCustomer = this.getOrdersByCustomer.bind(this);
        this.changeOrderStatus = this.changeOrderStatus.bind(this);
    }

    public async getOrders(cmp_uuid: string) {
        try {
            const order = await this.orderRepository.getOrders(cmp_uuid);
            if(!order) {
                throw new Error('No hay ordenes.');
            }
            return order.map(order => ({
                cmp_uuid: order.cmp_uuid,
                ord_uuid: order.ord_uuid,
                usr_uuid: order.usr_uuid,
                cus_uuid: order.cus_uuid,
                cus: order.cus,
                adr_uuid: order.adr_uuid,
                ord_ordernumber: order.ord_ordernumber,
                ord_customername: order.ord_customername,
                ord_customeremail: order.ord_customeremail,
                ord_contactphone: order.ord_contactphone,
                ords_uuid: order.ords_uuid,
                ord_date: order.ord_date,
                cou_uuid: order.cou_uuid,
                ord_couponcode: order.ord_couponcode,
                ord_discountamount: order.ord_discountamount,
                ord_subtotal: order.ord_subtotal,
                ord_shippingcost: order.ord_shippingcost,
                ord_tax: order.ord_tax,
                ord_total: order.ord_total,
                ord_customernotes: order.ord_customernotes,
                ord_trackingnumber: order.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(order.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(order.ord_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getOrders (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getOrderDetail(cmp_uuid: string, ord_uuid: string) {
        try {
            const order = await this.orderRepository.findOrderById(cmp_uuid, ord_uuid);
            if(!order) {
                throw new Error(`No hay orden con el Id: ${cmp_uuid}, ${ord_uuid}`);
            }
            return {
                cmp_uuid: order.cmp_uuid,
                ord_uuid: order.ord_uuid,
                usr_uuid: order.usr_uuid,
                cus_uuid: order.cus_uuid,
                adr_uuid: order.adr_uuid,
                ord_ordernumber: order.ord_ordernumber,
                ord_customername: order.ord_customername,
                ord_customeremail: order.ord_customeremail,
                ord_contactphone: order.ord_contactphone,
                ords_uuid: order.ords_uuid,
                ord_date: order.ord_date,
                cou_uuid: order.cou_uuid,
                ord_couponcode: order.ord_couponcode,
                ord_discountamount: order.ord_discountamount,
                ord_subtotal: order.ord_subtotal,
                ord_shippingcost: order.ord_shippingcost,
                ord_tax: order.ord_tax,
                ord_total: order.ord_total,
                ord_customernotes: order.ord_customernotes,
                ord_trackingnumber: order.ord_trackingnumber,
                orderDetails: order.orderDetails,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(order.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(order.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getOrderDetail (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createOrder({ cmp_uuid, usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_customername, ord_customeremail, ord_contactphone, ords_uuid, ord_date, cou_uuid, ord_couponcode, ord_discountamount, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber, orderDetails } : { cmp_uuid: string, usr_uuid: string, cus_uuid: string, adr_uuid: string, ord_ordernumber: number, ord_customername: string, ord_customeremail: string, ord_contactphone: string, ords_uuid: string, ord_date: Date, cou_uuid?: string | null, ord_couponcode?: string | null, ord_discountamount?: number, ord_subtotal: number, ord_shippingcost: number, ord_tax: number, ord_total: number, ord_customernotes: string, ord_trackingnumber: string, orderDetails: OrderDetailEntity[] }) {
        const transaction = await sequelize.transaction();
        try {
            const orderValue = new OrderValue({ cmp_uuid, ord_uuid: uuid(), usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_customername, ord_customeremail, ord_contactphone, ords_uuid, ord_date, cou_uuid, ord_couponcode, ord_discountamount, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber, orderDetails });
            const orderCreated = await this.orderRepository.createOrder(orderValue, { transaction });
            if(!orderCreated) {
                throw new Error(`No se pudo insertar la orden.`);
            }
            if (orderValue.orderDetails && orderValue.orderDetails.length) {
                const orderDetailsCreated = [];
                for (const orderDetail of orderValue.orderDetails) {
                    orderDetail.ord_uuid = orderCreated.ord_uuid;
                    orderDetail.ordd_uuid = uuid();
                    const orderDetailCreated = await this.orderDetailRepository.createDetailOrder(orderDetail, { transaction });
                    if (!orderDetailCreated) {
                        throw new Error(`No se pudo insertar el detalle de la orden.`);                        
                    }
                    orderDetailsCreated.push(orderDetailCreated);
                }
            }
            
            // Registrar historial de la orden
            const historyValue = new OrderHistoryValue({
                cmp_uuid: orderCreated.cmp_uuid,
                ord_uuid: orderCreated.ord_uuid,
                ords_uuid: orderCreated.ords_uuid,
                usr_uuid: orderCreated.usr_uuid,
                ordh_comment: "Orden registrada inicialmente."
            });
            await this.orderHistoryRepository.createOrderHistory(historyValue, { transaction });

            await transaction.commit();

            return {
                cmp_uuid: orderCreated.cmp_uuid,
                ord_uuid: orderCreated.ord_uuid,
                usr_uuid: orderCreated.usr_uuid,
                cus_uuid: orderCreated.cus_uuid,
                adr_uuid: orderCreated.adr_uuid,
                ord_ordernumber: orderCreated.ord_ordernumber,
                ord_customername: orderCreated.ord_customername,
                ord_customeremail: orderCreated.ord_customeremail,
                ord_contactphone: orderCreated.ord_contactphone,
                ords_uuid: orderCreated.ords_uuid,
                ord_date: orderCreated.ord_date,
                cou_uuid: orderCreated.cou_uuid,
                ord_couponcode: orderCreated.ord_couponcode,
                ord_discountamount: orderCreated.ord_discountamount,
                ord_subtotal: orderCreated.ord_subtotal,
                ord_shippingcost: orderCreated.ord_shippingcost,
                ord_tax: orderCreated.ord_tax,
                ord_total: orderCreated.ord_total,
                ord_customernotes: orderCreated.ord_customernotes,
                ord_trackingnumber: orderCreated.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(orderCreated.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(orderCreated.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            await transaction.rollback();
            console.error('Error en createOrder (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateOrder(cmp_uuid: string, ord_uuid: string, { usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_customername, ord_customeremail, ord_contactphone, ords_uuid, ord_date, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber, orderDetails } : { usr_uuid: string, cus_uuid: string, adr_uuid: string, ord_ordernumber: number, ord_customername: string, ord_customeremail: string, ord_contactphone: string, ords_uuid: string, ord_date: Date, ord_subtotal: number, ord_shippingcost: number, ord_tax: number, ord_total: number, ord_customernotes: string, ord_trackingnumber: string, orderDetails?: OrderDetailEntity[] }) {
        const transaction = await sequelize.transaction();
        try {
            const orderUpdated = await this.orderRepository.updateOrder(cmp_uuid, ord_uuid, { usr_uuid, cus_uuid, adr_uuid, ord_ordernumber, ord_customername, ord_customeremail, ord_contactphone, ords_uuid, ord_date, ord_subtotal, ord_shippingcost, ord_tax, ord_total, ord_customernotes, ord_trackingnumber }, { transaction });
            if(!orderUpdated) {
                throw new Error(`No se pudo actualizar la orden.`);
            }

            // Limpieza de detalles huérfanos
            const existingDetails = await this.orderDetailRepository.getDetailOrders(cmp_uuid, ord_uuid);
            if (existingDetails) {
                const receivedUuids = (orderDetails || [])
                    .map(d => d.ordd_uuid)
                    .filter((id): id is string => !!id);
                for (const existingDetail of existingDetails) {
                    if (existingDetail.ordd_uuid && !receivedUuids.includes(existingDetail.ordd_uuid)) {
                        await this.orderDetailRepository.deleteDetailOrder(cmp_uuid, ord_uuid, existingDetail.ordd_uuid, { transaction });
                    }
                }
            }

            if (orderDetails && orderDetails?.length) {
                const orderDetailsCreated = [];
                for (const orderDetail of orderDetails) {
                    if (!orderDetail.ordd_uuid) {
                        orderDetail.ord_uuid = orderUpdated.ord_uuid;
                        orderDetail.ordd_uuid = uuid();
                        const orderDetailCreated = await this.orderDetailRepository.createDetailOrder(orderDetail, { transaction });
                        if (!orderDetailCreated) {
                            throw new Error(`No se pudo insertar el detalle de la orden.`);
                        }
                        orderDetailsCreated.push(orderDetailCreated);
                    } else {
                        const orderDetailUpdated = await this.orderDetailRepository.updateDetailOrder(orderDetail.cmp_uuid, orderDetail.ord_uuid, orderDetail.ordd_uuid, orderDetail, { transaction });
                        if (!orderDetailUpdated) {
                            throw new Error(`No se pudo actualizar el detalle de la orden.`);
                        }
                        orderDetailsCreated.push(orderDetailUpdated);
                    }
                }
            }
            
            // Registrar historial de la orden
            const historyValue = new OrderHistoryValue({
                cmp_uuid: orderUpdated.cmp_uuid,
                ord_uuid: orderUpdated.ord_uuid,
                ords_uuid: orderUpdated.ords_uuid,
                usr_uuid: orderUpdated.usr_uuid,
                ordh_comment: "Orden modificada."
            });
            await this.orderHistoryRepository.createOrderHistory(historyValue, { transaction });

            await transaction.commit();

            return {
                cmp_uuid: orderUpdated.cmp_uuid,
                ord_uuid: orderUpdated.ord_uuid,
                usr_uuid: orderUpdated.usr_uuid,
                cus_uuid: orderUpdated.cus_uuid,
                adr_uuid: orderUpdated.adr_uuid,
                ord_ordernumber: orderUpdated.ord_ordernumber,
                ord_customername: orderUpdated.ord_customername,
                ord_customeremail: orderUpdated.ord_customeremail,
                ord_contactphone: orderUpdated.ord_contactphone,
                ords_uuid: orderUpdated.ords_uuid,
                ord_date: orderUpdated.ord_date,
                cou_uuid: orderUpdated.cou_uuid,
                ord_couponcode: orderUpdated.ord_couponcode,
                ord_discountamount: orderUpdated.ord_discountamount,
                ord_subtotal: orderUpdated.ord_subtotal,
                ord_shippingcost: orderUpdated.ord_shippingcost,
                ord_tax: orderUpdated.ord_tax,
                ord_total: orderUpdated.ord_total,
                ord_customernotes: orderUpdated.ord_customernotes,
                ord_trackingnumber: orderUpdated.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(orderUpdated.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(orderUpdated.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            await transaction.rollback();
            console.error('Error en updateOrder (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteOrder(cmp_uuid: string, ord_uuid: string) {
        try {
            const orderDeleted = await this.orderRepository.deleteOrder(cmp_uuid, ord_uuid);
            if(!orderDeleted) {
                throw new Error(`No se pudo eliminar la orden.`);
            }
            return {
                cmp_uuid: orderDeleted.cmp_uuid,
                ord_uuid: orderDeleted.ord_uuid,
                usr_uuid: orderDeleted.usr_uuid,
                cus_uuid: orderDeleted.cus_uuid,
                adr_uuid: orderDeleted.adr_uuid,
                ord_ordernumber: orderDeleted.ord_ordernumber,
                ord_customername: orderDeleted.ord_customername,
                ord_customeremail: orderDeleted.ord_customeremail,
                ord_contactphone: orderDeleted.ord_contactphone,
                ords_uuid: orderDeleted.ords_uuid,
                ord_date: orderDeleted.ord_date,
                ord_subtotal: orderDeleted.ord_subtotal,
                ord_shippingcost: orderDeleted.ord_shippingcost,
                ord_tax: orderDeleted.ord_tax,
                ord_total: orderDeleted.ord_total,
                ord_customernotes: orderDeleted.ord_customernotes,
                ord_trackingnumber: orderDeleted.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(orderDeleted.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(orderDeleted.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteOrder (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getOrdersByCustomer(cus_uuid: string) {
        try {
            const order = await this.orderRepository.getOrdersByCustomer(cus_uuid);
            if(!order) {
                throw new Error('No hay ordenes.');
            }
            return order.map(order => ({
                cmp_uuid: order.cmp_uuid,
                ord_uuid: order.ord_uuid,
                usr_uuid: order.usr_uuid,
                cus_uuid: order.cus_uuid,
                adr_uuid: order.adr_uuid,
                ord_ordernumber: order.ord_ordernumber,
                ord_customername: order.ord_customername,
                ord_customeremail: order.ord_customeremail,
                ord_contactphone: order.ord_contactphone,
                ords_uuid: order.ords_uuid,
                ord_date: order.ord_date,
                cou_uuid: order.cou_uuid,
                ord_couponcode: order.ord_couponcode,
                ord_discountamount: order.ord_discountamount,
                ord_subtotal: order.ord_subtotal,
                ord_shippingcost: order.ord_shippingcost,
                ord_tax: order.ord_tax,
                ord_total: order.ord_total,
                ord_customernotes: order.ord_customernotes,
                ord_trackingnumber: order.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(order.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(order.ord_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getOrders (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async changeOrderStatus(cmp_uuid: string, ord_uuid: string, ords_uuid: string, usr_uuid?: string, odh_comment?: string) {
        const transaction = await sequelize.transaction();
        try {
            // Obtener el estado actual de la orden y sus detalles
            const order = await this.orderRepository.findOrderById(cmp_uuid, ord_uuid);
            if (!order) {
                throw new Error(`No se encontró la orden con Id: ${ord_uuid}`);
            }

            const oldStatus = order.ords_uuid;

            const orderUpdated = await this.orderRepository.changeOrderStatus(cmp_uuid, ord_uuid, ords_uuid, { transaction });
            if(!orderUpdated) {
                throw new Error(`No se pudo cambiar el estado de la orden.`);
            }

            // Determinar un usr_uuid válido para cumplir con las restricciones NOT NULL de la base de datos
            let finalUsrUuid = usr_uuid || orderUpdated.usr_uuid;
            let validUser = null;
            if (finalUsrUuid) {
                validUser = await SequelizeUser.findOne({ where: { usr_uuid: finalUsrUuid }, transaction });
            }

            if (!validUser) {
                const defaultUser = await SequelizeUser.findOne({ transaction });
                if (defaultUser) {
                    finalUsrUuid = defaultUser.usr_uuid;
                } else {
                    throw new Error("No se encontró ningún usuario registrado en el sistema para asociar el historial y movimiento de stock.");
                }
            } else {
                finalUsrUuid = validUser.usr_uuid;
            }

            // Registrar historial de la orden
            const historyValue = new OrderHistoryValue({
                cmp_uuid: orderUpdated.cmp_uuid,
                ord_uuid: orderUpdated.ord_uuid,
                ords_uuid: orderUpdated.ords_uuid,
                usr_uuid: finalUsrUuid,
                ordh_comment: odh_comment || `Estado de orden cambiado a: ${ords_uuid}`
            });
            await this.orderHistoryRepository.createOrderHistory(historyValue, { transaction });

            // LOGICA DE STOCK WMS Y MOVIMIENTOS
            // Caso A: Descontar stock al pasar a SHIPPED o DELIVERED
            const isTargetShippedOrDelivered = (ords_uuid === 'SHIPPED' || ords_uuid === 'DELIVERED');
            const wasShippedOrDelivered = (oldStatus === 'SHIPPED' || oldStatus === 'DELIVERED');

            if (isTargetShippedOrDelivered && !wasShippedOrDelivered) {
                // Descontar existencias
                if (Array.isArray(order.orderDetails)) {
                    for (const item of order.orderDetails) {
                        const neededQuantity = item.ordd_quantity;
                        if (neededQuantity <= 0) continue;
                        if (!item.prov_uuid) continue;

                        // Buscar ubicaciones de stock de esta variante ordenadas de mayor a menor cantidad
                        const stockEntries = await SequelizeInventoryStock.findAll({
                            where: { cmp_uuid, prov_uuid: item.prov_uuid },
                            order: [['ist_quanty', 'DESC']],
                            transaction
                        });

                        let remainingToDeduct = neededQuantity;

                        for (const entry of stockEntries) {
                            if (remainingToDeduct <= 0) break;

                            const currentQty = entry.ist_quanty || 0;
                            let deductFromThisBin = 0;

                            if (currentQty >= remainingToDeduct) {
                                deductFromThisBin = remainingToDeduct;
                            } else {
                                deductFromThisBin = currentQty > 0 ? currentQty : 0;
                            }

                            // Si es la última ubicación y no se ha cubierto el total, forzar el descuento total en esta ubicación (para ir a negativo si se permite backorders)
                            const isLastEntry = (entry === stockEntries[stockEntries.length - 1]);
                            if (isLastEntry && deductFromThisBin < remainingToDeduct) {
                                deductFromThisBin = remainingToDeduct;
                            }

                            if (deductFromThisBin > 0) {
                                const newQty = currentQty - deductFromThisBin;
                                
                                await SequelizeInventoryStock.update({
                                    ist_quanty: newQty
                                }, {
                                    where: {
                                        cmp_uuid,
                                        pro_uuid: entry.pro_uuid,
                                        prov_uuid: entry.prov_uuid,
                                        war_uuid: entry.war_uuid,
                                        warl_uuid: entry.warl_uuid
                                    },
                                    transaction
                                });

                                await SequelizeStockMovement.create({
                                    cmp_uuid,
                                    pro_uuid: entry.pro_uuid,
                                    prov_uuid: entry.prov_uuid,
                                    smo_uuid: uuid(),
                                    ord_uuid: ord_uuid,
                                    usr_uuid: finalUsrUuid,
                                    tsmo_uuid: 'OUT',
                                    smo_quantity: -deductFromThisBin,
                                    smo_previousstock: currentQty,
                                    smo_currentstock: newQty,
                                    smo_reason: `Despacho de Pedido #${order.ord_ordernumber}`,
                                    smo_createdat: new Date(),
                                    smo_updatedat: new Date()
                                }, { transaction });

                                remainingToDeduct -= deductFromThisBin;
                            }
                        }

                        // Si no había registros de stock previos en WMS para esta variante, crear uno por defecto en la primera ubicación activa
                        if (remainingToDeduct > 0 && stockEntries.length === 0) {
                            const defaultLocation = await SequelizeWarehouseLocation.findOne({
                                where: { cmp_uuid, warl_active: true },
                                transaction
                            });

                            if (defaultLocation) {
                                const newQty = -remainingToDeduct;
                                await SequelizeInventoryStock.create({
                                    cmp_uuid,
                                    pro_uuid: item.pro_uuid || "",
                                    prov_uuid: item.prov_uuid,
                                    war_uuid: defaultLocation.war_uuid,
                                    warl_uuid: defaultLocation.warl_uuid,
                                    ist_quanty: newQty,
                                    ist_quantyreserved: 0,
                                    ist_createdat: new Date(),
                                    ist_updatedat: new Date()
                                }, { transaction });

                                await SequelizeStockMovement.create({
                                    cmp_uuid,
                                    pro_uuid: item.pro_uuid || "",
                                    prov_uuid: item.prov_uuid,
                                    smo_uuid: uuid(),
                                    ord_uuid: ord_uuid,
                                    usr_uuid: finalUsrUuid,
                                    tsmo_uuid: 'OUT',
                                    smo_quantity: -remainingToDeduct,
                                    smo_previousstock: 0,
                                    smo_currentstock: newQty,
                                    smo_reason: `Despacho de Pedido #${order.ord_ordernumber} (Sin stock previo)`,
                                    smo_createdat: new Date(),
                                    smo_updatedat: new Date()
                                }, { transaction });
                            }
                        }

                        // Actualizar stock global de la variante
                        const variation = await SequelizeProductVariation.findOne({
                            where: { cmp_uuid, prov_uuid: item.prov_uuid },
                            transaction
                        });
                        if (variation) {
                            const newVariationStock = (variation.prov_stock || 0) - neededQuantity;
                            await SequelizeProductVariation.update({
                                prov_stock: newVariationStock
                            }, {
                                where: { cmp_uuid, prov_uuid: item.prov_uuid },
                                transaction
                            });
                        }
                    }
                }
            }

            // Caso B: Devolver stock si se cancela una orden ya despachada/entregada
            const isTargetCancelled = (ords_uuid === 'CANCELLED');
            if (isTargetCancelled && wasShippedOrDelivered) {
                if (Array.isArray(order.orderDetails)) {
                    for (const item of order.orderDetails) {
                        const restoreQuantity = item.ordd_quantity;
                        if (restoreQuantity <= 0) continue;
                        if (!item.prov_uuid) continue;

                        // Buscar si existe alguna ubicación de stock de esta variante en WMS
                        const stockEntries = await SequelizeInventoryStock.findAll({
                            where: { cmp_uuid, prov_uuid: item.prov_uuid },
                            transaction
                        });

                        if (stockEntries.length > 0) {
                            // Devolver a la primera ubicación disponible
                            const entry = stockEntries[0];
                            const currentQty = entry.ist_quanty || 0;
                            const newQty = currentQty + restoreQuantity;

                            await SequelizeInventoryStock.update({
                                ist_quanty: newQty
                            }, {
                                where: {
                                    cmp_uuid,
                                    pro_uuid: entry.pro_uuid,
                                    prov_uuid: entry.prov_uuid,
                                    war_uuid: entry.war_uuid,
                                    warl_uuid: entry.warl_uuid
                                },
                                transaction
                            });

                            await SequelizeStockMovement.create({
                                cmp_uuid,
                                pro_uuid: entry.pro_uuid,
                                prov_uuid: entry.prov_uuid,
                                smo_uuid: uuid(),
                                ord_uuid: ord_uuid,
                                usr_uuid: finalUsrUuid,
                                tsmo_uuid: 'IN',
                                smo_quantity: restoreQuantity,
                                smo_previousstock: currentQty,
                                smo_currentstock: newQty,
                                smo_reason: `Cancelación de Pedido #${order.ord_ordernumber}`,
                                smo_createdat: new Date(),
                                smo_updatedat: new Date()
                            }, { transaction });
                        } else {
                            // Si no tiene ubicación de stock, buscar una ubicación de depósito por defecto activa
                            const defaultLocation = await SequelizeWarehouseLocation.findOne({
                                where: { cmp_uuid, warl_active: true },
                                transaction
                            });

                            if (defaultLocation) {
                                await SequelizeInventoryStock.create({
                                    cmp_uuid,
                                    pro_uuid: item.pro_uuid || "",
                                    prov_uuid: item.prov_uuid,
                                    war_uuid: defaultLocation.war_uuid,
                                    warl_uuid: defaultLocation.warl_uuid,
                                    ist_quanty: restoreQuantity,
                                    ist_quantyreserved: 0,
                                    ist_createdat: new Date(),
                                    ist_updatedat: new Date()
                                }, { transaction });

                                await SequelizeStockMovement.create({
                                    cmp_uuid,
                                    pro_uuid: item.pro_uuid || "",
                                    prov_uuid: item.prov_uuid,
                                    smo_uuid: uuid(),
                                    ord_uuid: ord_uuid,
                                    usr_uuid: finalUsrUuid,
                                    tsmo_uuid: 'IN',
                                    smo_quantity: restoreQuantity,
                                    smo_previousstock: 0,
                                    smo_currentstock: restoreQuantity,
                                    smo_reason: `Cancelación de Pedido #${order.ord_ordernumber} (Inicialización)`,
                                    smo_createdat: new Date(),
                                    smo_updatedat: new Date()
                                }, { transaction });
                            }
                        }

                        // Devolver al stock global de la variante
                        const variation = await SequelizeProductVariation.findOne({
                            where: { cmp_uuid, prov_uuid: item.prov_uuid },
                            transaction
                        });
                        if (variation) {
                            const newVariationStock = (variation.prov_stock || 0) + restoreQuantity;
                            await SequelizeProductVariation.update({
                                prov_stock: newVariationStock
                            }, {
                                where: { cmp_uuid, prov_uuid: item.prov_uuid },
                                transaction
                            });
                        }
                    }
                }
            }

            await transaction.commit();

            return {
                cmp_uuid: orderUpdated.cmp_uuid,
                ord_uuid: orderUpdated.ord_uuid,
                usr_uuid: orderUpdated.usr_uuid,
                cus_uuid: orderUpdated.cus_uuid,
                adr_uuid: orderUpdated.adr_uuid,
                ord_ordernumber: orderUpdated.ord_ordernumber,
                ord_customername: orderUpdated.ord_customername,
                ord_customeremail: orderUpdated.ord_customeremail,
                ord_contactphone: orderUpdated.ord_contactphone,
                ords_uuid: orderUpdated.ords_uuid,
                ord_date: orderUpdated.ord_date,
                cou_uuid: orderUpdated.cou_uuid,
                ord_couponcode: orderUpdated.ord_couponcode,
                ord_discountamount: orderUpdated.ord_discountamount,
                ord_subtotal: orderUpdated.ord_subtotal,
                ord_shippingcost: orderUpdated.ord_shippingcost,
                ord_tax: orderUpdated.ord_tax,
                ord_total: orderUpdated.ord_total,
                ord_customernotes: orderUpdated.ord_customernotes,
                ord_trackingnumber: orderUpdated.ord_trackingnumber,
                ord_createdat: TimezoneConverter.toIsoStringInTimezone(orderUpdated.ord_createdat, 'America/Buenos_Aires'),
                ord_updatedat: TimezoneConverter.toIsoStringInTimezone(orderUpdated.ord_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            await transaction.rollback();
            console.error('Error en changeOrderStatus (use case):', error.message);
            throw error;
        }
    }

}