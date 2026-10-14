import { Express } from "express";
import { SequelizeRepository } from "../../repository/resource-type/sequelize-resource-type.repository";
import { ResourceTypeUseCase } from "../../../application/resource-type/resource-type-use-case";
import { ResourceTypeController } from "../../controller/resource-type/resource-type.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureResourceTypeRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeResourceTypeRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const resourceTypeUseCase = new ResourceTypeUseCase(sequelizeResourceTypeRepository);
    
    /*
    *   Iniciar controller
    */
    
    const resourceTypeCtrl = new ResourceTypeController(resourceTypeUseCase, socketAdapter);
    
    /**
     * @swagger
     * /resources-types:
     *   get:
     *     summary: Obtener lista de tipos de recursos
     *     tags:
     *       - Resource-Types
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
     *         description: Tipos de recursos retornados.
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
     *                     $ref: '#/components/schemas/ResourceTypeEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/resources-types/:filter?/:page?/:perPage?`, resourceTypeCtrl.getAllCtrl);

    /**
     * @swagger
     * /resource-type/{rety_uuid}:
     *   get:
     *     summary: Obtener detalle de un tipo de recurso por UUID
     *     tags:
     *       - Resource-Types
     *     parameters:
     *       - in: path
     *         name: rety_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Tipo de recurso retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/ResourceTypeEntity'
     *       400:
     *         description: Tipo de recurso no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/resource-type/:rety_uuid`, resourceTypeCtrl.getCtrl);

    /**
     * @swagger
     * /resource-type:
     *   post:
     *     summary: Crear un nuevo tipo de recurso
     *     tags:
     *       - Resource-Types
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateResourceTypeDto'
     *     responses:
     *       200:
     *         description: Tipo de recurso creado con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/resource-type`, resourceTypeCtrl.insertCtrl);

    /**
     * @swagger
     * /resource-type/{rety_uuid}:
     *   put:
     *     summary: Actualizar un tipo de recurso
     *     tags:
     *       - Resource-Types
     *     parameters:
     *       - in: path
     *         name: rety_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateResourceTypeDto'
     *     responses:
     *       200:
     *         description: Tipo de recurso actualizado.
     */
    app.put(`/${process.env.BASE_URL_API}/resource-type/:rety_uuid`, resourceTypeCtrl.updateCtrl);

    /**
     * @swagger
     * /resource-type/{rety_uuid}:
     *   delete:
     *     summary: Eliminar un tipo de recurso por UUID
     *     tags:
     *       - Resource-Types
     *     parameters:
     *       - in: path
     *         name: rety_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Tipo de recurso eliminado con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/resource-type/:rety_uuid`, resourceTypeCtrl.deleteCtrl);
}

export default configureResourceTypeRoutes;
