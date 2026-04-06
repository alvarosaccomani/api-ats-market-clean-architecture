import { Request, Response } from "express";
import { CustomerUseCase } from "../../../application/customer/customer-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CustomerController {
    constructor(private customerUseCase: CustomerUseCase, private socketAdapter: SocketAdapter) {
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
                const customers = await this.customerUseCase.getCustomers()
                return res.status(200).send({
                    success: true,
                    message: 'Clientes retornados.',
                    ...paginator(customers, page, perPage)
                });
            } else {
                const customers = await this.customerUseCase.getCustomers()
                return res.status(200).send({
                    success: true,
                    message: 'Clientes retornados.',
                    data: customers
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los clientes.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const cus_uuid = req.params.cus_uuid;
            if(!usr_uuid || usr_uuid.toLowerCase() === 'null' || usr_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el cliente.',
                    error: 'Debe proporcionar un Id de usuario.'
                });
            }
            if(!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el cliente.',
                    error: 'Debe proporcionar un Id de cliente.'
                });
            }
            const customer = await this.customerUseCase.getDetailCustomer(`${usr_uuid}`,`${cus_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Cliente retornado.',
                data: customer
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el cliente.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cus_uuid = body.cus_uuid;
            const cus_fullname = body.cus_fullname;
            if(!cus_uuid || cus_uuid.toLowerCase() === 'null' || cus_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el cliente.',
                    error: 'Debe proporcionar un Id de cliente.'
                });
            }
            if(!cus_fullname) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el cliente.',
                    error: 'Debe proporcionar un Nombre para el cliente.'
                })
            };
            const customerByName = await this.customerUseCase.findCustomerByName(cus_uuid, cus_fullname);
            if(customerByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el cliente.',
                    error: `El nombre ${cus_fullname} de cliente ya existe.`
                });
            }
            const customer = await this.customerUseCase.createCustomer(body)
            return res.status(200).json({
                success: true,
                message: 'Cliente insertado.',
                data: customer
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el cliente.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const cus_uuid = req.params.cus_uuid;
            const update = req.body;
            const customer = await this.customerUseCase.updateCustomer(usr_uuid, cus_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Cliente actualizado.',
                data: customer
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el cliente.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = req.params.usr_uuid;
            const cus_uuid = req.params.cus_uuid;
            if(!usr_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el cliente.',
                    error: 'Debe proporcionar un Id de usuario.'
                });
            };
            if(!cus_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el cliente.',
                    error: 'Debe proporcionar un Id de cliente.'
                });
            };
            const customer = await this.customerUseCase.deleteCustomer(usr_uuid, cus_uuid)
            return res.status(200).json({
                success: true,
                message: 'Cliente eliminado.',
                data: customer
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el cliente.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}