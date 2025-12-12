import { Express } from "express";
import { SequelizeRepository } from "../../repository/article/sequelize-article.repository";
import { ArticleUseCase } from "../../../application/article/article-use-case";
import { ArticleController } from "../../controller/article/article.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureArticleRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeArticleRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const articleUseCase = new ArticleUseCase(sequelizeArticleRepository);
    
    /*
    *   Iniciar controller
    */
    
    const articleCtrl = new ArticleController(articleUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/articles/:cmp_uuid/:filter?/:page?/:perPage?`, articleCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/article/:cmp_uuid/:art_uuid`, articleCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/article`, articleCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/article/:cmp_uuid/:art_uuid`, articleCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/article/:cmp_uuid/:art_uuid`, articleCtrl.deleteCtrl);
}

export default configureArticleRoutes;
