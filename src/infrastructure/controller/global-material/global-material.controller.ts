import { Request, Response } from "express";
import { GlobalMaterialUseCase } from "../../../application/global-material/global-material-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class GlobalMaterialController {
    constructor(private globalMaterialUseCase: GlobalMaterialUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const gmat_uuid = req.params.gmat_uuid; 
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const globalMaterials = await this.globalMaterialUseCase.getGlobalMaterials()
                return res.status(200).send({
                    success: true,
                    message: 'Materiales retornados.',
                    ...paginator(globalMaterials, page, perPage)
                });
            } else {
                const globalMaterials = await this.globalMaterialUseCase.getGlobalMaterials()
                return res.status(200).send({
                    success: true,
                    message: 'Materiales retornados.',
                    data: globalMaterials
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los materiales.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const gmat_uuid = req.params.gmat_uuid;
            if(!gmat_uuid || gmat_uuid.toLowerCase() === 'null' || gmat_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el material.',
                    error: 'Debe proporcionar un Id de material.'
                });
            }
            const globalMaterial = await this.globalMaterialUseCase.getDetailGlobalMaterial(gmat_uuid)
            return res.status(200).send({
                success: true,
                message: 'Material retornado.',
                data: globalMaterial
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el material.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const gmat_uuid = body.gmat_uuid;
            const gmat_name = body.gmat_name;
            if(!gmat_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el material.',
                    error: 'Debe proporcionar un Nombre para el material.'
                })
            };
            const itemByName = await this.globalMaterialUseCase.findGlobalMaterialByName(gmat_name);
            if(itemByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el material.',
                    error: `El nombre ${gmat_name} de material ya existe.`
                });
            }
            const globalMaterial = await this.globalMaterialUseCase.createGlobalMaterial(body)
            return res.status(200).json({
                success: true,
                message: 'Material insertado.',
                data: globalMaterial
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el material.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const gmat_uuid = req.params.gmat_uuid;
            const update = req.body;
            const globalMaterial = await this.globalMaterialUseCase.updateGlobalMaterial(gmat_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Material actualizado.',
                data: globalMaterial
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el material.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const gmat_uuid = req.params.gmat_uuid;
            if(!gmat_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el material.',
                    error: 'Debe proporcionar un Id de material.'
                });
            };
            const globalMaterial = await this.globalMaterialUseCase.deleteGlobalMaterial(gmat_uuid)
            return res.status(200).json({
                success: true,
                message: 'Material eliminado.',
                data: globalMaterial
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el material.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}