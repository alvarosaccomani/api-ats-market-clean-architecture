import { Express } from "express";
import { SequelizeRepository } from "../../repository/user/sequelize-user.repository";
import { UserUseCase } from "../../../application/user/user-use-case";
import { UserController } from "../../../infrastructure/controller/user/user.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureUserRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeUserRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const userUseCase = new UserUseCase(sequelizeUserRepository);
    
    /*
    *   Iniciar controller
    */
    
    const userCtrl = new UserController(userUseCase, socketAdapter);
    
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Obtiene la lista de usuarios registrados.
     *     description: Retorna una lista de todos los usuarios registrados en el sistema.
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Operación exitosa. Retorna un objeto con los datos de los usuarios.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indica si la operación fue exitosa.
     *                   example: true
     *                 message:
     *                   type: string
     *                   description: Mensaje descriptivo de la operación.
     *                   example: Usuarios retornados.
     *                 data:
     *                   type: array
     *                   description: Lista de usuarios registrados.
     *                   items:
     *                     $ref: '#/components/schemas/UserEntity'
     *       401:
     *         description: Token no provisto o inválido.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.get(`/${process.env.BASE_URL_API}/users/:filter?/:page?/:perPage?`, authMiddleware, userCtrl.getAllCtrl);

    /**
     * @swagger
     * /user/{usr_uuid}:
     *   get:
     *     summary: Obtener detalle de usuario por UUID
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Identificador único del usuario
     *     responses:
     *       200:
     *         description: Usuario retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Usuario retornado."
     *                 data:
     *                   $ref: '#/components/schemas/UserEntity'
     *       400:
     *         description: UUID no provisto o usuario no encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       401:
     *         description: No autorizado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    app.get(`/${process.env.BASE_URL_API}/user/:usr_uuid`, authMiddleware, userCtrl.getCtrl);

    /**
     * @swagger
     * /user:
     *   post:
     *     summary: Crear un nuevo usuario manualmente
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateUserDto'
     *     responses:
     *       200:
     *         description: Usuario insertado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Usuario insertado."
     *                 data:
     *                   $ref: '#/components/schemas/UserEntity'
     *       400:
     *         description: Error en datos enviados o usuario ya existente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/user`, authMiddleware, userCtrl.insertCtrl);

    /**
     * @swagger
     * /user/{usr_uuid}:
     *   put:
     *     summary: Actualizar datos de un usuario
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateUserDto'
     *     responses:
     *       200:
     *         description: Usuario actualizado con éxito.
     *       400:
     *         description: Error al actualizar usuario.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/user/:usr_uuid`, authMiddleware, userCtrl.updateCtrl);

    /**
     * @swagger
     * /user/{usr_uuid}:
     *   delete:
     *     summary: Eliminar un usuario por UUID
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Usuario eliminado con éxito.
     *       400:
     *         description: Error al eliminar usuario.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/user/:usr_uuid`, authMiddleware, userCtrl.deleteCtrl);
}

export default configureUserRoutes;