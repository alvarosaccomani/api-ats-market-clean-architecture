import { Express } from "express";
import { SequelizeRepository as SequelizeMessageRepository } from "../../repository/message/sequelize-message.repository";
import { MessageUseCase } from "../../../application/message/message-use-case";
import { MessageController } from "../../controller/message/message.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureMessageRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeMessageRepository = new SequelizeMessageRepository();
    
    /*
    *   Iniciar caso de uso
    */
    const messageUseCase = new MessageUseCase(sequelizeMessageRepository);
    
    /*
    *   Iniciar controller
    */
    const messageCtrl = new MessageController(messageUseCase, socketAdapter);
    
    // Rutas de mensajes
    app.get(`/${process.env.BASE_URL_API}/messages/:cmp_uuid/:ord_uuid/:page?/:perPage?`, messageCtrl.getMessagesCtrl);
    app.post(`/${process.env.BASE_URL_API}/message`, messageCtrl.createMessageCtrl);
}

export default configureMessageRoutes;
