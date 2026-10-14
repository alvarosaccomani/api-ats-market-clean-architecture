import { Express } from "express";
import { SequelizeFavoriteRepository } from "../../repository/favorite/sequelize-favorite.repository";
import { SequelizeRepository as SequelizeAnalyticEventRepository } from "../../repository/analytic-event/sequelize-analytic-event.repository";
import { AnalyticEventUseCase } from "../../../application/analytic-event/analytic-event-use-case";
import { FavoriteUseCase } from "../../../application/favorite/favorite-use-case";
import { FavoriteController } from "../../controller/favorite/favorite.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureFavoriteRoutes(app: Express, socketAdapter: SocketAdapter) {
    const favoriteRepository = new SequelizeFavoriteRepository();
    const analyticEventRepository = new SequelizeAnalyticEventRepository();
    
    const analyticEventUseCase = new AnalyticEventUseCase(analyticEventRepository);
    const favoriteUseCase = new FavoriteUseCase(favoriteRepository, analyticEventUseCase);
    
    const controller = new FavoriteController(favoriteUseCase);

    /**
     * @swagger
     * /favorites:
     *   post:
     *     summary: Agregar un producto/proveedor a favoritos del usuario autenticado
     *     tags:
     *       - Favorites
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateFavoriteDto'
     *     responses:
     *       201:
     *         description: Producto agregado a favoritos con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 data:
     *                   $ref: '#/components/schemas/FavoriteEntity'
     *       400:
     *         description: Faltan parámetros requeridos.
     *       401:
     *         description: Usuario no autenticado.
     *       500:
     *         description: Error interno al agregar favorito.
     */
    app.post(`/${process.env.BASE_URL_API}/favorites`, authMiddleware, controller.addFavoriteCtrl);

    /**
     * @swagger
     * /favorites/{prov_uuid}:
     *   delete:
     *     summary: Eliminar un producto/proveedor de los favoritos del usuario autenticado
     *     tags:
     *       - Favorites
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: prov_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: cmp_uuid
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Producto eliminado de favoritos con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 message:
     *                   type: string
     *                 data:
     *                   type: boolean
     *       400:
     *         description: Falta parámetro prov_uuid.
     *       401:
     *         description: Usuario no autenticado.
     *       500:
     *         description: Error interno al eliminar favorito.
     */
    app.delete(`/${process.env.BASE_URL_API}/favorites/:prov_uuid`, authMiddleware, controller.removeFavoriteCtrl);

    /**
     * @swagger
     * /favorites:
     *   get:
     *     summary: Obtener la lista de favoritos del usuario autenticado
     *     tags:
     *       - Favorites
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: query
     *         name: details
     *         schema:
     *           type: boolean
     *         description: Si es true, retorna los favoritos con detalle completo del producto
     *     responses:
     *       200:
     *         description: Lista de favoritos retornada.
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
     *                     $ref: '#/components/schemas/FavoriteEntity'
     *       401:
     *         description: Usuario no autenticado.
     *       500:
     *         description: Error interno al obtener favoritos.
     */
    app.get(`/${process.env.BASE_URL_API}/favorites`, authMiddleware, controller.getFavoritesCtrl);
}

export default configureFavoriteRoutes;
