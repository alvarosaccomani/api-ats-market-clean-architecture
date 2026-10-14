import { Express } from "express";
import { SequelizeRepository as SequelizeProductRepository } from "../../repository/product/sequelize-product.repository";
import { SequelizeRepository as SequelizeProductVariationRepository } from "../../repository/product-variation/sequelize-product-variation.repository";
import { ProductUseCase } from "../../../application/product/product-use-case";
import { ProductController } from "../../controller/product/product.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureProductRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeProductRepository = new SequelizeProductRepository();
    const sequelizeProductVariationRepository = new SequelizeProductVariationRepository();
    
    /*
    *   Iniciar caso de uso
    */
    
    const productUseCase = new ProductUseCase(sequelizeProductRepository, sequelizeProductVariationRepository);
    
    /*
    *   Iniciar controller
    */
    
    const productCtrl = new ProductController(productUseCase, socketAdapter);
    
    /**
     * @swagger
     * /products/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de productos de una empresa
     *     tags:
     *       - Products
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
     *         description: Productos retornados.
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
     *                     $ref: '#/components/schemas/ProductEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/products/:cmp_uuid/:filter?/:page?/:perPage?`, productCtrl.getAllCtrl);

    /**
     * @swagger
     * /product/{cmp_uuid}/{pro_uuid}:
     *   get:
     *     summary: Obtener detalle de un producto por UUID
     *     tags:
     *       - Products
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
     *     responses:
     *       200:
     *         description: Producto retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/ProductEntity'
     *       400:
     *         description: Producto no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/product/:cmp_uuid/:pro_uuid`, productCtrl.getCtrl);

    /**
     * @swagger
     * /product:
     *   post:
     *     summary: Crear un nuevo producto
     *     tags:
     *       - Products
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProductDto'
     *     responses:
     *       200:
     *         description: Producto creado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/product`, authMiddleware, productCtrl.insertCtrl);

    /**
     * @swagger
     * /products/bulk:
     *   post:
     *     summary: Carga masiva de productos
     *     tags:
     *       - Products
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               products:
     *                 type: array
     *                 items:
     *                   $ref: '#/components/schemas/CreateProductDto'
     *     responses:
     *       200:
     *         description: Productos creados en lote.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/products/bulk`, authMiddleware, productCtrl.bulkInsertCtrl);

    /**
     * @swagger
     * /product/{cmp_uuid}/{pro_uuid}:
     *   put:
     *     summary: Actualizar un producto
     *     tags:
     *       - Products
     *     security:
     *       - bearerAuth: []
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateProductDto'
     *     responses:
     *       200:
     *         description: Producto actualizado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/product/:cmp_uuid/:pro_uuid`, authMiddleware, productCtrl.updateCtrl);

    /**
     * @swagger
     * /product/{cmp_uuid}/{pro_uuid}:
     *   delete:
     *     summary: Eliminar un producto
     *     tags:
     *       - Products
     *     security:
     *       - bearerAuth: []
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
     *     responses:
     *       200:
     *         description: Producto eliminado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/product/:cmp_uuid/:pro_uuid`, authMiddleware, productCtrl.deleteCtrl);
}

export default configureProductRoutes;
