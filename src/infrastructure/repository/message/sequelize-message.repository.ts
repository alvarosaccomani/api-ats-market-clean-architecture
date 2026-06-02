import { MessageEntity, MessageUpdateData } from "../../../domain/message/message.entity";
import { MessageRepository } from "../../../domain/message/message.repository";
import { SequelizeMessage } from "../../model/message/message.model";

export class SequelizeRepository implements MessageRepository {
    async getMessages(cmp_uuid: string, ord_uuid: string): Promise<MessageEntity[] | null> {
        try {
            const messages = await SequelizeMessage.findAll({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    ord_uuid: ord_uuid ?? null
                },
                order: [['msg_createdat', 'ASC']]
            });
            if (!messages) {
                return null;
            }
            return messages;
        } catch (error: any) {
            console.error('Error en getMessages (repository):', error.message);
            throw error;
        }
    }

    async findMessageById(cmp_uuid: string, ord_uuid: string, msg_uuid: string): Promise<MessageEntity | null> {
        try {
            const message = await SequelizeMessage.findOne({
                where: {
                    cmp_uuid: cmp_uuid ?? null,
                    ord_uuid: ord_uuid ?? null,
                    msg_uuid: msg_uuid ?? null
                }
            });
            if (!message) {
                return null;
            }
            return message.dataValues;
        } catch (error: any) {
            console.error('Error en findMessageById (repository):', error.message);
            throw error;
        }
    }

    async createMessage(message: MessageEntity): Promise<MessageEntity | null> {
        try {
            const { 
                cmp_uuid, 
                ord_uuid, 
                msg_uuid, 
                msg_sender, 
                usr_uuid, 
                cus_uuid,
                msg_sendername,
                msg_text,
                msg_createdat,
                msg_updatedat
            } = message;
            
            const result = await SequelizeMessage.create({ 
                cmp_uuid, 
                ord_uuid, 
                msg_uuid, 
                msg_sender, 
                usr_uuid, 
                cus_uuid,
                msg_sendername,
                msg_text,
                msg_createdat,
                msg_updatedat
            });
            
            if (!result) {
                throw new Error(`No se pudo registrar el mensaje`);
            }
            
            return result.dataValues as MessageEntity;
        } catch (error: any) {
            console.error('Error en createMessage (repository):', error.message);
            throw error;
        }
    }

    async updateMessage(cmp_uuid: string, ord_uuid: string, msg_uuid: string, message: MessageUpdateData): Promise<MessageEntity | null> {
        try {
            const [updatedCount, [updatedMessage]] = await SequelizeMessage.update(
                {
                    msg_text: message.msg_text
                },
                {
                    where: { cmp_uuid, ord_uuid, msg_uuid },
                    returning: true,
                }
            );
            
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar el mensaje`);
            }
            
            return updatedMessage.get({ plain: true }) as MessageEntity;
        } catch (error: any) {
            console.error('Error en updateMessage (repository):', error.message);
            throw error;
        }
    }

    async deleteMessage(cmp_uuid: string, ord_uuid: string, msg_uuid: string): Promise<MessageEntity | null> {
        try {
            const messageToDelete = await this.findMessageById(cmp_uuid, ord_uuid, msg_uuid);
            if (!messageToDelete) {
                throw new Error(`No se ha encontrado el mensaje a eliminar`);
            }
            
            const deletedCount = await SequelizeMessage.destroy({
                where: { cmp_uuid, ord_uuid, msg_uuid }
            });
            
            if (deletedCount === 0) {
                throw new Error(`No se pudo eliminar el mensaje`);
            }
            
            return messageToDelete;
        } catch (error: any) {
            console.error('Error en deleteMessage (repository):', error.message);
            throw error;
        }
    }
}
