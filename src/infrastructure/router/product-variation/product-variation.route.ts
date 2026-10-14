import { Express } from "express";
import { SequelizeRepository } from "../../repository/product-variation/sequelize-product-variation.repository";
import { SequelizeRepository as SequelizeCostPerSupplierRepository } from "../../repository/cost-per-supplier/sequelize-cost-per-supplier.repository";
import { ProductVariationUseCase } from "../../../application/product-variation/product-variation-use-case";
import { ProductVariationController } from "../../controller/product-variation/product-variation.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureProductVariationRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeProductVariationRepository = new SequelizeRepository();
    const sequelizeCostPerSupplierRepository = new SequelizeCostPerSupplierRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const productVariationUseCase = new ProductVariationUseCase(sequelizeProductVariationRepository, sequelizeCostPerSupplierRepository);
    
    /*
    *   Iniciar controller
    */
    
    const productVariationCtrl = new ProductVariationController(productVariationUseCase, socketAdapter);
    
    /**
     * @swagger
     * /products-variations/{cmp_uuid}:
     *   get:
     *     summary: Obtener variaciones de productos de una empresa
     *     tags:
     *       - Product-Variations
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: filter
     *         schema:
     *           type: string
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
     *         description: Variaciones retornadas.
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
     *                     $ref: '#/components/schemas/ProductVariationEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/products-variations/:cmp_uuid/:filter?/:page?/:perPage?`, productVariationCtrl.getAllCtrl);

    /**
     * @swagger
     * /product-variation/{cmp_uuid}/{pro_uuid}/{prov_uuid}:
     *   get:
     *     summary: Obtener detalle de una variación por clave compuesta
     *     tags:
     *       - Product-Variations
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
     *     responses:
     *       200:
     *         description: Variación retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/ProductVariationEntity'
     *       400:
     *         description: Variación no encontrada.
     */
    app.get(`/${process.env.BASE_URL_API}/product-variation/:cmp_uuid/:pro_uuid/:prov_uuid`, productVariationCtrl.getCtrl);

    /**
     * @swagger
     * /product-variation:
     *   post:
     *     summary: Crear una nueva variación de producto
     *     tags:
     *       - Product-Variations
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProductVariationDto'
     *     responses:
     *       200:
     *         description: Variación creada con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/product-variation`, productVariationCtrl.insertCtrl);

    /**
     * @swagger
     * /product-variation/{cmp_uuid}/{pro_uuid}/{prov_uuid}:
     *   put:
     *     summary: Actualizar una variación de producto
     *     tags:
     *       - Product-Variations
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateProductVariationDto'
     *     responses:
     *       200:
     *         description: Variación actualizada con éxito.
     */
    app.put(`/${process.env.BASE_URL_API}/product-variation/:cmp_uuid/:pro_uuid/:prov_uuid`, productVariationCtrl.updateCtrl);

    /**
     * @swagger
     * /product-variation/{cmp_uuid}/{pro_uuid}/{prov_uuid}:
     *   delete:
     *     summary: Eliminar una variación de producto
     *     tags:
     *       - Product-Variations
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
     *     responses:
     *       200:
     *         description: Variación eliminada con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/product-variation/:cmp_uuid/:pro_uuid/:prov_uuid`, productVariationCtrl.deleteCtrl);

    /**
     * @swagger
     * /check-stock/{cmp_uuid}/{pro_uuid}/{prov_uuid}:
     *   get:
     *     summary: Verificar disponibilidad de stock para una variación
     *     tags:
     *       - Product-Variations
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
     *     responses:
     *       200:
     *         description: Stock retornado.
     */
    app.get(`/${process.env.BASE_URL_API}/check-stock/:cmp_uuid/:pro_uuid/:prov_uuid`, productVariationCtrl.checkStockCtrl);

    /**
     * @swagger
     * /products-variations-search:
     *   get:
     *     summary: Búsqueda global de variaciones de producto
     *     tags:
     *       - Product-Variations
     *     parameters:
     *       - in: query
     *         name: q
     *         schema:
     *           type: string
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
     *         description: Resultados de búsqueda retornados.
     */
    app.get(`/${process.env.BASE_URL_API}/products-variations-search`, productVariationCtrl.searchCtrl);
}

export default configureProductVariationRoutes;
