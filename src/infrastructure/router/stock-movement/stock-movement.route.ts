import { Express } from "express";
import { SequelizeRepository as SequelizeStockMovementRepository } from "../../repository/stock-movement/sequelize-stock-movement.repository";
import { SequelizeRepository as SequelizeInventoryStockRepository } from "../../repository/inventory-stock/sequelize-inventory-stock.repository";
import { SequelizeRepository as SequelizeProductVariationRepository } from "../../repository/product-variation/sequelize-product-variation.repository";
import { StockMovementUseCase } from "../../../application/stock-movement/stock-movement-use-case";
import { StockMovementController } from "../../controller/stock-movement/stock-movement.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureStockMovementRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeStockMovementRepository = new SequelizeStockMovementRepository();
    const sequelizeInventoryStockRepository = new SequelizeInventoryStockRepository();
    const sequelizeProductVariationRepository = new SequelizeProductVariationRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const stockMovementUseCase = new StockMovementUseCase(
        sequelizeStockMovementRepository,
        sequelizeInventoryStockRepository,
        sequelizeProductVariationRepository
    );
    
    /*
    *   Iniciar controller
    */
    const stockMovementCtrl = new StockMovementController(stockMovementUseCase, socketAdapter);
    
    /**
     * @swagger
     * /stock-movements/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de movimientos de stock de una empresa
     *     tags:
     *       - Stock-Movements
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
     *         description: Movimientos de stock retornados.
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
     *                     $ref: '#/components/schemas/StockMovementEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/stock-movements/:cmp_uuid/:page?/:perPage?`, stockMovementCtrl.getAllCtrl);

    /**
     * @swagger
     * /stock-movement/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{smo_uuid}:
     *   get:
     *     summary: Obtener detalle de un movimiento de stock por clave compuesta
     *     tags:
     *       - Stock-Movements
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
     *         name: smo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Movimiento de stock retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/StockMovementEntity'
     *       400:
     *         description: Movimiento no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/stock-movement/:cmp_uuid/:pro_uuid/:prov_uuid/:smo_uuid`, stockMovementCtrl.getCtrl);

    /**
     * @swagger
     * /stock-movement:
     *   post:
     *     summary: Registrar un nuevo movimiento de stock
     *     tags:
     *       - Stock-Movements
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateStockMovementDto'
     *     responses:
     *       200:
     *         description: Movimiento de stock registrado con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/stock-movement`, stockMovementCtrl.insertCtrl);

    /**
     * @swagger
     * /stock-movement/adjust:
     *   post:
     *     summary: Registrar un ajuste de inventario (físico vs sistema)
     *     tags:
     *       - Stock-Movements
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegisterAdjustmentDto'
     *     responses:
     *       200:
     *         description: Ajuste de stock procesado con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/stock-movement/adjust`, stockMovementCtrl.registerAdjustmentCtrl);

    /**
     * @swagger
     * /stock-movement/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{smo_uuid}:
     *   put:
     *     summary: Actualizar motivo de un movimiento de stock
     *     tags:
     *       - Stock-Movements
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
     *         name: smo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateStockMovementDto'
     *     responses:
     *       200:
     *         description: Movimiento actualizado.
     */
    app.put(`/${process.env.BASE_URL_API}/stock-movement/:cmp_uuid/:pro_uuid/:prov_uuid/:smo_uuid`, stockMovementCtrl.updateCtrl);

    /**
     * @swagger
     * /stock-movement/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{smo_uuid}:
     *   delete:
     *     summary: Eliminar un registro de movimiento de stock
     *     tags:
     *       - Stock-Movements
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
     *         name: smo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Movimiento eliminado con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/stock-movement/:cmp_uuid/:pro_uuid/:prov_uuid/:smo_uuid`, stockMovementCtrl.deleteCtrl);
}

export default configureStockMovementRoutes;
