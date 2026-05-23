import { Request, Response } from "express";
import { TypeStockMovementUseCase } from "../../../application/type-stock-movement/type-stock-movement-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class TypeStockMovementController {
    constructor(private typeStockMovementUseCase: TypeStockMovementUseCase, private socketAdapter: SocketAdapter) {
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

            const movements = await this.typeStockMovementUseCase.getTypeStockMovements();

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Tipos de movimientos de stock retornados con paginación.',
                    ...paginator(movements, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Tipos de movimientos de stock retornados.',
                    data: movements
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - type-stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los tipos de movimientos de stock.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const tsmo_uuid = req.params.tsmo_uuid;
            if (!tsmo_uuid || tsmo_uuid.toLowerCase() === 'null' || tsmo_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el tipo de movimiento.',
                    error: 'Debe proporcionar un Id de tipo de movimiento.'
                });
            }

            const movement = await this.typeStockMovementUseCase.findTypeStockMovementById(tsmo_uuid);
            return res.status(200).send({
                success: true,
                message: 'Tipo de movimiento de stock retornado.',
                data: movement
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller - type-stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el tipo de movimiento de stock.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const movement = await this.typeStockMovementUseCase.createTypeStockMovement(body);
            return res.status(200).json({
                success: true,
                message: 'Tipo de movimiento de stock insertado.',
                data: movement
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller - type-stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el tipo de movimiento de stock.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const tsmo_uuid = req.params.tsmo_uuid;
            const update = req.body;

            if (!tsmo_uuid || tsmo_uuid.toLowerCase() === 'null' || tsmo_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el tipo de movimiento.',
                    error: 'Debe proporcionar un Id de tipo de movimiento.'
                });
            }

            const movement = await this.typeStockMovementUseCase.updateTypeStockMovement(tsmo_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Tipo de movimiento de stock actualizado.',
                data: movement
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller - type-stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el tipo de movimiento de stock.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const tsmo_uuid = req.params.tsmo_uuid;

            if (!tsmo_uuid || tsmo_uuid.toLowerCase() === 'null' || tsmo_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el tipo.',
                    error: 'Debe proporcionar un Id de tipo de movimiento.'
                });
            }

            const movement = await this.typeStockMovementUseCase.deleteTypeStockMovement(tsmo_uuid);
            return res.status(200).json({
                success: true,
                message: 'Tipo de movimiento de stock eliminado.',
                data: movement
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller - type-stock-movement):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el tipo de movimiento de stock.',
                error: error.message,
            });
        }
    }
}
