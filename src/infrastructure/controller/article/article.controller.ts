import { Request, Response } from "express";
import { ArticleUseCase } from "../../../application/article/article-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ArticleController {
    constructor(private articleUseCase: ArticleUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const art_uuid = req.params.art_uuid; 
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los articulos.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const article = await this.articleUseCase.getArticles(cmp_uuid, art_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Articulos retornados.',
                    ...paginator(article, page, perPage)
                });
            } else {
                const article = await this.articleUseCase.getArticles(cmp_uuid, art_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Articulos retornados.',
                    data: article
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los articulos.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const art_uuid = req.params.art_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!art_uuid || art_uuid.toLowerCase() === 'null' || art_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            }
            const article = await this.articleUseCase.getDetailArticle(`${cmp_uuid}`,`${art_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Articulo retornado.',
                data: article
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el articulo.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const art_uuid = body.art_uuid;
            const art_name = body.art_name;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!art_uuid || art_uuid.toLowerCase() === 'null' || art_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            }
            if(!art_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el articulo.',
                    error: 'Debe proporcionar un Nombre para el articulo.'
                })
            };
            const articleByName = await this.articleUseCase.findArticleByName(cmp_uuid, art_uuid, art_name);
            if(articleByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el articulo.',
                    error: `El nombre ${art_name} de articulo ya existe.`
                });
            }
            const article = await this.articleUseCase.createArticle(body)
            return res.status(200).json({
                success: true,
                message: 'Articulo insertado.',
                data: article
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el address.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const art_uuid = req.params.art_uuid;
            const update = req.body;
            const article = await this.articleUseCase.updateArticle(cmp_uuid, art_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Articulo actualizado.',
                data: article
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el articulo.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const art_uuid = req.params.art_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el address.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!art_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el address.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            };
            const article = await this.articleUseCase.deleteArticle(cmp_uuid, art_uuid)
            return res.status(200).json({
                success: true,
                message: 'Article eliminada.',
                data: article
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el article.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}