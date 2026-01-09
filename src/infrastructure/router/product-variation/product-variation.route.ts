import { Express } from "express";
import { SequelizeRepository } from "../../repository/product-variation/sequelize-product-variation.repository";
import { ProductVariationUseCase } from "../../../application/product-variation/product-variation-use-case";
import { ProductVariationController } from "../../controller/product-variation/product-variation.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureProductVariationRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeProductVariationRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const productVariationUseCase = new ProductVariationUseCase(sequelizeProductVariationRepository);
    
    /*
    *   Iniciar controller
    */
    
    const productVariationCtrl = new ProductVariationController(productVariationUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/products-variations/:cmp_uuid/:filter?/:page?/:perPage?`, productVariationCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/product-variation/:cmp_uuid/:pro_uuid/:prov_uuid`, productVariationCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/product-variation`, productVariationCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/product-variation/:cmp_uuid/:pro_uuid/:prov_uuid`, productVariationCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/product-variation/:cmp_uuid/:pro_uuid/:prov_uuid`, productVariationCtrl.deleteCtrl);
}

export default configureProductVariationRoutes;
