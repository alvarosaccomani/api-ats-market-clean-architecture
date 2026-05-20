import { Request, Response } from "express";
import { AddressUseCase } from "../../../application/address/address-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class AddressController {
    constructor(private addressUseCase: AddressUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getAddressesByCompanyCtrl = this.getAddressesByCompanyCtrl.bind(this);
        this.getAddressesByUserCtrl = this.getAddressesByUserCtrl.bind(this);
        this.getAddressesByCustomerCtrl = this.getAddressesByCustomerCtrl.bind(this);
        this.getAddressesBySupplierCtrl = this.getAddressesBySupplierCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const address = await this.addressUseCase.getAddresses()
                return res.status(200).send({
                    success: true,
                    message: 'Direcciones retornadas.',
                    ...paginator(address, page, perPage)
                });
            } else {
                const address = await this.addressUseCase.getAddresses()
                return res.status(200).send({
                    success: true,
                    message: 'Direcciones retornadas.',
                    data: address
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las direcciones.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const adr_uuid  = req.params.adr_uuid;
            if(!adr_uuid || adr_uuid.toLowerCase() === 'null' || adr_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la direccion.',
                    error: 'Debe proporcionar un Id de address.'
                });
            }
            const address = await this.addressUseCase.getDetailAddress(adr_uuid);
            return res.status(200).send({
                success: true,
                message: 'Direccion retornada.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la direccion.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const address = await this.addressUseCase.createAddress(body)
            return res.status(200).json({
                success: true,
                message: 'Direccion insertada.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la direccion.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const adr_uuid = req.params.adr_uuid;
            const update = req.body;
            const address = await this.addressUseCase.updateAddress(adr_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Direccion actualizada.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la direccion.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const adr_uuid = req.params.adr_uuid;
            if(!adr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la direccion.',
                    error: 'Debe proporcionar un Id de address.'
                });
            };
            const address = await this.addressUseCase.deleteAddress(adr_uuid);
            return res.status(200).json({
                success: true,
                message: 'Direccion eliminada.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la direccion.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getAddressesByCompanyCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las direcciones.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            const address = await this.addressUseCase.getAddressesByCompany(cmp_uuid);
            return res.status(200).send({
                success: true,
                message: 'Direcciones retornadas.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en getAddressesByCompanyCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las direcciones.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getAddressesByUserCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            if(!usr_uuid || usr_uuid.toLowerCase() === 'null' || usr_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las direcciones.',
                    error: 'Debe proporcionar un Id de user.'
                });
            }
            const address = await this.addressUseCase.getAddressesByUser(usr_uuid);
            return res.status(200).send({
                success: true,
                message: 'Direcciones retornadas.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en getAddressesByUserCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las direcciones.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getAddressesByCustomerCtrl(req: Request, res: Response) {
        try {
            const cus_uuid = req.params.cus_uuid;
            if(!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las direcciones.',
                    error: 'Debe proporcionar un Id de customer.'
                });
            }
            const address = await this.addressUseCase.getAddressesByCustomer(cus_uuid);
            return res.status(200).send({
                success: true,
                message: 'Direcciones retornadas.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en getAddressesByCustomerCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las direcciones.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getAddressesBySupplierCtrl(req: Request, res: Response) {
        try {
            const sup_uuid = req.params.sup_uuid;
            if(!sup_uuid || sup_uuid.toLowerCase() === 'null' || sup_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar las direcciones.',
                    error: 'Debe proporcionar un Id de supplier.'
                });
            }
            const address = await this.addressUseCase.getAddressesBySupplier(sup_uuid);
            return res.status(200).send({
                success: true,
                message: 'Direcciones retornadas.',
                data: address
            });
        } catch (error: any) {
            console.error('Error en getAddressesBySupplierCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las direcciones.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}