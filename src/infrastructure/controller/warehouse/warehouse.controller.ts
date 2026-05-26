import { Request, Response } from "express";
import { WarehouseUseCase } from "../../../application/warehouse/warehouse-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class WarehouseController {
    constructor(private warehouseUseCase: WarehouseUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar los almacenes.',
                    error: 'Debe proporcionar un Id de compañía.'
                });
            }

            const warehouses = await this.warehouseUseCase.getWarehouses(cmp_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Almacenes retornados con paginación.',
                    ...paginator(warehouses, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Almacenes retornados.',
                    data: warehouses
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - warehouse):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los almacenes.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const war_uuid = req.params.war_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }

            const warehouse = await this.warehouseUseCase.findWarehouseById(cmp_uuid, war_uuid);
            return res.status(200).send({
                success: true,
                message: 'Almacén retornado.',
                data: warehouse
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller - warehouse):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el almacén.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            if (!cmp_uuid) {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }

            const warehouse = await this.warehouseUseCase.createWarehouse(body);
            return res.status(200).json({
                success: true,
                message: 'Almacén registrado.',
                data: warehouse
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller - warehouse):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar el almacén.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const war_uuid = req.params.war_uuid;
            const update = req.body;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }

            const warehouse = await this.warehouseUseCase.updateWarehouse(cmp_uuid, war_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Almacén actualizado.',
                data: warehouse
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller - warehouse):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el almacén.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const war_uuid = req.params.war_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }

            const warehouse = await this.warehouseUseCase.deleteWarehouse(cmp_uuid, war_uuid);
            return res.status(200).json({
                success: true,
                message: 'Almacén eliminado.',
                data: warehouse
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller - warehouse):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el almacén.',
                error: error.message,
            });
        }
    }
}
