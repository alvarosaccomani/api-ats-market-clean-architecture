import { Express } from "express";
import { SequelizeRepository as SequelizeMenuRepository } from "../../repository/menu/sequelize-menu.repository";
import { MenuUseCase } from "../../../application/menu/menu-use-case";
import { MenuController } from "../../controller/menu/menu.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureMenuRoutes(app: Express) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeMenuRepository = new SequelizeMenuRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const menuUseCase = new MenuUseCase(sequelizeMenuRepository);
    
    /*
    *   Iniciar controller
    */
    
    const menuCtrl = new MenuController(menuUseCase);

    /**
     * @swagger
     * /menus:
     *   get:
     *     summary: Obtener lista plana de todos los menús
     *     tags:
     *       - Menus
     *     responses:
     *       200:
     *         description: Menús retornados.
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
     *                     $ref: '#/components/schemas/MenuEntity'
     *       400:
     *         description: Error al recuperar los menús.
     */
    app.get(`/${process.env.BASE_URL_API}/menus`, menuCtrl.getAllCtrl);

    /**
     * @swagger
     * /menu-tree:
     *   get:
     *     summary: Obtener el árbol jerárquico de menús y submenús para navegación
     *     tags:
     *       - Menus
     *     responses:
     *       200:
     *         description: Árbol de navegación retornado con éxito.
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
     *                     $ref: '#/components/schemas/MenuItemTree'
     *       400:
     *         description: Error al generar el árbol de menús.
     */
    app.get(`/${process.env.BASE_URL_API}/menu-tree`, menuCtrl.getMenuItemsCtrl);

    /**
     * @swagger
     * /menu/{mnu_uuid}:
     *   get:
     *     summary: Obtener detalle de un menú por UUID
     *     tags:
     *       - Menus
     *     parameters:
     *       - in: path
     *         name: mnu_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Menú retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/MenuEntity'
     *       400:
     *         description: Menú no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/menu/:mnu_uuid`, menuCtrl.getDetailCtrl);

    /**
     * @swagger
     * /menu:
     *   post:
     *     summary: Crear un nuevo ítem de menú
     *     tags:
     *       - Menus
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateMenuDto'
     *     responses:
     *       200:
     *         description: Menú creado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/MenuEntity'
     *       400:
     *         description: Error al crear el menú.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/menu`, authMiddleware, menuCtrl.insertCtrl);

    /**
     * @swagger
     * /menu/{mnu_uuid}:
     *   put:
     *     summary: Actualizar un ítem de menú existente
     *     tags:
     *       - Menus
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: mnu_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateMenuDto'
     *     responses:
     *       200:
     *         description: Menú actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/MenuEntity'
     *       400:
     *         description: Error al actualizar el menú.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/menu/:mnu_uuid`, authMiddleware, menuCtrl.updateCtrl);

    /**
     * @swagger
     * /menu/{mnu_uuid}:
     *   delete:
     *     summary: Eliminar un ítem de menú por UUID
     *     tags:
     *       - Menus
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: mnu_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Menú eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar el menú.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/menu/:mnu_uuid`, authMiddleware, menuCtrl.deleteCtrl);
}

export default configureMenuRoutes;
