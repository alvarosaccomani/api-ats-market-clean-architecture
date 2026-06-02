import { MessageRepository } from "../../domain/message/message.repository";
import { MessageValue } from "../../domain/message/message.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class MessageUseCase {
    constructor(
        private readonly messageRepository: MessageRepository
    ) {
        this.getMessages = this.getMessages.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    public async getMessages(cmp_uuid: string, ord_uuid: string) {
        try {
            const messages = await this.messageRepository.getMessages(cmp_uuid, ord_uuid);
            if (!messages) {
                return [];
            }
            return messages.map(msg => ({
                cmp_uuid: msg.cmp_uuid,
                msg_uuid: msg.msg_uuid,
                ord_uuid: msg.ord_uuid,
                msg_sender: msg.msg_sender,
                usr_uuid: msg.usr_uuid,
                cus_uuid: msg.cus_uuid,
                msg_sendername: msg.msg_sendername,
                msg_text: msg.msg_text,
                msg_createdat: msg.msg_createdat ? TimezoneConverter.toIsoStringInTimezone(msg.msg_createdat, 'America/Buenos_Aires') : undefined,
                msg_updatedat: msg.msg_updatedat ? TimezoneConverter.toIsoStringInTimezone(msg.msg_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getMessages (use case):', error.message);
            throw error;
        }
    }

    public async createMessage(data: {
        cmp_uuid: string;
        ord_uuid: string;
        msg_sender: string;
        usr_uuid: string;
        cus_uuid?: string | null;
        msg_sendername: string;
        msg_text: string;
    }) {
        try {
            const messageValue = new MessageValue(data);
            const messageCreated = await this.messageRepository.createMessage(messageValue);
            if (!messageCreated) {
                throw new Error("No se pudo registrar el mensaje.");
            }
            return {
                cmp_uuid: messageCreated.cmp_uuid,
                msg_uuid: messageCreated.msg_uuid,
                ord_uuid: messageCreated.ord_uuid,
                msg_sender: messageCreated.msg_sender,
                usr_uuid: messageCreated.usr_uuid,
                cus_uuid: messageCreated.cus_uuid,
                msg_sendername: messageCreated.msg_sendername,
                msg_text: messageCreated.msg_text,
                msg_createdat: messageCreated.msg_createdat ? TimezoneConverter.toIsoStringInTimezone(messageCreated.msg_createdat, 'America/Buenos_Aires') : undefined,
                msg_updatedat: messageCreated.msg_updatedat ? TimezoneConverter.toIsoStringInTimezone(messageCreated.msg_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createMessage (use case):', error.message);
            throw error;
        }
    }
}
