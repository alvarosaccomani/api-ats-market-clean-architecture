import { Express } from "express";
import { SequelizeRepository as SequelizeGlobalCategoryRepository } from "../../repository/global-category/sequelize-global-category.repository";
import { GlobalCategoryUseCase } from "../../../application/global-category/global-category-use-case";
import { GlobalCategoryController } from "../../controller/global-category/global-category.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureGlobalCategoryRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeGlobalCategoryRepository = new SequelizeGlobalCategoryRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const globalCategoryUseCase = new GlobalCategoryUseCase(sequelizeGlobalCategoryRepository);
    
    /*
    *   Iniciar controller
    */
    
    const globalCategoryCtrl = new GlobalCategoryController(globalCategoryUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/global-categories/:filter?/:page?/:perPage?`, globalCategoryCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/global-category/:gitm_uuid/:gcat_uuid`, globalCategoryCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/global-category`, globalCategoryCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/global-category/:gitm_uuid/:gcat_uuid`, globalCategoryCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/global-category/:gitm_uuid/:gcat_uuid`, globalCategoryCtrl.deleteCtrl);
}

export default configureGlobalCategoryRoutes;
