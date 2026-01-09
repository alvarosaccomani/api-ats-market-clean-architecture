import { Request, Response } from "express";
import { ProductUseCase } from "../../../application/product/product-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ProductController {
    constructor(private productUseCase: ProductUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid; 
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
                const product = await this.productUseCase.getProducts(cmp_uuid, pro_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Articulos retornados.',
                    ...paginator(product, page, perPage)
                });
            } else {
                const product = await this.productUseCase.getProducts(cmp_uuid, pro_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Articulos retornados.',
                    data: product
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
            const pro_uuid = req.params.pro_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            }
            const product = await this.productUseCase.getDetailProduct(`${cmp_uuid}`,`${pro_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Articulo retornado.',
                data: product
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
            const pro_uuid = body.pro_uuid;
            const pro_name = body.pro_name;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el articulo.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            }
            if(!pro_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el articulo.',
                    error: 'Debe proporcionar un Nombre para el articulo.'
                })
            };
            const productByName = await this.productUseCase.findProductByName(cmp_uuid, pro_uuid, pro_name);
            if(productByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el articulo.',
                    error: `El nombre ${pro_name} de articulo ya existe.`
                });
            }
            const product = await this.productUseCase.createProduct(body)
            return res.status(200).json({
                success: true,
                message: 'Articulo insertado.',
                data: product
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
            const pro_uuid = req.params.pro_uuid;
            const update = req.body;
            const product = await this.productUseCase.updateProduct(cmp_uuid, pro_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Articulo actualizado.',
                data: product
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
            const pro_uuid = req.params.pro_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el address.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!pro_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el address.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            };
            const product = await this.productUseCase.deleteProduct(cmp_uuid, pro_uuid)
            return res.status(200).json({
                success: true,
                message: 'Product eliminada.',
                data: product
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el product.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}