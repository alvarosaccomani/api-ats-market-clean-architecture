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
    
    /**
     * @swagger
     * /categories/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de categorías de una empresa
     *     tags:
     *       - Categories
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: itm_uuid
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
     *         description: Categorías retornadas.
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
     *                     $ref: '#/components/schemas/CategoryEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/categories/:cmp_uuid/:itm_uuid?/:filter?/:page?/:perPage?`, categoryCtrl.getAllCtrl);

    /**
     * @swagger
     * /category/{cmp_uuid}/{cat_uuid}/{itm_uuid}:
     *   get:
     *     summary: Obtener detalle de una categoría
     *     tags:
     *       - Categories
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: itm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Categoría retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CategoryEntity'
     *       400:
     *         description: Categoría no encontrada.
     */
    app.get(`/${process.env.BASE_URL_API}/category/:cmp_uuid/:cat_uuid/:itm_uuid`, categoryCtrl.getCtrl);
    
    /**
     * @swagger
     * /category:
     *   post:
     *     summary: Crear una nueva categoría
     *     description: Crea una categoría en el sistema. Requiere token de autorización Bearer.
     *     tags:
     *       - Categories
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCategoryDto'
     *     responses:
     *       200:
     *         description: Categoría creada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CategoryEntity'
     *       401:
     *         description: No autorizado - Token Bearer inválido o ausente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.post(`/${process.env.BASE_URL_API}/category`, authMiddleware, categoryCtrl.insertCtrl);

    /**
     * @swagger
     * /category/{cmp_uuid}/{cat_uuid}/{itm_uuid}:
     *   put:
     *     summary: Actualizar una categoría
     *     tags:
     *       - Categories
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
     *         name: cat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: itm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateCategoryDto'
     *     responses:
     *       200:
     *         description: Categoría actualizada.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/category/:cmp_uuid/:cat_uuid/:itm_uuid`, authMiddleware, categoryCtrl.updateCtrl);

    /**
     * @swagger
     * /category/{cmp_uuid}/{cat_uuid}/{itm_uuid}:
     *   delete:
     *     summary: Eliminar una categoría
     *     tags:
     *       - Categories
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
     *         name: cat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: itm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Categoría eliminada con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/category/:cmp_uuid/:cat_uuid/:itm_uuid`, authMiddleware, categoryCtrl.deleteCtrl);
}

export default configureCategoryRoutes;
