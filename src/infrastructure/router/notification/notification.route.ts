import { Express } from "express";
import { SequelizeRepository as SequelizeNotificationRepository } from "../../repository/notification/sequelize-notification.repository";
import { NotificationUseCase } from "../../../application/notification/notification-use-case";
import { NotificationController } from "../../controller/notification/notification.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureNotificationRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeNotificationRepository = new SequelizeNotificationRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const notificationUseCase = new NotificationUseCase(sequelizeNotificationRepository);
    
    /*
    *   Iniciar controller
    */
    const notificationCtrl = new NotificationController(notificationUseCase, socketAdapter);
    
    /**
     * @swagger
     * /notifications/{usr_uuid}/{cus_uuid}:
     *   get:
     *     summary: Obtener todas las notificaciones de un usuario para un cliente específico
     *     tags:
     *       - Notifications
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cus_uuid
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
     *         description: Notificaciones retornadas.
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
     *                     $ref: '#/components/schemas/NotificationEntity'
     *       400:
     *         description: Error al recuperar las notificaciones.
     */
    app.get(`/${process.env.BASE_URL_API}/notifications/:usr_uuid/:cus_uuid/:page?/:perPage?`, notificationCtrl.getAllCtrl);
    
    /**
     * @swagger
     * /notification/{usr_uuid}/{cus_uuid}/{ntf_uuid}:
     *   get:
     *     summary: Obtener detalle de una notificación por su clave compuesta
     *     tags:
     *       - Notifications
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cus_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: ntf_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Notificación retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/NotificationEntity'
     *       400:
     *         description: Notificación no encontrada o parámetros inválidos.
     */
    app.get(`/${process.env.BASE_URL_API}/notification/:usr_uuid/:cus_uuid/:ntf_uuid`, notificationCtrl.getCtrl);
    
    /**
     * @swagger
     * /notification:
     *   post:
     *     summary: Registrar una nueva notificación
     *     tags:
     *       - Notifications
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateNotificationDto'
     *     responses:
     *       200:
     *         description: Notificación creada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/NotificationEntity'
     *       400:
     *         description: Error al crear la notificación.
     */
    app.post(`/${process.env.BASE_URL_API}/notification`, notificationCtrl.insertCtrl);
    
    /**
     * @swagger
     * /notification/{usr_uuid}/{cus_uuid}/{ntf_uuid}:
     *   put:
     *     summary: Actualizar estado de una notificación (marcar como leída, etc.)
     *     tags:
     *       - Notifications
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cus_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: ntf_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateNotificationDto'
     *     responses:
     *       200:
     *         description: Notificación actualizada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/NotificationEntity'
     *       400:
     *         description: Error al actualizar la notificación.
     */
    app.put(`/${process.env.BASE_URL_API}/notification/:usr_uuid/:cus_uuid/:ntf_uuid`, notificationCtrl.updateCtrl);

    /**
     * @swagger
     * /notification/{usr_uuid}/{cus_uuid}/{ntf_uuid}:
     *   delete:
     *     summary: Eliminar una notificación por su clave compuesta
     *     tags:
     *       - Notifications
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cus_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: ntf_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Notificación eliminada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar la notificación.
     */
    app.delete(`/${process.env.BASE_URL_API}/notification/:usr_uuid/:cus_uuid/:ntf_uuid`, notificationCtrl.deleteCtrl);
}

export default configureNotificationRoutes;
