import { Express } from "express";
import { SequelizeRepository as SequelizeTypeStockMovementRepository } from "../../repository/type-stock-movement/sequelize-type-stock-movement.repository";
import { TypeStockMovementUseCase } from "../../../application/type-stock-movement/type-stock-movement-use-case";
import { TypeStockMovementController } from "../../controller/type-stock-movement/type-stock-movement.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureTypeStockMovementRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeTypeStockMovementRepository = new SequelizeTypeStockMovementRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const typeStockMovementUseCase = new TypeStockMovementUseCase(sequelizeTypeStockMovementRepository);
    
    /*
    *   Iniciar controller
    */
    const typeStockMovementCtrl = new TypeStockMovementController(typeStockMovementUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/type-stock-movements/:page?/:perPage?`, typeStockMovementCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/type-stock-movement/:tsmo_uuid`, typeStockMovementCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/type-stock-movement`, typeStockMovementCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/type-stock-movement/:tsmo_uuid`, typeStockMovementCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/type-stock-movement/:tsmo_uuid`, typeStockMovementCtrl.deleteCtrl);
}

export default configureTypeStockMovementRoutes;
