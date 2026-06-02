import { MessageEntity, MessageUpdateData } from "./message.entity";

export interface MessageRepository {
    getMessages(cmp_uuid: string, ord_uuid: string): Promise<MessageEntity[] | null>;
    findMessageById(cmp_uuid: string, ord_uuid: string, msg_uuid: string): Promise<MessageEntity | null>;
    createMessage(message: MessageEntity): Promise<MessageEntity | null>;
    updateMessage(cmp_uuid: string, ord_uuid: string, msg_uuid: string, message: MessageUpdateData): Promise<MessageEntity | null>;
    deleteMessage(cmp_uuid: string, ord_uuid: string, msg_uuid: string): Promise<MessageEntity | null>;
}