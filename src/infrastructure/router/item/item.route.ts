import { Express } from "express";
import { SequelizeRepository as SequelizeItemRepository } from "../../repository/item/sequelize-item.repository";
import { ItemUseCase } from "../../../application/item/item-use-case";
import { ItemController } from "../../controller/item/item.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeItemRepository = new SequelizeItemRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const itemUseCase = new ItemUseCase(sequelizeItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const itemCtrl = new ItemController(itemUseCase, socketAdapter);
    
    /**
     * @swagger
     * /items/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de items (rubros) de una empresa
     *     tags:
     *       - Items
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
     *         description: Items retornados.
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
     *                     $ref: '#/components/schemas/ItemEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/items/:cmp_uuid/:filter?/:page?/:perPage?`, itemCtrl.getAllCtrl);

    /**
     * @swagger
     * /item/{cmp_uuid}/{itm_uuid}:
     *   get:
     *     summary: Obtener detalle de un item
     *     tags:
     *       - Items
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
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
     *         description: Item retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/ItemEntity'
     *       400:
     *         description: Item no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/item/:cmp_uuid/:itm_uuid`, itemCtrl.getCtrl);

    /**
     * @swagger
     * /item:
     *   post:
     *     summary: Crear un nuevo item
     *     tags:
     *       - Items
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateItemDto'
     *     responses:
     *       200:
     *         description: Item creado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/item`, authMiddleware, itemCtrl.insertCtrl);

    /**
     * @swagger
     * /item/{cmp_uuid}/{itm_uuid}:
     *   put:
     *     summary: Actualizar un item
     *     tags:
     *       - Items
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
     *             $ref: '#/components/schemas/UpdateItemDto'
     *     responses:
     *       200:
     *         description: Item actualizado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/item/:cmp_uuid/:itm_uuid`, authMiddleware, itemCtrl.updateCtrl);

    /**
     * @swagger
     * /item/{cmp_uuid}/{itm_uuid}:
     *   delete:
     *     summary: Eliminar un item
     *     tags:
     *       - Items
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
     *         name: itm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Item eliminado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/item/:cmp_uuid/:itm_uuid`, authMiddleware, itemCtrl.deleteCtrl);
}

export default configureItemRoutes;
