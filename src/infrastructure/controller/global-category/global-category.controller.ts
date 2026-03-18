import { Request, Response } from "express";
import { GlobalCategoryUseCase } from "../../../application/global-category/global-category-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class GlobalCategoryController {
    constructor(private globalCategoryUseCase: GlobalCategoryUseCase, private socketAdapter: SocketAdapter) {
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
            if (page && perPage) {
                const globalCategories = await this.globalCategoryUseCase.getGlobalCategories()
                return res.status(200).send({
                    success: true,
                    message: 'Categorias retornados.',
                    ...paginator(globalCategories, page, perPage)
                });
            } else {
                const globalCategories = await this.globalCategoryUseCase.getGlobalCategories()
                return res.status(200).send({
                    success: true,
                    message: 'Categorias retornados.',
                    data: globalCategories
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las categorias.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const gitm_uuid = req.params.gitm_uuid;
            const gcat_uuid = req.params.gcat_uuid;
            if(!gitm_uuid || gitm_uuid.toLowerCase() === 'null' || gitm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el item.',
                    error: 'Debe proporcionar un Id de item.'
                });
            }
            if(!gcat_uuid || gcat_uuid.toLowerCase() === 'null' || gcat_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la categoria.',
                    error: 'Debe proporcionar un Id de categoria.'
                });
            }
            const globalCategory = await this.globalCategoryUseCase.getDetailGlobalCategory(gitm_uuid, gcat_uuid)
            return res.status(200).send({
                success: true,
                message: 'Categoria retornada.',
                data: globalCategory
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la categoria.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const gitm_uuid = body.gitm_uuid;
            const gcat_name = body.gcat_name;
            if(!gcat_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la categoria.',
                    error: 'Debe proporcionar un Nombre para la categoria.'
                })
            };
            const categoryByName = await this.globalCategoryUseCase.findGlobalCategoryByName(gitm_uuid, gcat_name);
            if(categoryByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la categoria.',
                    error: `El nombre ${gcat_name} de categoria ya existe.`
                });
            }
            const globalCategory = await this.globalCategoryUseCase.createGlobalCategory(body)
            return res.status(200).json({
                success: true,
                message: 'Categoria insertada.',
                data: globalCategory
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la categoria.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const gitm_uuid = req.params.gitm_uuid;
            const gcat_uuid = req.params.gcat_uuid;
            const update = req.body;
            const globalCategory = await this.globalCategoryUseCase.updateGlobalCategory(gitm_uuid, gcat_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Categoria actualizada.',
                data: globalCategory
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
            const gitm_uuid = req.params.gitm_uuid;
            const gcat_uuid = req.params.gcat_uuid;
            if(!gitm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la categoria.',
                    error: 'Debe proporcionar un Id de item.'
                });
            };
            if(!gcat_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la categoria.',
                    error: 'Debe proporcionar un Id de categoria.'
                });
            };
            const globalCategory = await this.globalCategoryUseCase.deleteGlobalCategory(gitm_uuid, gcat_uuid)
            return res.status(200).json({
                success: true,
                message: 'Categoria eliminada.',
                data: globalCategory
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la categoria.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}