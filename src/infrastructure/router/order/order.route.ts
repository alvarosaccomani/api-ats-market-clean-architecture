import { Express } from "express";
import { SequelizeRepository as SequelizeOrderRepository } from "../../repository/order/sequelize-order.repository";
import { SequelizeRepository as SequelizeOrderDetailRepository } from "../../repository/order-detail/sequelize-order-detail.repository";
import { SequelizeRepository as SequelizeOrderHistoryRepository } from "../../repository/order-history/sequelize-order-history.repository";
import { OrderUseCase } from "../../../application/order/order-use-case";
import { OrderController } from "../../controller/order/order.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureOrderRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeOrderRepository = new SequelizeOrderRepository();
    const sequelizeOrderDetailRepository = new SequelizeOrderDetailRepository();
    const sequelizeOrderHistoryRepository = new SequelizeOrderHistoryRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const orderUseCase = new OrderUseCase(sequelizeOrderRepository, sequelizeOrderDetailRepository, sequelizeOrderHistoryRepository);
    
    /*
    *   Iniciar controller
    */
    
    const orderCtrl = new OrderController(orderUseCase, socketAdapter);
    
    /**
     * @swagger
     * /orders/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de órdenes de una empresa (con paginación opcional)
     *     tags:
     *       - Orders
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: filter
     *         schema:
     *           type: string
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
     *         description: Órdenes retornadas.
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
     *                     $ref: '#/components/schemas/OrderEntity'
     *       400:
     *         description: Error al recuperar las órdenes.
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/orders/:cmp_uuid/:filter?/:page?/:perPage?`, authMiddleware, orderCtrl.getAllCtrl);

    /**
     * @swagger
     * /order/{cmp_uuid}/{ord_uuid}:
     *   get:
     *     summary: Obtener detalle completo de una orden
     *     tags:
     *       - Orders
     *     security:
     *       - bearerAuth: []
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
     *     responses:
     *       200:
     *         description: Orden retornada con detalle.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderEntity'
     *       400:
     *         description: Orden no encontrada o parámetros inválidos.
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/order/:cmp_uuid/:ord_uuid`, authMiddleware, orderCtrl.getCtrl);

    /**
     * @swagger
     * /order:
     *   post:
     *     summary: Crear una nueva orden de compra
     *     tags:
     *       - Orders
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateOrderDto'
     *     responses:
     *       200:
     *         description: Orden creada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderEntity'
     *       400:
     *         description: Error al crear la orden.
     */
    app.post(`/${process.env.BASE_URL_API}/order`, orderCtrl.insertCtrl);

    /**
     * @swagger
     * /order/{cmp_uuid}/{ord_uuid}:
     *   put:
     *     summary: Actualizar datos de una orden existente
     *     tags:
     *       - Orders
     *     security:
     *       - bearerAuth: []
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateOrderDto'
     *     responses:
     *       200:
     *         description: Orden actualizada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderEntity'
     *       400:
     *         description: Error al actualizar la orden.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/order/:cmp_uuid/:ord_uuid`, authMiddleware, orderCtrl.updateCtrl);

    /**
     * @swagger
     * /change-order-status/{cmp_uuid}/{ord_uuid}:
     *   put:
     *     summary: Cambiar el estado de una orden y registrar el historial
     *     tags:
     *       - Orders
     *     security:
     *       - bearerAuth: []
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ChangeOrderStatusDto'
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
     *                   $ref: '#/components/schemas/OrderEntity'
     *       400:
     *         description: Error al cambiar el estado.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/change-order-status/:cmp_uuid/:ord_uuid`, authMiddleware, orderCtrl.changeOrderStatusCtrl);

    /**
     * @swagger
     * /order/{cmp_uuid}/{ord_uuid}:
     *   delete:
     *     summary: Eliminar una orden por UUID
     *     tags:
     *       - Orders
     *     security:
     *       - bearerAuth: []
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
     *     responses:
     *       200:
     *         description: Orden eliminada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar la orden.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/order/:cmp_uuid/:ord_uuid`, authMiddleware, orderCtrl.deleteCtrl);

    /**
     * @swagger
     * /orders-by-customer/{cus_uuid}:
     *   get:
     *     summary: Obtener todas las órdenes asociadas a un cliente
     *     tags:
     *       - Orders
     *     parameters:
     *       - in: path
     *         name: cus_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: filter
     *         schema:
     *           type: string
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
     *         description: Órdenes del cliente retornadas.
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
     *                     $ref: '#/components/schemas/OrderEntity'
     *       400:
     *         description: Error al recuperar las órdenes.
     */
    app.get(`/${process.env.BASE_URL_API}/orders-by-customer/:cus_uuid/:filter?/:page?/:perPage?`, orderCtrl.getOrdersByCustomer);
}

export default configureOrderRoutes;
