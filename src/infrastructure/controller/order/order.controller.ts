import { Request, Response } from "express";
import { OrderUseCase } from "../../../application/order/order-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class OrderController {
    constructor(private orderUseCase: OrderUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getOrdersByCustomer = this.getOrdersByCustomer.bind(this);
        this.changeOrderStatusCtrl = this.changeOrderStatusCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las ordenes.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const orders = await this.orderUseCase.getOrders(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Ordenes retornadas.',
                    ...paginator(orders, page, perPage)
                });
            } else {
                const orders = await this.orderUseCase.getOrders(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Ordenes retornadas.',
                    data: orders
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las ordenes.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const ord_uuid = req.params.ord_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la orden.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!ord_uuid || ord_uuid.toLowerCase() === 'null' || ord_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la orden.',
                    error: 'Debe proporcionar un Id de orden.'
                });
            }
            const order = await this.orderUseCase.getOrderDetail(`${cmp_uuid}`,`${ord_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Orden retornada.',
                data: order
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la orden.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la orden.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            const order = await this.orderUseCase.createOrder(body)
            return res.status(200).json({
                success: true,
                message: 'Orden insertada.',
                data: order
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la orden.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const ord_uuid = req.params.ord_uuid;
            const update = req.body;
            const order = await this.orderUseCase.updateOrder(cmp_uuid, ord_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Orden actualizada.',
                data: order
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la categoria.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const ord_uuid = req.params.ord_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la orden.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!ord_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la orden.',
                    error: 'Debe proporcionar un Id de orden.'
                });
            };
            const order = await this.orderUseCase.deleteOrder(cmp_uuid, ord_uuid)
            return res.status(200).json({
                success: true,
                message: 'Orden eliminada.',
                data: order
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la orden.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getOrdersByCustomer(req: Request, res: Response) {
        try {
            const cus_uuid = req.params.cus_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if(!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las ordenes.',
                    error: 'Debe proporcionar un Id de cliente.'
                });
            }
            if (page && perPage) {
                const orders = await this.orderUseCase.getOrdersByCustomer(cus_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Ordenes retornadas.',
                    ...paginator(orders, page, perPage)
                });
            } else {
                const orders = await this.orderUseCase.getOrdersByCustomer(cus_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Ordenes retornadas.',
                    data: orders
                });
            }
        } catch (error: any) {
            console.error('Error en getOrdersByCustomer (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las ordenes.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async changeOrderStatusCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const ord_uuid = req.params.ord_uuid;
            const ords_uuid = req.body.ords_uuid;

            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if(!ord_uuid || ord_uuid.toLowerCase() === 'null' || ord_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta ord_uuid.' });
            }
            if(!ords_uuid) {
                return res.status(400).json({ success: false, message: 'Falta ords_uuid en el cuerpo de la petición.' });
            }

            const usr_uuid = req.body.usr_uuid;
            const odh_comment = req.body.ordh_comment || req.body.odh_comment;

            const order = await this.orderUseCase.changeOrderStatus(cmp_uuid, ord_uuid, ords_uuid, usr_uuid, odh_comment);
            return res.status(200).json({
                success: true,
                message: 'Estado de orden cambiado.',
                data: order
            });
        } catch (error: any) {
            console.error('Error en changeOrderStatusCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo cambiar el estado de la orden.',
                error: error.message,
            });
        }
    }
}