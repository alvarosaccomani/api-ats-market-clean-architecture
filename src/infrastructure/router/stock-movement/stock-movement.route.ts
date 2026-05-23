import { Express } from "express";
import { SequelizeRepository as SequelizeStockMovementRepository } from "../../repository/stock-movement/sequelize-stock-movement.repository";
import { StockMovementUseCase } from "../../../application/stock-movement/stock-movement-use-case";
import { StockMovementController } from "../../controller/stock-movement/stock-movement.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureStockMovementRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeStockMovementRepository = new SequelizeStockMovementRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const stockMovementUseCase = new StockMovementUseCase(sequelizeStockMovementRepository);
    
    /*
    *   Iniciar controller
    */
    const stockMovementCtrl = new StockMovementController(stockMovementUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/stock-movements/:cmp_uuid/:page?/:perPage?`, stockMovementCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/stock-movement/:cmp_uuid/:pro_uuid/:prov_uuid/:smo_uuid`, stockMovementCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/stock-movement`, stockMovementCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/stock-movement/:cmp_uuid/:pro_uuid/:prov_uuid/:smo_uuid`, stockMovementCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/stock-movement/:cmp_uuid/:pro_uuid/:prov_uuid/:smo_uuid`, stockMovementCtrl.deleteCtrl);
}

export default configureStockMovementRoutes;
