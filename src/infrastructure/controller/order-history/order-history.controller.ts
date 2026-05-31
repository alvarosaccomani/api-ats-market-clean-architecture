import { Request, Response } from "express";
import { OrderHistoryUseCase } from "../../../application/order-history/order-history-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class OrderHistoryController {
    constructor(private orderHistoryUseCase: OrderHistoryUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const ord_uuid = req.params.ord_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!ord_uuid || ord_uuid.toLowerCase() === 'null' || ord_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta ord_uuid.' });
            }

            const histories = await this.orderHistoryUseCase.getOrderHistories(cmp_uuid, ord_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Historial de orden retornado con paginación.',
                    ...paginator(histories, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Historial de orden retornado.',
                    data: histories
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - order-history):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el historial de la orden.',
                error: error.message,
            });
        }
    }
}
