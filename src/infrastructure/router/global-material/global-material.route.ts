import { Express } from "express";
import { SequelizeRepository as SequelizeGlobalMaterialRepository } from "../../repository/global-material/sequelize-global-material.repository";
import { GlobalMaterialUseCase } from "../../../application/global-material/global-material-use-case";
import { GlobalMaterialController } from "../../controller/global-material/global-material.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureGlobalMaterialRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeGlobalMaterialRepository = new SequelizeGlobalMaterialRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const globalMaterialUseCase = new GlobalMaterialUseCase(sequelizeGlobalMaterialRepository);
    
    /*
    *   Iniciar controller
    */
    
    const globalMaterialCtrl = new GlobalMaterialController(globalMaterialUseCase, socketAdapter);
    
    /**
     * @swagger
     * /global-materials:
     *   get:
     *     summary: Obtener lista de materiales globales
     *     tags:
     *       - Global-Materials
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
     *         description: Materiales globales retornados.
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
     *                     $ref: '#/components/schemas/GlobalMaterialEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/global-materials/:filter?/:page?/:perPage?`, globalMaterialCtrl.getAllCtrl);

    /**
     * @swagger
     * /global-material/{gmat_uuid}:
     *   get:
     *     summary: Obtener detalle de un material global por UUID
     *     tags:
     *       - Global-Materials
     *     parameters:
     *       - in: path
     *         name: gmat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Material global retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/GlobalMaterialEntity'
     *       400:
     *         description: Material global no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/global-material/:gmat_uuid`, globalMaterialCtrl.getCtrl);

    /**
     * @swagger
     * /global-material:
     *   post:
     *     summary: Crear un nuevo material global
     *     tags:
     *       - Global-Materials
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateGlobalMaterialDto'
     *     responses:
     *       200:
     *         description: Material global creado con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/global-material`, globalMaterialCtrl.insertCtrl);

    /**
     * @swagger
     * /global-material/{gmat_uuid}:
     *   put:
     *     summary: Actualizar un material global
     *     tags:
     *       - Global-Materials
     *     parameters:
     *       - in: path
     *         name: gmat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateGlobalMaterialDto'
     *     responses:
     *       200:
     *         description: Material global actualizado.
     */
    app.put(`/${process.env.BASE_URL_API}/global-material/:gmat_uuid`, globalMaterialCtrl.updateCtrl);

    /**
     * @swagger
     * /global-material/{gmat_uuid}:
     *   delete:
     *     summary: Eliminar un material global por UUID
     *     tags:
     *       - Global-Materials
     *     parameters:
     *       - in: path
     *         name: gmat_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Material global eliminado con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/global-material/:gmat_uuid`, globalMaterialCtrl.deleteCtrl);
}

export default configureGlobalMaterialRoutes;
