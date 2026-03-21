import { Express } from "express";
import { SequelizeRepository as SequelizeCustomerRepository } from "../../repository/customer/sequelize-customer.repository";
import { CustomerUseCase } from "../../../application/customer/customer-use-case";
import { CustomerController } from "../../controller/customer/customer.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCustomerRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCustomerRepository = new SequelizeCustomerRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const customerUseCase = new CustomerUseCase(sequelizeCustomerRepository);
    
    /*
    *   Iniciar controller
    */
    
    const customerCtrl = new CustomerController(customerUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/customers/:cmp_uuid/:filter?/:page?/:perPage?`, customerCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/customer/:cmp_uuid/:cus_uuid`, customerCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/customer`, customerCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/customer/:cmp_uuid/:cus_uuid`, customerCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/customer/:cmp_uuid/:cus_uuid`, customerCtrl.deleteCtrl);
}

export default configureCustomerRoutes;
