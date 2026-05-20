import { Express } from "express";
import { SequelizeRepository as SequelizeOrderRepository } from "../../repository/order/sequelize-order.repository";
import { OrderUseCase } from "../../../application/order/order-use-case";
import { OrderController } from "../../controller/order/order.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureOrderRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeOrderRepository = new SequelizeOrderRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const orderUseCase = new OrderUseCase(sequelizeOrderRepository);
    
    /*
    *   Iniciar controller
    */
    
    const orderCtrl = new OrderController(orderUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/orders/:cmp_uuid/:filter?/:page?/:perPage?`, orderCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/order/:cmp_uuid/:ord_uuid`, orderCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/order`, orderCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/order/:cmp_uuid/:ord_uuid`, orderCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/order/:cmp_uuid/:ord_uuid`, orderCtrl.deleteCtrl);
    app.get(`/${process.env.BASE_URL_API}/orders-by-customer/:cus_uuid/:filter?/:page?/:perPage?`, orderCtrl.getOrdersByCustomer);
}

export default configureOrderRoutes;
