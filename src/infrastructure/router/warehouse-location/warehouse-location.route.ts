import { Express } from "express";
import { SequelizeRepository as SequelizeWarehouseLocationRepository } from "../../repository/warehouse-location/sequelize-warehouse-location.repository";
import { WarehouseLocationUseCase } from "../../../application/warehouse-location/warehouse-location-use-case";
import { WarehouseLocationController } from "../../controller/warehouse-location/warehouse-location.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureWarehouseLocationRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeWarehouseLocationRepository = new SequelizeWarehouseLocationRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const warehouseLocationUseCase = new WarehouseLocationUseCase(sequelizeWarehouseLocationRepository);
    
    /*
    *   Iniciar controller
    */
    const warehouseLocationCtrl = new WarehouseLocationController(warehouseLocationUseCase, socketAdapter);
    
    // Rutas de consulta de colecciones (con y sin filtro de almacén)
    app.get(`/${process.env.BASE_URL_API}/warehouse-locations/:cmp_uuid/:page?/:perPage?`, warehouseLocationCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/warehouse-locations/:cmp_uuid/:war_uuid/:page?/:perPage?`, warehouseLocationCtrl.getAllCtrl);
    
    // Consulta individual
    app.get(`/${process.env.BASE_URL_API}/warehouse-location/:cmp_uuid/:war_uuid/:warl_uuid`, warehouseLocationCtrl.getCtrl);
    
    // Registro individual
    app.post(`/${process.env.BASE_URL_API}/warehouse-location`, warehouseLocationCtrl.insertCtrl);
    
    // Registro por lote/batch (soportando ambas variantes de URL para evitar errores de consumo)
    app.post(`/${process.env.BASE_URL_API}/warehouse-location/batch`, warehouseLocationCtrl.insertBatchCtrl);
    app.post(`/${process.env.BASE_URL_API}/warehouse-locations/batch`, warehouseLocationCtrl.insertBatchCtrl);
    
    // Edición y borrado
    app.put(`/${process.env.BASE_URL_API}/warehouse-location/:cmp_uuid/:war_uuid/:warl_uuid`, warehouseLocationCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/warehouse-location/:cmp_uuid/:war_uuid/:warl_uuid`, warehouseLocationCtrl.deleteCtrl);
}

export default configureWarehouseLocationRoutes;
