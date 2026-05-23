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
    
    app.get(`/${process.env.BASE_URL_API}/order-statuses/:page?/:perPage?`, orderStatusCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/order-status/:ords_uuid`, orderStatusCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/order-status`, orderStatusCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/order-status/:ords_uuid`, orderStatusCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/order-status/:ords_uuid`, orderStatusCtrl.deleteCtrl);
}

export default configureOrderStatusRoutes;
