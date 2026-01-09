import { Express } from "express";
import { SequelizeRepository } from "../../repository/product/sequelize-product.repository";
import { ProductUseCase } from "../../../application/product/product-use-case";
import { ProductController } from "../../controller/product/product.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureProductRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeProductRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const productUseCase = new ProductUseCase(sequelizeProductRepository);
    
    /*
    *   Iniciar controller
    */
    
    const productCtrl = new ProductController(productUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/products/:cmp_uuid/:filter?/:page?/:perPage?`, productCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/product/:cmp_uuid/:pro_uuid`, productCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/product`, productCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/product/:cmp_uuid/:pro_uuid`, productCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/product/:cmp_uuid/:pro_uuid`, productCtrl.deleteCtrl);
}

export default configureProductRoutes;
