import { Request, Response } from "express";
import { MaterialUseCase } from "../../../application/material/material-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class MaterialController {
    constructor(private materialUseCase: MaterialUseCase, private socketAdapter: SocketAdapter) {
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
                const material = await this.materialUseCase.getMaterials(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Materiales retornadas.',
                    ...paginator(material, page, perPage)
                });
            } else {
                const material = await this.materialUseCase.getMaterials(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Materiales retornadas.',
                    data: material
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
            const cmp_uuid = req.params.cmp_uuid;
            const mat_uuid = req.params.mat_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el material.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!mat_uuid || mat_uuid.toLowerCase() === 'null' || mat_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el material.',
                    error: 'Debe proporcionar un Id de material.'
                });
            }
            const material = await this.materialUseCase.getDetailMaterial(`${cmp_uuid}`,`${mat_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Material retornado.',
                data: material
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
            const cmp_uuid = body.cmp_uuid;
            const gmat_uuid = body.gmat_uuid;
            const mat_name = body.mat_name;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el material.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!gmat_uuid || gmat_uuid.toLowerCase() === 'null' || gmat_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el material.',
                    error: 'Debe proporcionar un Id de grupo de material.'
                });
            }
            if(!mat_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el material.',
                    error: 'Debe proporcionar un Nombre para el material.'
                })
            };
            const materialByName = await this.materialUseCase.findMaterialByName(cmp_uuid, mat_name);
            if(materialByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el material.',
                    error: `El nombre ${mat_name} de material ya existe.`
                });
            }
            const material = await this.materialUseCase.createMaterial(body)
            return res.status(200).json({
                success: true,
                message: 'Material insertado.',
                data: material
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
            const cmp_uuid = req.params.cmp_uuid;
            const mat_uuid = req.params.mat_uuid;
            const update = req.body;
            const material = await this.materialUseCase.updateMaterial(cmp_uuid, mat_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Material actualizado.',
                data: material
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
            const cmp_uuid = req.params.cmp_uuid;
            const mat_uuid = req.params.mat_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el material.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!mat_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el material.',
                    error: 'Debe proporcionar un Id de material.'
                });
            };
            const material = await this.materialUseCase.deleteMaterial(cmp_uuid, mat_uuid)
            return res.status(200).json({
                success: true,
                message: 'Material eliminado.',
                data: material
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