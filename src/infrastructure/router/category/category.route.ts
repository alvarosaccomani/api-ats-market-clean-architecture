import { Express } from "express";
import { SequelizeRepository as SequelizeCategoryRepository } from "../../repository/category/sequelize-category.repository";
import { CategoryUseCase } from "../../../application/category/category-use-case";
import { CategoryController } from "../../controller/category/category.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureCategoryRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCategoryRepository = new SequelizeCategoryRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const categoryUseCase = new CategoryUseCase(sequelizeCategoryRepository);
    
    /*
    *   Iniciar controller
    */
    
    const categoryCtrl = new CategoryController(categoryUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/categories/:cmp_uuid/:itm_uuid/:filter?/:page?/:perPage?`, categoryCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/category/:cmp_uuid/:cat_uuid/:itm_uuid`, categoryCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/category`, authMiddleware, categoryCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/category/:cmp_uuid/:cat_uuid/:itm_uuid`, authMiddleware, categoryCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/category/:cmp_uuid/:cat_uuid/:itm_uuid`, authMiddleware, categoryCtrl.deleteCtrl);
}

export default configureCategoryRoutes;
