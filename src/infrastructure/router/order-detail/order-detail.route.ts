import { Express } from "express";
import { SequelizeRepository as SequelizeOrderDetailRepository } from "../../repository/order-detail/sequelize-order-detail.repository";
import { OrderDetailUseCase } from "../../../application/order-detail/order-detail-use-case";
import { OrderDetailController } from "../../controller/order-detail/order-detail.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureOrderDetailRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeOrderDetailRepository = new SequelizeOrderDetailRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const orderDetailUseCase = new OrderDetailUseCase(sequelizeOrderDetailRepository);
    
    /*
    *   Iniciar controller
    */
    const orderDetailCtrl = new OrderDetailController(orderDetailUseCase, socketAdapter);
    
    /**
     * @swagger
     * /order-details/{cmp_uuid}/{ord_uuid}:
     *   get:
     *     summary: Obtener los detalles/ítems de una orden
     *     tags:
     *       - OrderDetails
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
     *         description: Detalles de orden retornados.
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
     *                     $ref: '#/components/schemas/OrderDetailEntity'
     *       400:
     *         description: Error al recuperar los detalles de la orden.
     */
    app.get(`/${process.env.BASE_URL_API}/order-details/:cmp_uuid/:ord_uuid/:page?/:perPage?`, orderDetailCtrl.getAllCtrl);

    /**
     * @swagger
     * /order-detail/{cmp_uuid}/{ord_uuid}/{ordd_uuid}:
     *   get:
     *     summary: Obtener un detalle específico de una orden por UUID
     *     tags:
     *       - OrderDetails
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
     *       - in: path
     *         name: ordd_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Detalle de orden retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderDetailEntity'
     *       400:
     *         description: Detalle de orden no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/order-detail/:cmp_uuid/:ord_uuid/:ordd_uuid`, orderDetailCtrl.getCtrl);

    /**
     * @swagger
     * /order-detail:
     *   post:
     *     summary: Agregar un nuevo ítem/detalle a una orden
     *     tags:
     *       - OrderDetails
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateOrderDetailDto'
     *     responses:
     *       200:
     *         description: Detalle de orden insertado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderDetailEntity'
     *       400:
     *         description: Error al insertar el detalle de orden.
     */
    app.post(`/${process.env.BASE_URL_API}/order-detail`, orderDetailCtrl.insertCtrl);

    /**
     * @swagger
     * /order-detail/{cmp_uuid}/{ord_uuid}/{ordd_uuid}:
     *   put:
     *     summary: Actualizar un ítem/detalle de una orden
     *     tags:
     *       - OrderDetails
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
     *       - in: path
     *         name: ordd_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateOrderDetailDto'
     *     responses:
     *       200:
     *         description: Detalle de orden actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/OrderDetailEntity'
     *       400:
     *         description: Error al actualizar el detalle de orden.
     */
    app.put(`/${process.env.BASE_URL_API}/order-detail/:cmp_uuid/:ord_uuid/:ordd_uuid`, orderDetailCtrl.updateCtrl);

    /**
     * @swagger
     * /order-detail/{cmp_uuid}/{ord_uuid}/{ordd_uuid}:
     *   delete:
     *     summary: Eliminar un ítem/detalle de una orden por UUID
     *     tags:
     *       - OrderDetails
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
     *       - in: path
     *         name: ordd_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Detalle de orden eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar el detalle de orden.
     */
    app.delete(`/${process.env.BASE_URL_API}/order-detail/:cmp_uuid/:ord_uuid/:ordd_uuid`, orderDetailCtrl.deleteCtrl);
}

export default configureOrderDetailRoutes;
