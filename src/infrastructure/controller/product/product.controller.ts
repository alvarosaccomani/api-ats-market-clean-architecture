import { Request, Response } from "express";
import { ProductUseCase } from "../../../application/product/product-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";
import { SequelizeProductVariation } from "../../model/product-variation/product-variation.model";
import { SequelizeStockMovement } from "../../model/stock-movement/stock-movement.model";
import { v4 as uuid } from "uuid";

export class ProductController {
    constructor(private productUseCase: ProductUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.bulkInsertCtrl = this.bulkInsertCtrl.bind(this);
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
                const product = await this.productUseCase.getProducts(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Articulos retornados.',
                    ...paginator(product, page, perPage)
                });
            } else {
                const product = await this.productUseCase.getProducts(cmp_uuid)
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

    public async bulkInsertCtrl(req: Request, res: Response) {
        try {
            const { products } = req.body;
            console.info(products);
            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos de productos inválidos.',
                    error: 'Debe proporcionar una lista de productos en el campo "products".'
                });
            }

            const results = [];
            for (const item of products) {
                try {
                    let savedProduct;
                    if (item.action === 'update') {
                        savedProduct = await this.productUseCase.updateProduct(item.cmp_uuid, item.pro_uuid, item);

                        // Registrar movimientos de stock para variaciones existentes/nuevas en actualizaciones
                        if (Array.isArray(item.stockMovements) && item.stockMovements.length > 0) {
                            const dbVariations = await SequelizeProductVariation.findAll({
                                where: { pro_uuid: item.pro_uuid }
                            });

                            for (const m of item.stockMovements) {
                                let provUuid = m.prov_uuid;
                                if (!provUuid && m.prov_sku) {
                                    const match = dbVariations.find(x => x.prov_sku.toLowerCase().trim() === m.prov_sku.toLowerCase().trim());
                                    provUuid = match ? match.prov_uuid : null;
                                }

                                if (provUuid) {
                                    await SequelizeStockMovement.create({
                                        cmp_uuid: item.cmp_uuid,
                                        pro_uuid: item.pro_uuid,
                                        prov_uuid: provUuid,
                                        smo_uuid: uuid(),
                                        ord_uuid: undefined,
                                        usr_uuid: undefined,
                                        tsmo_uuid: m.type,
                                        smo_quantity: m.quantity,
                                        smo_previousstock: m.previousStock,
                                        smo_currentstock: m.currentStock,
                                        smo_reason: m.reason || 'Ajuste por importación masiva',
                                        smo_createdat: new Date(),
                                        smo_updatedat: new Date()
                                    });
                                }
                            }
                        }
                    } else {
                        // Generar UUID si no existe
                        if (!item.pro_uuid) {
                            item.pro_uuid = uuid();
                        }
                        savedProduct = await this.productUseCase.createProduct(item);

                        // Consultar variaciones de base de datos para recuperar sus prov_uuids generados
                        const savedVariations = await SequelizeProductVariation.findAll({
                            where: { pro_uuid: item.pro_uuid }
                        });

                        // Registrar stock inicial para variaciones con stock > 0
                        if (Array.isArray(item.productVariations)) {
                            for (const v of item.productVariations) {
                                if (v.prov_stock > 0) {
                                    const match = savedVariations.find(x => x.prov_sku.toLowerCase().trim() === v.prov_sku.toLowerCase().trim());
                                    if (match) {
                                        await SequelizeStockMovement.create({
                                            cmp_uuid: item.cmp_uuid,
                                            pro_uuid: item.pro_uuid,
                                            prov_uuid: match.prov_uuid,
                                            smo_uuid: uuid(),
                                            ord_uuid: undefined,
                                            usr_uuid: undefined,
                                            tsmo_uuid: 'IN',
                                            smo_quantity: v.prov_stock,
                                            smo_previousstock: 0,
                                            smo_currentstock: v.prov_stock,
                                            smo_reason: 'Carga masiva de inventario',
                                            smo_createdat: new Date(),
                                            smo_updatedat: new Date()
                                        });
                                    }
                                }
                            }
                        }
                    }

                    results.push({ success: true, pro_code: item.pro_code, data: savedProduct });
                } catch (err: any) {
                    console.error(`Error procesando producto masivo ${item.pro_code || 'desconocido'}:`, err.message);
                    results.push({ success: false, pro_code: item.pro_code, error: err.message });
                }
            }

            return res.status(200).json({
                success: true,
                message: 'Procesamiento masivo completado.',
                data: results
            });
        } catch (error: any) {
            console.error('Error en bulkInsertCtrl:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Error interno en el procesamiento masivo.',
                error: error.message
            });
        }
    }
}