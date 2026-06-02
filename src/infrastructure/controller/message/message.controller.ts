import { Request, Response } from "express";
import { MessageUseCase } from "../../../application/message/message-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class MessageController {
    constructor(private messageUseCase: MessageUseCase, private socketAdapter: SocketAdapter) {
        this.getMessagesCtrl = this.getMessagesCtrl.bind(this);
        this.createMessageCtrl = this.createMessageCtrl.bind(this);
    }

    public async getMessagesCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const ord_uuid = req.params.ord_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!ord_uuid || ord_uuid.toLowerCase() === 'null' || ord_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta ord_uuid.' });
            }

            const messages = await this.messageUseCase.getMessages(cmp_uuid, ord_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Mensajes de la orden retornados con paginación.',
                    ...paginator(messages, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Mensajes de la orden retornados.',
                    data: messages
                });
            }
        } catch (error: any) {
            console.error('Error en getMessagesCtrl (controller - message):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar los mensajes de la orden.',
                error: error.message,
            });
        }
    }

    public async createMessageCtrl({ body }: Request, res: Response) {
        try {
            const { cmp_uuid, ord_uuid, msg_sender, usr_uuid, cus_uuid, msg_sendername, msg_text } = body;

            if (!cmp_uuid) {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid en el cuerpo.' });
            }
            if (!ord_uuid) {
                return res.status(400).json({ success: false, message: 'Falta ord_uuid en el cuerpo.' });
            }
            if (!msg_sender) {
                return res.status(400).json({ success: false, message: 'Falta msg_sender en el cuerpo.' });
            }
            if (!usr_uuid) {
                return res.status(400).json({ success: false, message: 'Falta usr_uuid en el cuerpo.' });
            }
            if (!msg_sendername) {
                return res.status(400).json({ success: false, message: 'Falta msg_sendername en el cuerpo.' });
            }
            if (!msg_text) {
                return res.status(400).json({ success: false, message: 'Falta msg_text en el cuerpo.' });
            }

            const message = await this.messageUseCase.createMessage({
                cmp_uuid,
                ord_uuid,
                msg_sender,
                usr_uuid,
                cus_uuid: cus_uuid || null,
                msg_sendername,
                msg_text
            });

            return res.status(200).json({
                success: true,
                message: 'Mensaje registrado con éxito.',
                data: message
            });
        } catch (error: any) {
            console.error('Error en createMessageCtrl (controller - message):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar el mensaje.',
                error: error.message,
            });
        }
    }
}
