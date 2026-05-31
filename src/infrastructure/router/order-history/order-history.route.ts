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
    
    // Ruta de consulta de trazabilidad
    app.get(`/${process.env.BASE_URL_API}/order-history/:cmp_uuid/:ord_uuid/:page?/:perPage?`, orderHistoryCtrl.getAllCtrl);
}

export default configureOrderHistoryRoutes;
