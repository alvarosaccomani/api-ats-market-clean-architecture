import { Express } from "express";
import { SequelizeRepository as SequelizeOrderHistoryRepository } from "../../repository/order-history/sequelize-order-history.repository";
import { OrderHistoryUseCase } from "../../../application/order-history/order-history-use-case";
import { OrderHistoryController } from "../../controller/order-history/order-history.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureOrderHistoryRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeOrderHistoryRepository = new SequelizeOrderHistoryRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const orderHistoryUseCase = new OrderHistoryUseCase(sequelizeOrderHistoryRepository);
    
    /*
    *   Iniciar controller
    */
    const orderHistoryCtrl = new OrderHistoryController(orderHistoryUseCase, socketAdapter);
    
    /**
     * @swagger
     * /order-history/{cmp_uuid}/{ord_uuid}:
     *   get:
     *     summary: Consultar la trazabilidad / historial de cambios de una orden
     *     tags:
     *       - OrderHistory
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
     *         description: Historial de la orden retornado.
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
     *                     $ref: '#/components/schemas/OrderHistoryEntity'
     *       400:
     *         description: Error al recuperar el historial.
     */
    app.get(`/${process.env.BASE_URL_API}/order-history/:cmp_uuid/:ord_uuid/:page?/:perPage?`, orderHistoryCtrl.getAllCtrl);
}

export default configureOrderHistoryRoutes;
