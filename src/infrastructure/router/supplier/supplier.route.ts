import { Express } from "express";
import { SequelizeRepository as SequelizeSupplierRepository } from "../../repository/supplier/sequelize-supplier.repository";
import { SupplierUseCase } from "../../../application/supplier/supplier-use-case";
import { SupplierController } from "../../controller/supplier/supplier.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureSupplierRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeSupplierRepository = new SequelizeSupplierRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const supplierUseCase = new SupplierUseCase(sequelizeSupplierRepository);
    
    /*
    *   Iniciar controller
    */
    
    const supplierCtrl = new SupplierController(supplierUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/suppliers/:cmp_uuid/:filter?/:page?/:perPage?`, supplierCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/supplier/:cmp_uuid/:sup_uuid`, supplierCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/supplier`, supplierCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/supplier/:cmp_uuid/:sup_uuid`, supplierCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/supplier/:cmp_uuid/:sup_uuid`, supplierCtrl.deleteCtrl);
}

export default configureSupplierRoutes;
