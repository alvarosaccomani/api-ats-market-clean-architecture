import { Request, Response } from "express";
import { OrderStatusUseCase } from "../../../application/order-status/order-status-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class OrderStatusController {
    constructor(private orderStatusUseCase: OrderStatusUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            const statuses = await this.orderStatusUseCase.getOrderStatuses();

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Estados de órdenes retornados con paginación.',
                    ...paginator(statuses, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Estados de órdenes retornados.',
                    data: statuses
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - order-status):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los estados de órdenes.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const ords_uuid = req.params.ords_uuid;
            if (!ords_uuid || ords_uuid.toLowerCase() === 'null' || ords_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el estado de orden.',
                    error: 'Debe proporcionar un Id de estado.'
                });
            }

            const status = await this.orderStatusUseCase.findOrderStatusById(ords_uuid);
            return res.status(200).send({
                success: true,
                message: 'Estado de orden retornado.',
                data: status
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller - order-status):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el estado de orden.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const status = await this.orderStatusUseCase.createOrderStatus(body);
            return res.status(200).json({
                success: true,
                message: 'Estado de orden insertado.',
                data: status
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller - order-status):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el estado de orden.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const ords_uuid = req.params.ords_uuid;
            const update = req.body;

            if (!ords_uuid || ords_uuid.toLowerCase() === 'null' || ords_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el estado de orden.',
                    error: 'Debe proporcionar un Id de estado.'
                });
            }

            const status = await this.orderStatusUseCase.updateOrderStatus(ords_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Estado de orden actualizado.',
                data: status
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller - order-status):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el estado de orden.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const ords_uuid = req.params.ords_uuid;

            if (!ords_uuid || ords_uuid.toLowerCase() === 'null' || ords_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el estado.',
                    error: 'Debe proporcionar un Id de estado.'
                });
            }

            const status = await this.orderStatusUseCase.deleteOrderStatus(ords_uuid);
            return res.status(200).json({
                success: true,
                message: 'Estado de orden eliminado.',
                data: status
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller - order-status):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el estado de orden.',
                error: error.message,
            });
        }
    }
}
