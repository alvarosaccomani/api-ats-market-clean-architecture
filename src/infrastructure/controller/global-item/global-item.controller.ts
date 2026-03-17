import { Request, Response } from "express";
import { GlobalItemUseCase } from "../../../application/global-item/global-item-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class GlobalItemController {
    constructor(private globalItemUseCase: GlobalItemUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const gitm_uuid = req.params.gitm_uuid; 
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const globalItems = await this.globalItemUseCase.getGlobalItems()
                return res.status(200).send({
                    success: true,
                    message: 'Items retornados.',
                    ...paginator(globalItems, page, perPage)
                });
            } else {
                const globalItems = await this.globalItemUseCase.getGlobalItems()
                return res.status(200).send({
                    success: true,
                    message: 'Items retornados.',
                    data: globalItems
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los items.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const gitm_uuid = req.params.gitm_uuid;
            if(!gitm_uuid || gitm_uuid.toLowerCase() === 'null' || gitm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el item.',
                    error: 'Debe proporcionar un Id de item.'
                });
            }
            const globalItem = await this.globalItemUseCase.getDetailGlobalItem(gitm_uuid)
            return res.status(200).send({
                success: true,
                message: 'Item retornado.',
                data: globalItem
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const gitm_uuid = body.gitm_uuid;
            const gitm_name = body.gitm_name;
            if(!gitm_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el item.',
                    error: 'Debe proporcionar un Nombre para el item.'
                })
            };
            const itemByName = await this.globalItemUseCase.findGlobalItemByName(gitm_name);
            if(itemByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el item.',
                    error: `El nombre ${gitm_name} de item ya existe.`
                });
            }
            const globalItem = await this.globalItemUseCase.createGlobalItem(body)
            return res.status(200).json({
                success: true,
                message: 'Item insertado.',
                data: globalItem
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const gitm_uuid = req.params.gitm_uuid;
            const update = req.body;
            const globalItem = await this.globalItemUseCase.updateGlobalItem(gitm_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Item actualizado.',
                data: globalItem
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const gitm_uuid = req.params.gitm_uuid;
            if(!gitm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el item.',
                    error: 'Debe proporcionar un Id de item.'
                });
            };
            const globalItem = await this.globalItemUseCase.deleteGlobalItem(gitm_uuid)
            return res.status(200).json({
                success: true,
                message: 'Item eliminado.',
                data: globalItem
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el item.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}