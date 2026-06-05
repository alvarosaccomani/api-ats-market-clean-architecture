import { Express } from "express";
import { SequelizeRepository as SequelizeWarehouseRepository } from "../../repository/warehouse/sequelize-warehouse.repository";
import { WarehouseUseCase } from "../../../application/warehouse/warehouse-use-case";
import { WarehouseController } from "../../controller/warehouse/warehouse.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureWarehouseRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeWarehouseRepository = new SequelizeWarehouseRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const warehouseUseCase = new WarehouseUseCase(sequelizeWarehouseRepository);
    
    /*
    *   Iniciar controller
    */
    const warehouseCtrl = new WarehouseController(warehouseUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/warehouses/:cmp_uuid/:page?/:perPage?`, authMiddleware, warehouseCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/warehouse/:cmp_uuid/:war_uuid`, authMiddleware, warehouseCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/warehouse`, authMiddleware, warehouseCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/warehouse/:cmp_uuid/:war_uuid`, authMiddleware, warehouseCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/warehouse/:cmp_uuid/:war_uuid`, authMiddleware, warehouseCtrl.deleteCtrl);
}

export default configureWarehouseRoutes;
