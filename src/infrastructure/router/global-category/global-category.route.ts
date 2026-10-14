import { Express } from "express";
import { SequelizeRepository as SequelizeGlobalCategoryRepository } from "../../repository/global-category/sequelize-global-category.repository";
import { GlobalCategoryUseCase } from "../../../application/global-category/global-category-use-case";
import { GlobalCategoryController } from "../../controller/global-category/global-category.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureGlobalCategoryRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeGlobalCategoryRepository = new SequelizeGlobalCategoryRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const globalCategoryUseCase = new GlobalCategoryUseCase(sequelizeGlobalCategoryRepository);
    
    /*
    *   Iniciar controller
    */
    
    const globalCategoryCtrl = new GlobalCategoryController(globalCategoryUseCase, socketAdapter);
    
    /**
     * @swagger
     * /global-categories:
     *   get:
     *     summary: Obtener lista de categorías globales
     *     tags:
     *       - Global-Categories
     *     parameters:
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
     *         description: Categorías globales retornadas.
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
     *                     $ref: '#/components/schemas/GlobalCategoryEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/global-categories/:filter?/:page?/:perPage?`, globalCategoryCtrl.getAllCtrl);

    /**
     * @swagger
     * /global-category/{gitm_uuid}/{gcat_uuid}:
     *   get:
     *     summary: Obtener detalle de una categoría global
     *     tags:
     *       - Global-Categories
     *     parameters:
     *       - in: path
     *         name: gitm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: gcat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Categoría global retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/GlobalCategoryEntity'
     *       400:
     *         description: Categoría global no encontrada.
     */
    app.get(`/${process.env.BASE_URL_API}/global-category/:gitm_uuid/:gcat_uuid`, globalCategoryCtrl.getCtrl);

    /**
     * @swagger
     * /global-category:
     *   post:
     *     summary: Crear una nueva categoría global
     *     tags:
     *       - Global-Categories
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateGlobalCategoryDto'
     *     responses:
     *       200:
     *         description: Categoría global creada con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/global-category`, globalCategoryCtrl.insertCtrl);

    /**
     * @swagger
     * /global-category/{gitm_uuid}/{gcat_uuid}:
     *   put:
     *     summary: Actualizar una categoría global
     *     tags:
     *       - Global-Categories
     *     parameters:
     *       - in: path
     *         name: gitm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: gcat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateGlobalCategoryDto'
     *     responses:
     *       200:
     *         description: Categoría global actualizada.
     */
    app.put(`/${process.env.BASE_URL_API}/global-category/:gitm_uuid/:gcat_uuid`, globalCategoryCtrl.updateCtrl);

    /**
     * @swagger
     * /global-category/{gitm_uuid}/{gcat_uuid}:
     *   delete:
     *     summary: Eliminar una categoría global
     *     tags:
     *       - Global-Categories
     *     parameters:
     *       - in: path
     *         name: gitm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: gcat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Categoría global eliminada con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/global-category/:gitm_uuid/:gcat_uuid`, globalCategoryCtrl.deleteCtrl);
}

export default configureGlobalCategoryRoutes;
