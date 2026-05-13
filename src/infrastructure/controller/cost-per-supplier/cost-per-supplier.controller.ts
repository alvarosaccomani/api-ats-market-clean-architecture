import { Request, Response } from "express";
import { CostPerSupplierUseCase } from "../../../application/cost-per-supplier/cost-per-supplier-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CostPerSupplierController {
    constructor(private costPerSupplierUseCase: CostPerSupplierUseCase, private socketAdapter: SocketAdapter) {
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
            const prov_uuid = req.params.prov_uuid;
            const sup_uuid = req.params.sup_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los costos por proveedor.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const costPerSupplier = await this.costPerSupplierUseCase.getCostsPerSupplier(cmp_uuid, pro_uuid, prov_uuid, sup_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Costos por proveedor retornados.',
                    ...paginator(costPerSupplier, page, perPage)
                });
            } else {
                const costPerSupplier = await this.costPerSupplierUseCase.getCostsPerSupplier(cmp_uuid, pro_uuid, prov_uuid, sup_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Costos por proveedor retornados.',
                    data: costPerSupplier
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los costos por proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const sup_uuid = req.params.sup_uuid;
            const cps_uuid = req.params.cps_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            }
            if(!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            }
            if(!sup_uuid || sup_uuid.toLowerCase() === 'null' || sup_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            }            
            const costPerSupplier = await this.costPerSupplierUseCase.getDetailCostPerSupplier(`${cmp_uuid}`,`${pro_uuid}`,`${prov_uuid}`, `${sup_uuid}`,`${cps_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Costo por proveedor retornado.',
                data: costPerSupplier
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el costo por proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const pro_uuid = body.pro_uuid;
            const prov_uuid = body.prov_uuid;
            const sup_uuid = body.sup_uuid;
            const cps_pricecost = body.cps_pricecost;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            }
            if(!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            }
            if(!sup_uuid || sup_uuid.toLowerCase() === 'null' || sup_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            }
            if(!cps_pricecost) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el costo por proveedor.',
                    error: 'Debe proporcionar un costo para el proveedor.'
                })
            };
            const costPerSupplierExists = await this.costPerSupplierUseCase.getCostsPerSupplier(cmp_uuid, pro_uuid, prov_uuid, sup_uuid);
            if(costPerSupplierExists && costPerSupplierExists.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el costo por proveedor.',
                    error: `Ya existen costos para el proveedor ${prov_uuid} del articulo ${pro_uuid}.`
                });
            }
            const costPerSupplier = await this.costPerSupplierUseCase.createCostPerSupplier(body)
            return res.status(200).json({
                success: true,
                message: 'Costo por proveedor insertado.',
                data: costPerSupplier
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el costo por proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const sup_uuid = req.params.sup_uuid;
            const cps_uuid = req.params.cps_uuid;
            const update = req.body;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            }
            if(!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            }
            if(!sup_uuid || sup_uuid.toLowerCase() === 'null' || sup_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            }
            if(!cps_uuid || cps_uuid.toLowerCase() === 'null' || cps_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de costo por proveedor.'
                });
            }
            if(!update.cps_pricecost) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el costo por proveedor.',
                    error: 'Debe proporcionar un costo para el proveedor.'
                })
            };
            const costPerSupplier = await this.costPerSupplierUseCase.updateCostPerSupplier(cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Costo por proveedor actualizado.',
                data: costPerSupplier
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el costo por proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const sup_uuid = req.params.sup_uuid;
            const cps_uuid = req.params.cps_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de articulo.'
                });
            };
            if(!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            };
            if(!sup_uuid || sup_uuid.toLowerCase() === 'null' || sup_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de proveedor.'
                });
            };
            if(!cps_uuid || cps_uuid.toLowerCase() === 'null' || cps_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el costo por proveedor.',
                    error: 'Debe proporcionar un Id de costo.'
                });
            };
            const costPerSupplier = await this.costPerSupplierUseCase.deleteCostPerSupplier(cmp_uuid, pro_uuid, prov_uuid, sup_uuid, cps_uuid)
            return res.status(200).json({
                success: true,
                message: 'Costo por proveedor eliminado.',
                data: costPerSupplier
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el costo por proveedor.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}