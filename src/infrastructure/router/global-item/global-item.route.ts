import { Express } from "express";
import { SequelizeRepository as SequelizeGlobalItemRepository } from "../../repository/global-item/sequelize-global-item.repository";
import { GlobalItemUseCase } from "../../../application/global-item/global-item-use-case";
import { GlobalItemController } from "../../controller/global-item/global-item.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureGlobalItemRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeGlobalItemRepository = new SequelizeGlobalItemRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const globalItemUseCase = new GlobalItemUseCase(sequelizeGlobalItemRepository);
    
    /*
    *   Iniciar controller
    */
    
    const globalItemCtrl = new GlobalItemController(globalItemUseCase, socketAdapter);
    
    /**
     * @swagger
     * /global-items:
     *   get:
     *     summary: Obtener lista de rubros/items globales
     *     tags:
     *       - Global-Items
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
     *         description: Items globales retornados.
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
     *                     $ref: '#/components/schemas/GlobalItemEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/global-items/:filter?/:page?/:perPage?`, globalItemCtrl.getAllCtrl);

    /**
     * @swagger
     * /global-item/{gitm_uuid}:
     *   get:
     *     summary: Obtener detalle de un item global
     *     tags:
     *       - Global-Items
     *     parameters:
     *       - in: path
     *         name: gitm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Item global retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/GlobalItemEntity'
     *       400:
     *         description: Item global no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/global-item/:gitm_uuid`, globalItemCtrl.getCtrl);

    /**
     * @swagger
     * /global-item:
     *   post:
     *     summary: Crear un nuevo item global
     *     tags:
     *       - Global-Items
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateGlobalItemDto'
     *     responses:
     *       200:
     *         description: Item global creado con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/global-item`, globalItemCtrl.insertCtrl);

    /**
     * @swagger
     * /global-item/{gitm_uuid}:
     *   put:
     *     summary: Actualizar un item global
     *     tags:
     *       - Global-Items
     *     parameters:
     *       - in: path
     *         name: gitm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateGlobalItemDto'
     *     responses:
     *       200:
     *         description: Item global actualizado.
     */
    app.put(`/${process.env.BASE_URL_API}/global-item/:gitm_uuid`, globalItemCtrl.updateCtrl);

    /**
     * @swagger
     * /global-item/{gitm_uuid}:
     *   delete:
     *     summary: Eliminar un item global
     *     tags:
     *       - Global-Items
     *     parameters:
     *       - in: path
     *         name: gitm_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Item global eliminado con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/global-item/:gitm_uuid`, globalItemCtrl.deleteCtrl);
}

export default configureGlobalItemRoutes;
