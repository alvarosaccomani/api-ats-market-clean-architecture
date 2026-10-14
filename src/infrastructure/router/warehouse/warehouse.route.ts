import { Express } from "express";
import { SequelizeRepository as SequelizeWarehouseRepository } from "../../repository/warehouse/sequelize-warehouse.repository";
import { WarehouseUseCase } from "../../../application/warehouse/warehouse-use-case";
import { WarehouseController } from "../../controller/warehouse/warehouse.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureWarehouseRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeWarehouseRepository = new SequelizeWarehouseRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const warehouseUseCase = new WarehouseUseCase(sequelizeWarehouseRepository);
    
    /*
    *   Iniciar controller
    */
    const warehouseCtrl = new WarehouseController(warehouseUseCase, socketAdapter);
    
    /**
     * @swagger
     * /warehouses/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de depósitos de una empresa
     *     tags:
     *       - Warehouses
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
     *         description: Depósitos retornados.
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
     *                     $ref: '#/components/schemas/WarehouseEntity'
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/warehouses/:cmp_uuid/:page?/:perPage?`, authMiddleware, warehouseCtrl.getAllCtrl);

    /**
     * @swagger
     * /warehouse/{cmp_uuid}/{war_uuid}:
     *   get:
     *     summary: Obtener detalle de un depósito por UUID
     *     tags:
     *       - Warehouses
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
     *         name: war_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Depósito retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/WarehouseEntity'
     *       400:
     *         description: Depósito no encontrado.
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/warehouse/:cmp_uuid/:war_uuid`, authMiddleware, warehouseCtrl.getCtrl);

    /**
     * @swagger
     * /warehouse:
     *   post:
     *     summary: Crear un nuevo depósito
     *     tags:
     *       - Warehouses
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateWarehouseDto'
     *     responses:
     *       200:
     *         description: Depósito creado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/warehouse`, authMiddleware, warehouseCtrl.insertCtrl);

    /**
     * @swagger
     * /warehouse/{cmp_uuid}/{war_uuid}:
     *   put:
     *     summary: Actualizar un depósito existente
     *     tags:
     *       - Warehouses
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
     *         name: war_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateWarehouseDto'
     *     responses:
     *       200:
     *         description: Depósito actualizado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/warehouse/:cmp_uuid/:war_uuid`, authMiddleware, warehouseCtrl.updateCtrl);

    /**
     * @swagger
     * /warehouse/{cmp_uuid}/{war_uuid}:
     *   delete:
     *     summary: Eliminar un depósito por UUID
     *     tags:
     *       - Warehouses
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
     *         name: war_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Depósito eliminado con éxito.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/warehouse/:cmp_uuid/:war_uuid`, authMiddleware, warehouseCtrl.deleteCtrl);
}

export default configureWarehouseRoutes;
