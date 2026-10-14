import { Express } from "express";
import { SequelizeRepository as SequelizeInventoryStockRepository } from "../../repository/inventory-stock/sequelize-inventory-stock.repository";
import { InventoryStockUseCase } from "../../../application/inventory-stock/inventory-stock-use-case";
import { InventoryStockController } from "../../controller/inventory-stock/inventory-stock.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureInventoryStockRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeInventoryStockRepository = new SequelizeInventoryStockRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const inventoryStockUseCase = new InventoryStockUseCase(sequelizeInventoryStockRepository);
    
    /*
    *   Iniciar controller
    */
    const inventoryStockCtrl = new InventoryStockController(inventoryStockUseCase, socketAdapter);
    
    /**
     * @swagger
     * /inventory-stocks/{cmp_uuid}:
     *   get:
     *     summary: Obtener stock de inventario general de una empresa
     *     tags:
     *       - Inventory-Stock
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
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
     *         description: Stocks retornados.
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
     *                     $ref: '#/components/schemas/InventoryStockEntity'
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/inventory-stocks/:cmp_uuid/:page?/:perPage?`, authMiddleware, inventoryStockCtrl.getAllCtrl);
    
    /**
     * @swagger
     * /inventory-by-variation/{cmp_uuid}/{pro_uuid}/{prov_uuid}:
     *   get:
     *     summary: Obtener stock de inventario filtrado por variación de producto
     *     tags:
     *       - Inventory-Stock
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
     *         description: Stock por variación retornado.
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
     *                     $ref: '#/components/schemas/InventoryStockEntity'
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/inventory-by-variation/:cmp_uuid/:pro_uuid/:prov_uuid/:page?/:perPage?`, authMiddleware, inventoryStockCtrl.getAllCtrl);
    
    /**
     * @swagger
     * /inventory-stock/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{war_uuid}/{warl_uuid}:
     *   get:
     *     summary: Obtener detalle de stock específico por clave compuesta de 5 columnas
     *     tags:
     *       - Inventory-Stock
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
     *       - in: path
     *         name: prov_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: war_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: warl_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Stock retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/InventoryStockEntity'
     *       400:
     *         description: Stock no encontrado.
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/inventory-stock/:cmp_uuid/:pro_uuid/:prov_uuid/:war_uuid/:warl_uuid`, authMiddleware, inventoryStockCtrl.getCtrl);
    
    /**
     * @swagger
     * /inventory-stock:
     *   post:
     *     summary: Registrar stock individual en ubicación
     *     tags:
     *       - Inventory-Stock
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateInventoryStockDto'
     *     responses:
     *       200:
     *         description: Stock registrado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/inventory-stock`, authMiddleware, inventoryStockCtrl.insertCtrl);
    
    /**
     * @swagger
     * /inventory-stock/batch:
     *   post:
     *     summary: Registro de stock en lote (batch)
     *     tags:
     *       - Inventory-Stock
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BatchCreateInventoryStockDto'
     *     responses:
     *       200:
     *         description: Stocks registrados en lote con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/inventory-stock/batch`, authMiddleware, inventoryStockCtrl.insertBatchCtrl);
    app.post(`/${process.env.BASE_URL_API}/inventory-stocks/batch`, authMiddleware, inventoryStockCtrl.insertBatchCtrl);
    
    /**
     * @swagger
     * /inventory-stock/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{war_uuid}/{warl_uuid}:
     *   put:
     *     summary: Actualizar cantidad de stock en una ubicación
     *     tags:
     *       - Inventory-Stock
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
     *       - in: path
     *         name: prov_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: war_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: warl_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateInventoryStockDto'
     *     responses:
     *       200:
     *         description: Stock actualizado.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/inventory-stock/:cmp_uuid/:pro_uuid/:prov_uuid/:war_uuid/:warl_uuid`, authMiddleware, inventoryStockCtrl.updateCtrl);

    /**
     * @swagger
     * /inventory-stock/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{war_uuid}/{warl_uuid}:
     *   delete:
     *     summary: Eliminar registro de stock por clave compuesta
     *     tags:
     *       - Inventory-Stock
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
     *       - in: path
     *         name: prov_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: war_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: warl_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Stock eliminado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/inventory-stock/:cmp_uuid/:pro_uuid/:prov_uuid/:war_uuid/:warl_uuid`, authMiddleware, inventoryStockCtrl.deleteCtrl);
}

export default configureInventoryStockRoutes;
