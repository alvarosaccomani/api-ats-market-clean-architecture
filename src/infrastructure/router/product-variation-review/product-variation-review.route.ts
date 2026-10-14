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
    
    /**
     * @swagger
     * /product-variation-reviews/{cmp_uuid}/{pro_uuid}/{prov_uuid}:
     *   get:
     *     summary: Obtener reseñas de una variación de producto
     *     tags:
     *       - Product-Variation-Reviews
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: pro_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: prov_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *       - in: query
     *         name: perPage
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Reseñas retornadas.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/ProductVariationReviewEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/product-variation-reviews/:cmp_uuid/:pro_uuid/:prov_uuid/:page?/:perPage?`, productVariationReviewCtrl.getAllCtrl);
    
    /**
     * @swagger
     * /product-variation-review/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{provrev_uuid}:
     *   get:
     *     summary: Obtener detalle de una reseña por clave compuesta
     *     tags:
     *       - Product-Variation-Reviews
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: pro_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: prov_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: provrev_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Reseña retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/ProductVariationReviewEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/product-variation-review/:cmp_uuid/:pro_uuid/:prov_uuid/:provrev_uuid`, productVariationReviewCtrl.getCtrl);
    
    /**
     * @swagger
     * /product-variation-review:
     *   post:
     *     summary: Registrar una nueva reseña de variación
     *     tags:
     *       - Product-Variation-Reviews
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProductVariationReviewDto'
     *     responses:
     *       200:
     *         description: Reseña registrada con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/product-variation-review`, productVariationReviewCtrl.insertCtrl);
    
    /**
     * @swagger
     * /product-variation-review/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{provrev_uuid}:
     *   put:
     *     summary: Actualizar una reseña de variación
     *     tags:
     *       - Product-Variation-Reviews
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: pro_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: prov_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: provrev_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateProductVariationReviewDto'
     *     responses:
     *       200:
     *         description: Reseña actualizada.
     */
    app.put(`/${process.env.BASE_URL_API}/product-variation-review/:cmp_uuid/:pro_uuid/:prov_uuid/:provrev_uuid`, productVariationReviewCtrl.updateCtrl);

    /**
     * @swagger
     * /product-variation-review/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{provrev_uuid}:
     *   delete:
     *     summary: Eliminar una reseña de variación
     *     tags:
     *       - Product-Variation-Reviews
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: pro_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: prov_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: provrev_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Reseña eliminada con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/product-variation-review/:cmp_uuid/:pro_uuid/:prov_uuid/:provrev_uuid`, productVariationReviewCtrl.deleteCtrl);
}

export default configureProductVariationReviewRoutes;
