import { Express } from "express";
import { SequelizeRepository as SequelizeProductRepository } from "../../repository/product/sequelize-product.repository";
import { SequelizeRepository as SequelizeProductVariationRepository } from "../../repository/product-variation/sequelize-product-variation.repository";
import { ProductUseCase } from "../../../application/product/product-use-case";
import { ProductController } from "../../controller/product/product.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureProductRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeProductRepository = new SequelizeProductRepository();
    const sequelizeProductVariationRepository = new SequelizeProductVariationRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const productUseCase = new ProductUseCase(sequelizeProductRepository, sequelizeProductVariationRepository);
    
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
