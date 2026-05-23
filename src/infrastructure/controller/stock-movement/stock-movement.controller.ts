import { Request, Response } from "express";
import { StockMovementUseCase } from "../../../application/stock-movement/stock-movement-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class StockMovementController {
    constructor(private stockMovementUseCase: StockMovementUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los movimientos de stock.',
                    error: 'Debe proporcionar un Id de compañía.'
                });
            }

            const movements = await this.stockMovementUseCase.getStockMovements(cmp_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Movimientos de stock retornados con paginación.',
                    ...paginator(movements, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Movimientos de stock retornados.',
                    data: movements
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los movimientos de stock.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const smo_uuid = req.params.smo_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!smo_uuid || smo_uuid.toLowerCase() === 'null' || smo_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta smo_uuid.' });
            }

            const movement = await this.stockMovementUseCase.findStockMovementById(cmp_uuid, pro_uuid, prov_uuid, smo_uuid);
            return res.status(200).send({
                success: true,
                message: 'Movimiento de stock retornado.',
                data: movement
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller - stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el movimiento de stock.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {

            console.info(body);
            const cmp_uuid = body.cmp_uuid;
            const pro_uuid = body.pro_uuid;
            const prov_uuid = body.prov_uuid;

            if (!cmp_uuid) {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid) {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid) {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }

            const movement = await this.stockMovementUseCase.createStockMovement(body);
            return res.status(200).json({
                success: true,
                message: 'Movimiento de stock registrado.',
                data: movement
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller - stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar el movimiento de stock.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const smo_uuid = req.params.smo_uuid;
            const update = req.body;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!smo_uuid || smo_uuid.toLowerCase() === 'null' || smo_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta smo_uuid.' });
            }

            const movement = await this.stockMovementUseCase.updateStockMovement(cmp_uuid, pro_uuid, prov_uuid, smo_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Movimiento de stock actualizado.',
                data: movement
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller - stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el movimiento de stock.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const smo_uuid = req.params.smo_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!smo_uuid || smo_uuid.toLowerCase() === 'null' || smo_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta smo_uuid.' });
            }

            const movement = await this.stockMovementUseCase.deleteStockMovement(cmp_uuid, pro_uuid, prov_uuid, smo_uuid);
            return res.status(200).json({
                success: true,
                message: 'Movimiento de stock eliminado.',
                data: movement
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller - stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el movimiento de stock.',
                error: error.message,
            });
        }
    }
}
