import { Express } from "express";
import { SequelizeRepository } from "../../repository/rol-permission/sequelize-rol-permission.repository";
import { RolPermissionUseCase } from "../../../application/rol-permission/rol-permission-use-case";
import { RolPermissionController } from "../../controller/rol-permission/rol-permission.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureRolPermissionRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeRolPermissionRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const rolPermissionUseCase = new RolPermissionUseCase(sequelizeRolPermissionRepository);
    
    /*
    *   Iniciar controller
    */
    
    const rolPermissionCtrl = new RolPermissionController(rolPermissionUseCase, socketAdapter);
    
    /**
     * @swagger
     * /rol-permissions:
     *   get:
     *     summary: Obtener lista de relaciones rol-permiso
     *     tags:
     *       - Role-Permissions
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
     *         description: Relaciones rol-permiso retornadas.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/RolPermissionEntity'
     */
    app.get(`/${process.env.BASE_URL_API}/rol-permissions/:filter?/:page?/:perPage?`, rolPermissionCtrl.getAllCtrl);

    /**
     * @swagger
     * /rol-permission/{rol_uuid}/{per_uuid}:
     *   get:
     *     summary: Obtener detalle de relación rol-permiso
     *     tags:
     *       - Role-Permissions
     *     parameters:
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: per_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Relación encontrada.
     *       400:
     *         description: No encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/rol-permission/:rol_uuid/:per_uuid`, rolPermissionCtrl.getCtrl);

    /**
     * @swagger
     * /rol-permission:
     *   post:
     *     summary: Asignar un permiso a un rol
     *     tags:
     *       - Role-Permissions
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateRolPermissionDto'
     *     responses:
     *       200:
     *         description: Relación creada con éxito.
     */
    app.post(`/${process.env.BASE_URL_API}/rol-permission`, rolPermissionCtrl.insertCtrl);

    /**
     * @swagger
     * /rol-permission/{rol_uuid}/{per_uuid}:
     *   put:
     *     summary: Actualizar una relación rol-permiso
     *     tags:
     *       - Role-Permissions
     *     parameters:
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: per_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Relación actualizada.
     */
    app.put(`/${process.env.BASE_URL_API}/rol-permission/:rol_uuid/:per_uuid`, rolPermissionCtrl.updateCtrl);

    /**
     * @swagger
     * /rol-permission/{rol_uuid}/{per_uuid}:
     *   delete:
     *     summary: Desvincular un permiso de un rol
     *     tags:
     *       - Role-Permissions
     *     parameters:
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: per_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Permiso desvinculado con éxito.
     */
    app.delete(`/${process.env.BASE_URL_API}/rol-permission/:rol_uuid/:per_uuid`, rolPermissionCtrl.deleteCtrl);

    /**
     * @swagger
     * /rol-permissions-by-role/{rol_uuid}:
     *   get:
     *     summary: Obtener todos los permisos asignados a un rol
     *     tags:
     *       - Role-Permissions
     *     parameters:
     *       - in: path
     *         name: rol_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Permisos del rol retornados.
     */
    app.get(`/${process.env.BASE_URL_API}/rol-permissions-by-role/:rol_uuid`, rolPermissionCtrl.getRolPermissionsByRolCtrl);

    /**
     * @swagger
     * /rol-permissions-by-permission/{per_uuid}:
     *   get:
     *     summary: Obtener todos los roles asociados a un permiso
     *     tags:
     *       - Role-Permissions
     *     parameters:
     *       - in: path
     *         name: per_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Roles asociados al permiso retornados.
     */
    app.get(`/${process.env.BASE_URL_API}/rol-permissions-by-permission/:per_uuid`, rolPermissionCtrl.getRolPermissionsByPermissionCtrl);
}

export default configureRolPermissionRoutes;
