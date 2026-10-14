import { Express } from "express";
import { SequelizeRepository as SequelizeSupplierRepository } from "../../repository/supplier/sequelize-supplier.repository";
import { SupplierUseCase } from "../../../application/supplier/supplier-use-case";
import { SupplierController } from "../../controller/supplier/supplier.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureSupplierRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeSupplierRepository = new SequelizeSupplierRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const supplierUseCase = new SupplierUseCase(sequelizeSupplierRepository);
    
    /*
    *   Iniciar controller
    */
    
    const supplierCtrl = new SupplierController(supplierUseCase, socketAdapter);
    
    /**
     * @swagger
     * /suppliers/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de proveedores de una empresa
     *     tags:
     *       - Suppliers
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
     *         description: Proveedores retornados.
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
     *                     $ref: '#/components/schemas/SupplierEntity'
     *       400:
     *         description: Error al recuperar los proveedores.
     */
    app.get(`/${process.env.BASE_URL_API}/suppliers/:cmp_uuid/:filter?/:page?/:perPage?`, supplierCtrl.getAllCtrl);

    /**
     * @swagger
     * /supplier/{cmp_uuid}/{sup_uuid}:
     *   get:
     *     summary: Obtener detalle de un proveedor por empresa y proveedor UUID
     *     tags:
     *       - Suppliers
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: sup_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Proveedor retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/SupplierEntity'
     *       400:
     *         description: Proveedor no encontrado o parámetros inválidos.
     */
    app.get(`/${process.env.BASE_URL_API}/supplier/:cmp_uuid/:sup_uuid`, supplierCtrl.getCtrl);

    /**
     * @swagger
     * /supplier:
     *   post:
     *     summary: Registrar un nuevo proveedor
     *     tags:
     *       - Suppliers
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateSupplierDto'
     *     responses:
     *       200:
     *         description: Proveedor insertado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/SupplierEntity'
     *       400:
     *         description: Error al insertar el proveedor o proveedor duplicado.
     */
    app.post(`/${process.env.BASE_URL_API}/supplier`, supplierCtrl.insertCtrl);

    /**
     * @swagger
     * /supplier/{cmp_uuid}/{sup_uuid}:
     *   put:
     *     summary: Actualizar un proveedor existente
     *     tags:
     *       - Suppliers
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: sup_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateSupplierDto'
     *     responses:
     *       200:
     *         description: Proveedor actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/SupplierEntity'
     *       400:
     *         description: Error al actualizar el proveedor.
     */
    app.put(`/${process.env.BASE_URL_API}/supplier/:cmp_uuid/:sup_uuid`, supplierCtrl.updateCtrl);

    /**
     * @swagger
     * /supplier/{cmp_uuid}/{sup_uuid}:
     *   delete:
     *     summary: Eliminar un proveedor por UUID
     *     tags:
     *       - Suppliers
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: sup_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Proveedor eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar el proveedor.
     */
    app.delete(`/${process.env.BASE_URL_API}/supplier/:cmp_uuid/:sup_uuid`, supplierCtrl.deleteCtrl);
}

export default configureSupplierRoutes;
