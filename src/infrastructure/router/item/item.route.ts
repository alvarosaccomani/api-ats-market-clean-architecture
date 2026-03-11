import { Express } from "express";
import { SequelizeRepository as SequelizeItemRepository } from "../../repository/item/sequelize-item.repository";
import { ItemUseCase } from "../../../application/item/item-use-case";
import { ItemController } from "../../controller/item/item.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeItemRepository = new SequelizeItemRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const itemUseCase = new ItemUseCase(sequelizeItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const itemCtrl = new ItemController(itemUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/items/:cmp_uuid/:filter?/:page?/:perPage?`, itemCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/item/:cmp_uuid/:itm_uuid`, itemCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/item`, itemCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/item/:cmp_uuid/:itm_uuid`, itemCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/item/:cmp_uuid/:itm_uuid`, itemCtrl.deleteCtrl);
}

export default configureItemRoutes;
