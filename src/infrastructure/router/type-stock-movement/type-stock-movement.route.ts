import { Express } from "express";
import { SequelizeRepository as SequelizeTypeStockMovementRepository } from "../../repository/type-stock-movement/sequelize-type-stock-movement.repository";
import { TypeStockMovementUseCase } from "../../../application/type-stock-movement/type-stock-movement-use-case";
import { TypeStockMovementController } from "../../controller/type-stock-movement/type-stock-movement.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureTypeStockMovementRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeTypeStockMovementRepository = new SequelizeTypeStockMovementRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const typeStockMovementUseCase = new TypeStockMovementUseCase(sequelizeTypeStockMovementRepository);
    
    /*
    *   Iniciar controller
    */
    const typeStockMovementCtrl = new TypeStockMovementController(typeStockMovementUseCase, socketAdapter);
    
    /**
     * @swagger
     * /type-stock-movements:
     *   get:
     *     summary: Obtener lista de tipos de movimientos de stock
     *     tags:
     *       - Type-Stock-Movements
     *     parameters:
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
     *         description: Tipos de movimientos retornados.
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
     *                     $ref: '#/components/schemas/TypeStockMovementEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/type-stock-movements/:page?/:perPage?`, typeStockMovementCtrl.getAllCtrl);

    /**
     * @swagger
     * /type-stock-movement/{tsmo_uuid}:
     *   get:
     *     summary: Obtener detalle de un tipo de movimiento por UUID
     *     tags:
     *       - Type-Stock-Movements
     *     parameters:
     *       - in: path
     *         name: tsmo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Tipo de movimiento retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/TypeStockMovementEntity'
     *       400:
     *         description: Tipo de movimiento no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/type-stock-movement/:tsmo_uuid`, typeStockMovementCtrl.getCtrl);

    /**
     * @swagger
     * /type-stock-movement:
     *   post:
     *     summary: Crear un nuevo tipo de movimiento de stock
     *     tags:
     *       - Type-Stock-Movements
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateTypeStockMovementDto'
     *     responses:
     *       200:
     *         description: Tipo de movimiento creado con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/type-stock-movement`, typeStockMovementCtrl.insertCtrl);

    /**
     * @swagger
     * /type-stock-movement/{tsmo_uuid}:
     *   put:
     *     summary: Actualizar un tipo de movimiento
     *     tags:
     *       - Type-Stock-Movements
     *     parameters:
     *       - in: path
     *         name: tsmo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateTypeStockMovementDto'
     *     responses:
     *       200:
     *         description: Tipo de movimiento actualizado.
     */
    app.put(`/${process.env.BASE_URL_API}/type-stock-movement/:tsmo_uuid`, typeStockMovementCtrl.updateCtrl);

    /**
     * @swagger
     * /type-stock-movement/{tsmo_uuid}:
     *   delete:
     *     summary: Eliminar un tipo de movimiento por UUID
     *     tags:
     *       - Type-Stock-Movements
     *     parameters:
     *       - in: path
     *         name: tsmo_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Tipo de movimiento eliminado con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/type-stock-movement/:tsmo_uuid`, typeStockMovementCtrl.deleteCtrl);
}

export default configureTypeStockMovementRoutes;
