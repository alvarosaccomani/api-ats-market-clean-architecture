import { Request, Response } from "express";
import { WarehouseLocationUseCase } from "../../../application/warehouse-location/warehouse-location-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class WarehouseLocationController {
    constructor(private warehouseLocationUseCase: WarehouseLocationUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.insertBatchCtrl = this.insertBatchCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const war_uuid = req.params.war_uuid; // optional param
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las ubicaciones de almacén.',
                    error: 'Debe proporcionar un Id de compañía.'
                });
            }

            const locations = await this.warehouseLocationUseCase.getWarehouseLocations(cmp_uuid, war_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Ubicaciones de almacén retornadas con paginación.',
                    ...paginator(locations, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Ubicaciones de almacén retornadas.',
                    data: locations
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - warehouse-location):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las ubicaciones de almacén.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const war_uuid = req.params.war_uuid;
            const warl_uuid = req.params.warl_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }
            if (!warl_uuid || warl_uuid.toLowerCase() === 'null' || warl_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta warl_uuid.' });
            }

            const location = await this.warehouseLocationUseCase.findWarehouseLocationById(cmp_uuid, war_uuid, warl_uuid);
            return res.status(200).send({
                success: true,
                message: 'Ubicación de almacén retornada.',
                data: location
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller - warehouse-location):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la ubicación de almacén.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const war_uuid = body.war_uuid;
            if (!cmp_uuid) {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!war_uuid) {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }

            const location = await this.warehouseLocationUseCase.createWarehouseLocation(body);
            return res.status(200).json({
                success: true,
                message: 'Ubicación de almacén registrada.',
                data: location
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller - warehouse-location):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar la ubicación de almacén.',
                error: error.message,
            });
        }
    }

    public async insertBatchCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const war_uuid = body.war_uuid;
            const locations = body.locations;

            if (!cmp_uuid) {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!war_uuid) {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }
            if (!locations || !Array.isArray(locations)) {
                return res.status(400).json({ success: false, message: 'locations debe ser un arreglo.' });
            }

            const results = await this.warehouseLocationUseCase.createWarehouseLocationsBatch(body);
            return res.status(200).json({
                success: true,
                message: 'Ubicaciones de almacén registradas en lote.',
                data: results
            });
        } catch (error: any) {
            console.error('Error en insertBatchCtrl (controller - warehouse-location):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar las ubicaciones de almacén en lote.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const war_uuid = req.params.war_uuid;
            const warl_uuid = req.params.warl_uuid;
            const update = req.body;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }
            if (!warl_uuid || warl_uuid.toLowerCase() === 'null' || warl_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta warl_uuid.' });
            }

            const location = await this.warehouseLocationUseCase.updateWarehouseLocation(cmp_uuid, war_uuid, warl_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Ubicación de almacén actualizada.',
                data: location
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller - warehouse-location):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la ubicación de almacén.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const war_uuid = req.params.war_uuid;
            const warl_uuid = req.params.warl_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }
            if (!warl_uuid || warl_uuid.toLowerCase() === 'null' || warl_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta warl_uuid.' });
            }

            const location = await this.warehouseLocationUseCase.deleteWarehouseLocation(cmp_uuid, war_uuid, warl_uuid);
            return res.status(200).json({
                success: true,
                message: 'Ubicación de almacén eliminada.',
                data: location
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller - warehouse-location):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la ubicación de almacén.',
                error: error.message,
            });
        }
    }
}
