import { Express } from "express";
import { SequelizeRepository as SequelizeInventoryStockRepository } from "../../repository/inventory-stock/sequelize-inventory-stock.repository";
import { InventoryStockUseCase } from "../../../application/inventory-stock/inventory-stock-use-case";
import { InventoryStockController } from "../../controller/inventory-stock/inventory-stock.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureInventoryStockRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeInventoryStockRepository = new SequelizeInventoryStockRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const inventoryStockUseCase = new InventoryStockUseCase(sequelizeInventoryStockRepository);
    
    /*
    *   Iniciar controller
    */
    const inventoryStockCtrl = new InventoryStockController(inventoryStockUseCase, socketAdapter);
    
    // Colección simple por compañía
    app.get(`/${process.env.BASE_URL_API}/inventory-stocks/:cmp_uuid/:page?/:perPage?`, inventoryStockCtrl.getAllCtrl);
    
    // Colección filtrada por compañía, producto y variación
    app.get(`/${process.env.BASE_URL_API}/inventory-stocks/:cmp_uuid/:pro_uuid/:prov_uuid/:page?/:perPage?`, inventoryStockCtrl.getAllCtrl);
    
    // Consulta individual por PK compuesta de 6 columnas
    app.get(`/${process.env.BASE_URL_API}/inventory-stock/:cmp_uuid/:pro_uuid/:prov_uuid/:war_uuid/:warl_uuid`, inventoryStockCtrl.getCtrl);
    
    // Registro individual
    app.post(`/${process.env.BASE_URL_API}/inventory-stock`, inventoryStockCtrl.insertCtrl);
    
    // Registro en lote (singular y plural)
    app.post(`/${process.env.BASE_URL_API}/inventory-stock/batch`, inventoryStockCtrl.insertBatchCtrl);
    app.post(`/${process.env.BASE_URL_API}/inventory-stocks/batch`, inventoryStockCtrl.insertBatchCtrl);
    
    // Edición y borrado por PK compuesta de 6 columnas
    app.put(`/${process.env.BASE_URL_API}/inventory-stock/:cmp_uuid/:pro_uuid/:prov_uuid/:war_uuid/:warl_uuid`, inventoryStockCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/inventory-stock/:cmp_uuid/:pro_uuid/:prov_uuid/:war_uuid/:warl_uuid`, inventoryStockCtrl.deleteCtrl);
}

export default configureInventoryStockRoutes;
