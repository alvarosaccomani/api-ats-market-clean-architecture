import { Request, Response } from "express";
import { InventoryStockUseCase } from "../../../application/inventory-stock/inventory-stock-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class InventoryStockController {
    constructor(private inventoryStockUseCase: InventoryStockUseCase, private socketAdapter: SocketAdapter) {
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
            const pro_uuid = req.params.pro_uuid || (req.query.pro_uuid as string);
            const prov_uuid = req.params.prov_uuid || (req.query.prov_uuid as string);
            const war_uuid = req.params.war_uuid || (req.query.war_uuid as string);
            const warl_uuid = req.params.warl_uuid || (req.query.warl_uuid as string);
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los registros de stock de inventario.',
                    error: 'Debe proporcionar un Id de compañía.'
                });
            }

            const stocks = await this.inventoryStockUseCase.getInventoryStocks(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Registros de stock de inventario retornados con paginación.',
                    ...paginator(stocks, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Registros de stock de inventario retornados.',
                    data: stocks
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - inventory-stock):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los registros de stock de inventario.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const war_uuid = req.params.war_uuid;
            const warl_uuid = req.params.warl_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }
            if (!warl_uuid || warl_uuid.toLowerCase() === 'null' || warl_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta warl_uuid.' });
            }

            const stock = await this.inventoryStockUseCase.findInventoryStockById(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid);
            return res.status(200).send({
                success: true,
                message: 'Registro de stock de inventario retornado.',
                data: stock
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller - inventory-stock):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el stock de inventario.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const pro_uuid = body.pro_uuid;
            const prov_uuid = body.prov_uuid;
            const war_uuid = body.war_uuid;
            const warl_uuid = body.warl_uuid;
            if (!cmp_uuid) {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid) {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid) {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!war_uuid) {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }
            if (!warl_uuid) {
                return res.status(400).json({ success: false, message: 'Falta warl_uuid.' });
            }

            const stock = await this.inventoryStockUseCase.createInventoryStock(body);
            return res.status(200).json({
                success: true,
                message: 'Registro de stock de inventario registrado.',
                data: stock
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller - inventory-stock):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar el stock de inventario.',
                error: error.message,
            });
        }
    }

    public async insertBatchCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const locations = body.locations;

            if (!cmp_uuid) {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!locations || !Array.isArray(locations)) {
                return res.status(400).json({ success: false, message: 'locations debe ser un arreglo.' });
            }

            const results = await this.inventoryStockUseCase.createInventoryStocksBatch(body);
            return res.status(200).json({
                success: true,
                message: 'Registros de stock de inventario registrados en lote.',
                data: results
            });
        } catch (error: any) {
            console.error('Error en insertBatchCtrl (controller - inventory-stock):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar los stocks de inventario en lote.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const war_uuid = req.params.war_uuid;
            const warl_uuid = req.params.warl_uuid;
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
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }
            if (!warl_uuid || warl_uuid.toLowerCase() === 'null' || warl_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta warl_uuid.' });
            }

            const stock = await this.inventoryStockUseCase.updateInventoryStock(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Registro de stock de inventario actualizado.',
                data: stock
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller - inventory-stock):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el stock de inventario.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const war_uuid = req.params.war_uuid;
            const warl_uuid = req.params.warl_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!war_uuid || war_uuid.toLowerCase() === 'null' || war_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta war_uuid.' });
            }
            if (!warl_uuid || warl_uuid.toLowerCase() === 'null' || warl_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta warl_uuid.' });
            }

            const stock = await this.inventoryStockUseCase.deleteInventoryStock(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid);
            return res.status(200).json({
                success: true,
                message: 'Registro de stock de inventario eliminado.',
                data: stock
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller - inventory-stock):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el stock de inventario.',
                error: error.message,
            });
        }
    }
}
