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

    app.post(`/${process.env.BASE_URL_API}/favorites`, authMiddleware, controller.addFavoriteCtrl);
    app.delete(`/${process.env.BASE_URL_API}/favorites/:prov_uuid`, authMiddleware, controller.removeFavoriteCtrl);
    app.get(`/${process.env.BASE_URL_API}/favorites`, authMiddleware, controller.getFavoritesCtrl);
}

export default configureFavoriteRoutes;
