import { Express } from "express";
import { SequelizeRepository } from "../../repository/cost-per-supplier/sequelize-cost-per-supplier.repository";
import { CostPerSupplierUseCase } from "../../../application/cost-per-supplier/cost-per-supplier-use-case";
import { CostPerSupplierController } from "../../controller/cost-per-supplier/cost-per-supplier.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCostPerSupplierRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCostPerSupplierRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const costPerSupplierUseCase = new CostPerSupplierUseCase(sequelizeCostPerSupplierRepository);
    
    /*
    *   Iniciar controller
    */
    
    const costPerSupplierCtrl = new CostPerSupplierController(costPerSupplierUseCase, socketAdapter);
    
    /**
     * @swagger
     * /cost-per-suppliers/{cmp_uuid}/{pro_uuid}/{prov_uuid}:
     *   get:
     *     summary: Obtener lista de costos por proveedor para un producto
     *     tags:
     *       - CostPerSupplier
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
     *         description: Costos por proveedor retornados.
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
     *                     $ref: '#/components/schemas/CostPerSupplierEntity'
     *       400:
     *         description: Error al recuperar los costos por proveedor.
     */
    app.get(`/${process.env.BASE_URL_API}/cost-per-suppliers/:cmp_uuid/:pro_uuid/:prov_uuid/:filter?/:page?/:perPage?`, costPerSupplierCtrl.getAllCtrl);

    /**
     * @swagger
     * /cost-per-supplier/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{cps_uuid}:
     *   get:
     *     summary: Obtener detalle de un costo por proveedor específico
     *     tags:
     *       - CostPerSupplier
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
     *         name: cps_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Costo por proveedor retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CostPerSupplierEntity'
     *       400:
     *         description: Costo por proveedor no encontrado o parámetros inválidos.
     */
    app.get(`/${process.env.BASE_URL_API}/cost-per-supplier/:cmp_uuid/:pro_uuid/:prov_uuid/:cps_uuid`, costPerSupplierCtrl.getCtrl);

    /**
     * @swagger
     * /cost-per-supplier:
     *   post:
     *     summary: Registrar un nuevo costo por proveedor
     *     tags:
     *       - CostPerSupplier
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCostPerSupplierDto'
     *     responses:
     *       200:
     *         description: Costo por proveedor insertado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CostPerSupplierEntity'
     *       400:
     *         description: Error al insertar el costo por proveedor o registro duplicado.
     */
    app.post(`/${process.env.BASE_URL_API}/cost-per-supplier`, costPerSupplierCtrl.insertCtrl);

    /**
     * @swagger
     * /cost-per-supplier/{cmp_uuid}/{pro_uuid}/{prov_uuid}:
     *   put:
     *     summary: Actualizar un costo por proveedor existente
     *     tags:
     *       - CostPerSupplier
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateCostPerSupplierDto'
     *     responses:
     *       200:
     *         description: Costo por proveedor actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CostPerSupplierEntity'
     *       400:
     *         description: Error al actualizar el costo por proveedor.
     */
    app.put(`/${process.env.BASE_URL_API}/cost-per-supplier/:cmp_uuid/:pro_uuid/:prov_uuid`, costPerSupplierCtrl.updateCtrl);

    /**
     * @swagger
     * /cost-per-supplier/{cmp_uuid}/{pro_uuid}/{prov_uuid}/{cps_uuid}:
     *   delete:
     *     summary: Eliminar un costo por proveedor por UUID
     *     tags:
     *       - CostPerSupplier
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
     *         name: cps_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Costo por proveedor eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar el costo por proveedor.
     */
    app.delete(`/${process.env.BASE_URL_API}/cost-per-supplier/:cmp_uuid/:pro_uuid/:prov_uuid/:cps_uuid`, costPerSupplierCtrl.deleteCtrl);
}

export default configureCostPerSupplierRoutes;
