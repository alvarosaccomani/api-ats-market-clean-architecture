import { Express } from "express";
import { SequelizeRepository as SequelizeAnalyticEventRepository } from "../../repository/analytic-event/sequelize-analytic-event.repository";
import { AnalyticEventUseCase } from "../../../application/analytic-event/analytic-event-use-case";
import { AnalyticEventController } from "../../controller/analytic-event/analytic-event.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureAnalyticEventRoutes(app: Express, socketAdapter: SocketAdapter) {
    const sequelizeRepository = new SequelizeAnalyticEventRepository();
    const useCase = new AnalyticEventUseCase(sequelizeRepository);
    const controller = new AnalyticEventController(useCase);

    /**
     * @swagger
     * /analytics/track:
     *   post:
     *     summary: Registrar un evento analítico pasivo o activo (visitas, clics, compras)
     *     tags:
     *       - Analytics
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/TrackAnalyticEventDto'
     *     responses:
     *       201:
     *         description: Evento registrado con éxito.
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
     *                   $ref: '#/components/schemas/AnalyticEventEntity'
     *       400:
     *         description: Faltan parámetros requeridos.
     *       500:
     *         description: Error interno al registrar el evento.
     */
    app.post(`/${process.env.BASE_URL_API}/analytics/track`, controller.trackEventCtrl);

    /**
     * @swagger
     * /analytics/summary/{cmp_uuid}:
     *   get:
     *     summary: Obtener el resumen de analíticas de una empresa
     *     tags:
     *       - Analytics
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: query
     *         name: days
     *         schema:
     *           type: integer
     *         description: Cantidad de días hacia atrás para el resumen (por defecto 7)
     *       - in: query
     *         name: prov_uuid
     *         schema:
     *           type: string
     *           format: uuid
     *         description: Filtrar por variación de producto específica
     *     responses:
     *       200:
     *         description: Resumen de analíticas retornado con éxito.
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
     *                   type: object
     *       400:
     *         description: Parámetro cmp_uuid obligatorio.
     *       401:
     *         description: No autorizado.
     *       500:
     *         description: Error al generar el resumen.
     */
    app.get(`/${process.env.BASE_URL_API}/analytics/summary/:cmp_uuid`, authMiddleware, controller.getSummaryCtrl);
}

export default configureAnalyticEventRoutes;
