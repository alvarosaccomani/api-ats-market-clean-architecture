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

    app.post(`/${process.env.BASE_URL_API}/analytics/track`, controller.trackEventCtrl);
    app.get(`/${process.env.BASE_URL_API}/analytics/summary/:cmp_uuid`, authMiddleware, controller.getSummaryCtrl);
}

export default configureAnalyticEventRoutes;
