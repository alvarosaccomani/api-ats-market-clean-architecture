import { Express } from "express";
import { SequelizeRepository as SequelizeProductVariationReviewRepository } from "../../repository/product-variation-review/sequelize-product-variation-review.repository";
import { ProductVariationReviewUseCase } from "../../../application/product-variation-review/product-variation-review-use-case";
import { ProductVariationReviewController } from "../../controller/product-variation-review/product-variation-review.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureProductVariationReviewRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeProductVariationReviewRepository = new SequelizeProductVariationReviewRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const productVariationReviewUseCase = new ProductVariationReviewUseCase(sequelizeProductVariationReviewRepository);
    
    /*
    *   Iniciar controller
    */
    const productVariationReviewCtrl = new ProductVariationReviewController(productVariationReviewUseCase, socketAdapter);
    
    // Rutas de consulta de colecciones (reseñas de una variación de producto específica)
    app.get(`/${process.env.BASE_URL_API}/product-variation-reviews/:cmp_uuid/:pro_uuid/:prov_uuid/:page?/:perPage?`, productVariationReviewCtrl.getAllCtrl);
    
    // Consulta individual por PK compuesta de 4 columnas
    app.get(`/${process.env.BASE_URL_API}/product-variation-review/:cmp_uuid/:pro_uuid/:prov_uuid/:provrev_uuid`, productVariationReviewCtrl.getCtrl);
    
    // Registro individual
    app.post(`/${process.env.BASE_URL_API}/product-variation-review`, productVariationReviewCtrl.insertCtrl);
    
    // Edición y borrado por PK compuesta de 4 columnas
    app.put(`/${process.env.BASE_URL_API}/product-variation-review/:cmp_uuid/:pro_uuid/:prov_uuid/:provrev_uuid`, productVariationReviewCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/product-variation-review/:cmp_uuid/:pro_uuid/:prov_uuid/:provrev_uuid`, productVariationReviewCtrl.deleteCtrl);
}

export default configureProductVariationReviewRoutes;
