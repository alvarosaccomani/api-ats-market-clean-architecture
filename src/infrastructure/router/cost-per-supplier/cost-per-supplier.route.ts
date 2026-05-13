import { Express } from "express";
import { SequelizeRepository } from "../../repository/cost-per-supplier/sequelize-cost-per-supplier.repository";
import { CostPerSupplierUseCase } from "../../../application/cost-per-supplier/cost-per-supplier-use-case";
import { CostPerSupplierController } from "../../controller/cost-per-supplier/cost-per-supplier.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCostPerSupplierRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCostPerSupplierRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const costPerSupplierUseCase = new CostPerSupplierUseCase(sequelizeCostPerSupplierRepository);
    
    /*
    *   Iniciar controller
    */
    
    const costPerSupplierCtrl = new CostPerSupplierController(costPerSupplierUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/cost-per-suppliers/:cmp_uuid/:pro_uuid/:prov_uuid/:filter?/:page?/:perPage?`, costPerSupplierCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/cost-per-supplier/:cmp_uuid/:pro_uuid/:prov_uuid/:cps_uuid`, costPerSupplierCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/cost-per-supplier`, costPerSupplierCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/cost-per-supplier/:cmp_uuid/:pro_uuid/:prov_uuid`, costPerSupplierCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/cost-per-supplier/:cmp_uuid/:pro_uuid/:prov_uuid/:cps_uuid`, costPerSupplierCtrl.deleteCtrl);
}

export default configureCostPerSupplierRoutes;
