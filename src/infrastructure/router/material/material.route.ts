import { Express } from "express";
import { SequelizeRepository as SequelizeMaterialRepository } from "../../repository/material/sequelize-material.repository";
import { MaterialUseCase } from "../../../application/material/material-use-case";
import { MaterialController } from "../../controller/material/material.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureMaterialRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeMaterialRepository = new SequelizeMaterialRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const materialUseCase = new MaterialUseCase(sequelizeMaterialRepository);
    
    /*
    *   Iniciar controller
    */
    
    const materialCtrl = new MaterialController(materialUseCase, socketAdapter);
    
    /**
     * @swagger
     * /materials/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de materiales de una empresa
     *     tags:
     *       - Materials
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
     *         description: Materiales retornados.
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
     *                     $ref: '#/components/schemas/MaterialEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/materials/:cmp_uuid/:filter?/:page?/:perPage?`, materialCtrl.getAllCtrl);

    /**
     * @swagger
     * /material/{cmp_uuid}/{mat_uuid}:
     *   get:
     *     summary: Obtener detalle de un material
     *     tags:
     *       - Materials
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: mat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Material retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/MaterialEntity'
     *       400:
     *         description: Material no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/material/:cmp_uuid/:mat_uuid`, materialCtrl.getCtrl);

    /**
     * @swagger
     * /material:
     *   post:
     *     summary: Crear un nuevo material
     *     tags:
     *       - Materials
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateMaterialDto'
     *     responses:
     *       200:
     *         description: Material creado con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/material`, materialCtrl.insertCtrl);

    /**
     * @swagger
     * /material/{cmp_uuid}/{mat_uuid}:
     *   put:
     *     summary: Actualizar un material
     *     tags:
     *       - Materials
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: mat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateMaterialDto'
     *     responses:
     *       200:
     *         description: Material actualizado con éxito.
     */
    app.put(`/${process.env.BASE_URL_API}/material/:cmp_uuid/:mat_uuid`, materialCtrl.updateCtrl);

    /**
     * @swagger
     * /material/{cmp_uuid}/{mat_uuid}:
     *   delete:
     *     summary: Eliminar un material
     *     tags:
     *       - Materials
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: mat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Material eliminado con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/material/:cmp_uuid/:mat_uuid`, materialCtrl.deleteCtrl);
}

export default configureMaterialRoutes;
