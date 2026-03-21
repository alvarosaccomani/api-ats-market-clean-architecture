import { Request, Response } from "express";
import { PaymentMethodUseCase } from "../../../application/payment-method/payment-method-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class PaymentMethodController {
    constructor(private paymentMethodUseCase: PaymentMethodUseCase, private socketAdapter: SocketAdapter) {
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
                    message: 'No se pudo recuperar los metodos de pago.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if (page && perPage) {
                const paymentMethod = await this.paymentMethodUseCase.getPaymentMethods(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Metodos de pago retornados.',
                    ...paginator(paymentMethod, page, perPage)
                });
            } else {
                const paymentMethod = await this.paymentMethodUseCase.getPaymentMethods(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Metodos de pago retornados.',
                    data: paymentMethod
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los metodos de pago.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pmt_uuid = req.params.pmt_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el metodo de pago.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!pmt_uuid || pmt_uuid.toLowerCase() === 'null' || pmt_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el metodo de pago.',
                    error: 'Debe proporcionar un Id de metodo de pago.'
                });
            }
            const paymentMethod = await this.paymentMethodUseCase.getDetailPaymentMethod(`${cmp_uuid}`,`${pmt_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Metodo de pago retornado.',
                data: paymentMethod
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar el metodo de pago.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const pmt_uuid = body.pmt_uuid;
            const pmt_name = body.pmt_name;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el item.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!pmt_uuid || pmt_uuid.toLowerCase() === 'null' || pmt_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el metodo de pago.',
                    error: 'Debe proporcionar un Id de metodo de pago.'
                });
            }
            if(!pmt_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el metodo de pago.',
                    error: 'Debe proporcionar un Nombre para el metodo de pago.'
                })
            };
            const paymentMethodByName = await this.paymentMethodUseCase.findPaymentMethodByName(cmp_uuid, pmt_uuid, pmt_name);
            if(paymentMethodByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar el metodo de pago.',
                    error: `El nombre ${pmt_name} de metodo de pago ya existe.`
                });
            }
            const paymentMethod = await this.paymentMethodUseCase.createPaymentMethod(body)
            return res.status(200).json({
                success: true,
                message: 'Metodo de pago insertado.',
                data: paymentMethod
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar el metodo de pago.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pmt_uuid = req.params.pmt_uuid;
            const update = req.body;
            const paymentMethod = await this.paymentMethodUseCase.updatePaymentMethod(cmp_uuid, pmt_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Metodo de pago actualizado.',
                data: paymentMethod
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar el metodo de pago.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pmt_uuid = req.params.pmt_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el metodo de pago.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            if(!pmt_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el metodo de pago.',
                    error: 'Debe proporcionar un Id de metodo de pago.'
                });
            };
            const paymentMethod = await this.paymentMethodUseCase.deletePaymentMethod(cmp_uuid, pmt_uuid)
            return res.status(200).json({
                success: true,
                message: 'Metodo de pago eliminado.',
                data: paymentMethod
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar el metodo de pago.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}