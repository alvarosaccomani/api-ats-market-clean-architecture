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
    
    app.get(`/${process.env.BASE_URL_API}/order-details/:cmp_uuid/:ord_uuid/:page?/:perPage?`, orderDetailCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/order-detail/:cmp_uuid/:ord_uuid/:ordd_uuid`, orderDetailCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/order-detail`, orderDetailCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/order-detail/:cmp_uuid/:ord_uuid/:ordd_uuid`, orderDetailCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/order-detail/:cmp_uuid/:ord_uuid/:ordd_uuid`, orderDetailCtrl.deleteCtrl);
}

export default configureOrderDetailRoutes;
