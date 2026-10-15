import { Express } from "express";
import { SequelizeRepository as SequelizeOrderStatusRepository } from "../../repository/order-status/sequelize-order-status.repository";
import { OrderStatusUseCase } from "../../../application/order-status/order-status-use-case";
import { OrderStatusController } from "../../controller/order-status/order-status.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureOrderStatusRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeOrderStatusRepository = new SequelizeOrderStatusRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const orderStatusUseCase = new OrderStatusUseCase(sequelizeOrderStatusRepository);
    
    /*
    *   Iniciar controller
    */
    const orderStatusCtrl = new OrderStatusController(orderStatusUseCase, socketAdapter);
    
    /**
     * @swagger
     * /order-statuses:
     *   get:
     *     summary: Obtener lista de todos los estados de órdenes posibles
     *     tags:
     *       - OrderStatus
     *     parameters:
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
     *         description: Estados de órdenes retornados.
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
     *                     $ref: '#/components/schemas/OrderStatusEntity'
     *       400:
     *         description: Error al recuperar los estados.
     */
    app.get(`/${process.env.BASE_URL_API}/order-statuses/:page?/:perPage?`, orderStatusCtrl.getAllCtrl);

    /**
     * @swagger
     * /order-status/{ords_uuid}:
     *   get:
     *     summary: Obtener detalle de un estado de orden por UUID
     *     tags:
     *       - OrderStatus
     *     parameters:
     *       - in: path
     *         name: ords_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Estado de orden retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderStatusEntity'
     *       400:
     *         description: Estado de orden no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/order-status/:ords_uuid`, orderStatusCtrl.getCtrl);

    /**
     * @swagger
     * /order-status:
     *   post:
     *     summary: Crear un nuevo estado de orden
     *     tags:
     *       - OrderStatus
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateOrderStatusDto'
     *     responses:
     *       200:
     *         description: Estado de orden insertado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderStatusEntity'
     *       400:
     *         description: Error al crear el estado de orden.
     */
    app.post(`/${process.env.BASE_URL_API}/order-status`, orderStatusCtrl.insertCtrl);

    /**
     * @swagger
     * /order-status/{ords_uuid}:
     *   put:
     *     summary: Actualizar un estado de orden existente
     *     tags:
     *       - OrderStatus
     *     parameters:
     *       - in: path
     *         name: ords_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateOrderStatusDto'
     *     responses:
     *       200:
     *         description: Estado de orden actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderStatusEntity'
     *       400:
     *         description: Error al actualizar el estado de orden.
     */
    app.put(`/${process.env.BASE_URL_API}/order-status/:ords_uuid`, orderStatusCtrl.updateCtrl);

    /**
     * @swagger
     * /order-status/{ords_uuid}:
     *   delete:
     *     summary: Eliminar un estado de orden por UUID
     *     tags:
     *       - OrderStatus
     *     parameters:
     *       - in: path
     *         name: ords_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Estado de orden eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar el estado de orden.
     */
    app.delete(`/${process.env.BASE_URL_API}/order-status/:ords_uuid`, orderStatusCtrl.deleteCtrl);
}

export default configureOrderStatusRoutes;
