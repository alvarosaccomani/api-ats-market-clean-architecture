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
    
    app.get(`/${process.env.BASE_URL_API}/global-materials/:filter?/:page?/:perPage?`, globalMaterialCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/global-material/:gmat_uuid`, globalMaterialCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/global-material`, globalMaterialCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/global-material/:gmat_uuid`, globalMaterialCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/global-material/:gmat_uuid`, globalMaterialCtrl.deleteCtrl);
}

export default configureGlobalMaterialRoutes;
