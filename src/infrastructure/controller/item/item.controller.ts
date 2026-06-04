import { Request, Response } from "express";
import { ItemUseCase } from "../../../application/item/item-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ItemController {
    constructor(private itemUseCase: ItemUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid; 
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los items.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const item = await this.itemUseCase.getItems(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Items retornados.',
                    ...paginator(item, page, perPage)
                });
            } else {
                const item = await this.itemUseCase.getItems(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Items retornados.',
                    data: item
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
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el item.',
                    error: 'Debe proporcionar un Id de item.'
                });
            }
            const item = await this.itemUseCase.getDetailItem(`${cmp_uuid}`,`${itm_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Item retornado.',
                data: item
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
            const cmp_uuid = body.cmp_uuid;
            const itm_name = body.itm_name;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el item.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!itm_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el item.',
                    error: 'Debe proporcionar un Nombre para el item.'
                })
            };
            const itemByName = await this.itemUseCase.findItemByName(cmp_uuid, itm_name);
            if(itemByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el item.',
                    error: `El nombre ${itm_name} de item ya existe.`
                });
            }
            const item = await this.itemUseCase.createItem(body)
            return res.status(200).json({
                success: true,
                message: 'Item insertado.',
                data: item
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
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const update = req.body;
            const item = await this.itemUseCase.updateItem(cmp_uuid, itm_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Item actualizado.',
                data: item
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
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el item.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!itm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el item.',
                    error: 'Debe proporcionar un Id de item.'
                });
            };
            const item = await this.itemUseCase.deleteItem(cmp_uuid, itm_uuid)
            return res.status(200).json({
                success: true,
                message: 'Item eliminado.',
                data: item
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