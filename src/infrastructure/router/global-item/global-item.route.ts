import { Express } from "express";
import { SequelizeRepository as SequelizeGlobalItemRepository } from "../../repository/global-item/sequelize-global-item.repository";
import { GlobalItemUseCase } from "../../../application/global-item/global-item-use-case";
import { GlobalItemController } from "../../controller/global-item/global-item.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureGlobalItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeGlobalItemRepository = new SequelizeGlobalItemRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const globalItemUseCase = new GlobalItemUseCase(sequelizeGlobalItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const globalItemCtrl = new GlobalItemController(globalItemUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/global-items/:filter?/:page?/:perPage?`, globalItemCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/global-item/:gitm_uuid`, globalItemCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/global-item`, globalItemCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/global-item/:gitm_uuid`, globalItemCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/global-item/:gitm_uuid`, globalItemCtrl.deleteCtrl);
}

export default configureGlobalItemRoutes;
