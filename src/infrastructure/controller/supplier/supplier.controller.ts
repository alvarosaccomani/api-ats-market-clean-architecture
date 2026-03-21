import { Request, Response } from "express";
import { SupplierUseCase } from "../../../application/supplier/supplier-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class SupplierController {
    constructor(private supplierUseCase: SupplierUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
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
                const suppliers = await this.supplierUseCase.getSuppliers(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Proveedores retornados.',
                    ...paginator(suppliers, page, perPage)
                });
            } else {
                const suppliers = await this.supplierUseCase.getSuppliers(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Proveedores retornados.',
                    data: suppliers
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los proveedores.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const itm_uuid = req.params.sup_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el proveedor.',
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
            const supplier = await this.supplierUseCase.getDetailSupplier(`${cmp_uuid}`,`${itm_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Proveedor retornado.',
                data: supplier
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const sup_uuid = body.sup_uuid;
            const sup_fullname = body.sup_fullname;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el proveedor.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!sup_uuid || sup_uuid.toLowerCase() === 'null' || sup_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            }
            if(!sup_fullname) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el proveedor.',
                    error: 'Debe proporcionar un Nombre para el proveedor.'
                })
            };
            const supplierByName = await this.supplierUseCase.findSupplierByName(cmp_uuid, sup_uuid, sup_fullname);
            if(supplierByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el proveedor.',
                    error: `El nombre ${sup_fullname} de proveedor ya existe.`
                });
            }
            const supplier = await this.supplierUseCase.createSupplier(body)
            return res.status(200).json({
                success: true,
                message: 'Proveedor insertado.',
                data: supplier
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const sup_uuid = req.params.sup_uuid;
            const update = req.body;
            const supplier = await this.supplierUseCase.updateSupplier(cmp_uuid, sup_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Proveedor actualizado.',
                data: supplier
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const sup_uuid = req.params.sup_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el proveedor.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!sup_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            };
            const supplier = await this.supplierUseCase.deleteSupplier(cmp_uuid, sup_uuid)
            return res.status(200).json({
                success: true,
                message: 'Proveedor eliminado.',
                data: supplier
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}