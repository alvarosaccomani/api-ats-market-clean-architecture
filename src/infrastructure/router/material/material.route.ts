import { Express } from "express";
import { SequelizeRepository as SequelizeMaterialRepository } from "../../repository/material/sequelize-material.repository";
import { MaterialUseCase } from "../../../application/material/material-use-case";
import { MaterialController } from "../../controller/material/material.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureMaterialRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeMaterialRepository = new SequelizeMaterialRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const materialUseCase = new MaterialUseCase(sequelizeMaterialRepository);
    
    /*
    *   Iniciar controller
    */
    
    const materialCtrl = new MaterialController(materialUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/materials/:cmp_uuid/:filter?/:page?/:perPage?`, materialCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/material/:cmp_uuid/:mat_uuid`, materialCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/material`, materialCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/material/:cmp_uuid/:mat_uuid`, materialCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/material/:cmp_uuid/:mat_uuid`, materialCtrl.deleteCtrl);
}

export default configureMaterialRoutes;
