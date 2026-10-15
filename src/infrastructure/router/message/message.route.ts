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
    
    /**
     * @swagger
     * /messages/{cmp_uuid}/{ord_uuid}:
     *   get:
     *     summary: Obtener mensajes de chat vinculados a una orden
     *     tags:
     *       - Messages
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: ord_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *       - in: query
     *         name: perPage
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Mensajes retornados.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/MessageEntity'
     *       400:
     *         description: Error al recuperar los mensajes.
     */
    app.get(`/${process.env.BASE_URL_API}/messages/:cmp_uuid/:ord_uuid/:page?/:perPage?`, messageCtrl.getMessagesCtrl);

    /**
     * @swagger
     * /message:
     *   post:
     *     summary: Enviar un nuevo mensaje en el chat de una orden
     *     tags:
     *       - Messages
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateMessageDto'
     *     responses:
     *       200:
     *         description: Mensaje enviado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/MessageEntity'
     *       400:
     *         description: Error al enviar el mensaje.
     */
    app.post(`/${process.env.BASE_URL_API}/message`, messageCtrl.createMessageCtrl);
}

export default configureMessageRoutes;
