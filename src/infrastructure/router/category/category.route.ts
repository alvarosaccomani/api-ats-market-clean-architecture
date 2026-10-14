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
    
    app.get(`/${process.env.BASE_URL_API}/categories/:cmp_uuid/:itm_uuid?/:filter?/:page?/:perPage?`, categoryCtrl.getAllCtrl);
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
     *             type: object
     *             required:
     *               - cmp_uuid
     *               - cat_name
     *             properties:
     *               cmp_uuid:
     *                 type: string
     *                 format: uuid
     *                 example: 550e8400-e29b-41d4-a716-446655440000
     *               cat_name:
     *                 type: string
     *                 example: Bebidas
     *     responses:
     *       201:
     *         description: Categoría creada con éxito.
     *       401:
     *         description: No autorizado - Token Bearer inválido o ausente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.post(`/${process.env.BASE_URL_API}/category`, authMiddleware, categoryCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/category/:cmp_uuid/:cat_uuid/:itm_uuid`, authMiddleware, categoryCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/category/:cmp_uuid/:cat_uuid/:itm_uuid`, authMiddleware, categoryCtrl.deleteCtrl);
}

export default configureCategoryRoutes;
