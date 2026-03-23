import { Request, Response } from "express";
import { CategoryUseCase } from "../../../application/category/category-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CategoryController {
    constructor(private categoryUseCase: CategoryUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar las categorias.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const category = await this.categoryUseCase.getCategories(cmp_uuid, itm_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Categorias retornadas.',
                    ...paginator(category, page, perPage)
                });
            } else {
                const category = await this.categoryUseCase.getCategories(cmp_uuid, itm_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Categorias retornadas.',
                    data: category
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
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cat_uuid = req.params.cat_uuid;
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
            if(!cat_uuid || cat_uuid.toLowerCase() === 'null' || cat_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la categoria.',
                    error: 'Debe proporcionar un Id de categoria.'
                });
            }
            const category = await this.categoryUseCase.getDetailCategory(`${cmp_uuid}`,`${itm_uuid}`,`${cat_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Categoria retornada.',
                data: category
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
            const cmp_uuid = body.cmp_uuid;
            const itm_uuid = body.itm_uuid;
            const cat_uuid = body.cat_uuid;
            const cat_name = body.cat_name;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la categoria.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!itm_uuid || itm_uuid.toLowerCase() === 'null' || itm_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la categoria.',
                    error: 'Debe proporcionar un Id de item.'
                });
            }
            if(!cat_uuid || cat_uuid.toLowerCase() === 'null' || cat_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la categoria.',
                    error: 'Debe proporcionar un Id de categoria.'
                });
            }
            if(!cat_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la categoria.',
                    error: 'Debe proporcionar un Nombre para la categoria.'
                })
            };
            const categoryByName = await this.categoryUseCase.findCategoryByName(cmp_uuid, itm_uuid, cat_name);
            if(categoryByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la categoria.',
                    error: `El nombre ${cat_name} de categoria ya existe.`
                });
            }
            const category = await this.categoryUseCase.createCategory(body)
            return res.status(200).json({
                success: true,
                message: 'Categoria insertada.',
                data: category
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
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cat_uuid = req.params.cat_uuid;
            const update = req.body;
            const category = await this.categoryUseCase.updateCategory(cmp_uuid, itm_uuid, cat_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Categoria actualizada.',
                data: category
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
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.itm_uuid;
            const cat_uuid = req.params.cat_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la categoria.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!itm_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la categoria.',
                    error: 'Debe proporcionar un Id de item.'
                });
            };
            if(!cat_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la categoria.',
                    error: 'Debe proporcionar un Id de categoria.'
                });
            };
            const category = await this.categoryUseCase.deleteCategory(cmp_uuid, itm_uuid, cat_uuid)
            return res.status(200).json({
                success: true,
                message: 'Categoria eliminada.',
                data: category
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