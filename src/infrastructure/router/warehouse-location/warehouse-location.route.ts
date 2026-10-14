import { Express } from "express";
import { SequelizeRepository as SequelizeWarehouseLocationRepository } from "../../repository/warehouse-location/sequelize-warehouse-location.repository";
import { WarehouseLocationUseCase } from "../../../application/warehouse-location/warehouse-location-use-case";
import { WarehouseLocationController } from "../../controller/warehouse-location/warehouse-location.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureWarehouseLocationRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeWarehouseLocationRepository = new SequelizeWarehouseLocationRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const warehouseLocationUseCase = new WarehouseLocationUseCase(sequelizeWarehouseLocationRepository);
    
    /*
    *   Iniciar controller
    */
    const warehouseLocationCtrl = new WarehouseLocationController(warehouseLocationUseCase, socketAdapter);
    
    /**
     * @swagger
     * /warehouse-locations/{cmp_uuid}:
     *   get:
     *     summary: Obtener todas las ubicaciones de depósito de una empresa
     *     tags:
     *       - Warehouse-Locations
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
     *         description: Ubicaciones retornadas.
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
     *                     $ref: '#/components/schemas/WarehouseLocationEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/warehouse-locations/:cmp_uuid/:page?/:perPage?`, warehouseLocationCtrl.getAllCtrl);

    /**
     * @swagger
     * /warehouse-locations/{cmp_uuid}/{war_uuid}:
     *   get:
     *     summary: Obtener ubicaciones filtradas por depósito específico
     *     tags:
     *       - Warehouse-Locations
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
     *         description: Ubicaciones del depósito retornadas.
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
     *                     $ref: '#/components/schemas/WarehouseLocationEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/warehouse-locations/:cmp_uuid/:war_uuid/:page?/:perPage?`, warehouseLocationCtrl.getAllCtrl);
    
    /**
     * @swagger
     * /warehouse-location/{cmp_uuid}/{war_uuid}/{warl_uuid}:
     *   get:
     *     summary: Obtener detalle de una ubicación por clave compuesta
     *     tags:
     *       - Warehouse-Locations
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
     *       - in: path
     *         name: warl_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Ubicación retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/WarehouseLocationEntity'
     *       400:
     *         description: Ubicación no encontrada.
     */
    app.get(`/${process.env.BASE_URL_API}/warehouse-location/:cmp_uuid/:war_uuid/:warl_uuid`, warehouseLocationCtrl.getCtrl);
    
    /**
     * @swagger
     * /warehouse-location:
     *   post:
     *     summary: Crear una nueva ubicación en depósito
     *     tags:
     *       - Warehouse-Locations
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateWarehouseLocationDto'
     *     responses:
     *       200:
     *         description: Ubicación creada con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/warehouse-location`, warehouseLocationCtrl.insertCtrl);
    
    /**
     * @swagger
     * /warehouse-location/batch:
     *   post:
     *     summary: Crear ubicaciones en lote (batch)
     *     tags:
     *       - Warehouse-Locations
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BatchCreateWarehouseLocationDto'
     *     responses:
     *       200:
     *         description: Ubicaciones creadas en lote con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/warehouse-location/batch`, warehouseLocationCtrl.insertBatchCtrl);
    app.post(`/${process.env.BASE_URL_API}/warehouse-locations/batch`, warehouseLocationCtrl.insertBatchCtrl);
    
    /**
     * @swagger
     * /warehouse-location/{cmp_uuid}/{war_uuid}/{warl_uuid}:
     *   put:
     *     summary: Actualizar una ubicación de depósito
     *     tags:
     *       - Warehouse-Locations
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
     *             $ref: '#/components/schemas/UpdateWarehouseLocationDto'
     *     responses:
     *       200:
     *         description: Ubicación actualizada.
     */
    app.put(`/${process.env.BASE_URL_API}/warehouse-location/:cmp_uuid/:war_uuid/:warl_uuid`, warehouseLocationCtrl.updateCtrl);

    /**
     * @swagger
     * /warehouse-location/{cmp_uuid}/{war_uuid}/{warl_uuid}:
     *   delete:
     *     summary: Eliminar una ubicación de depósito
     *     tags:
     *       - Warehouse-Locations
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
     *       - in: path
     *         name: warl_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Ubicación eliminada con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/warehouse-location/:cmp_uuid/:war_uuid/:warl_uuid`, warehouseLocationCtrl.deleteCtrl);
}

export default configureWarehouseLocationRoutes;
