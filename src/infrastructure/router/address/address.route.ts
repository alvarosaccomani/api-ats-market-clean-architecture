import { Express } from "express";
import { SequelizeRepository as SequelizeAddressRepository } from "../../repository/address/sequelize-address.repository";
import { AddressUseCase } from "../../../application/address/address-use-case";
import { AddressController } from "../../controller/address/address.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureAddressRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeAddressRepository = new SequelizeAddressRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const addressUseCase = new AddressUseCase(sequelizeAddressRepository);
    
    /*
    *   Iniciar controller
    */
    
    const addressCtrl = new AddressController(addressUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/addresses/:filter?/:page?/:perPage?`, addressCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/address/:adr_uuid`, addressCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/address`, addressCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/address/:adr_uuid`, addressCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/address/:adr_uuid`, addressCtrl.deleteCtrl);
    app.get(`/${process.env.BASE_URL_API}/addresses-by-company/:cmp_uuid`, addressCtrl.getAddressesByCompanyCtrl);
    app.get(`/${process.env.BASE_URL_API}/addresses-by-user/:usr_uuid`, addressCtrl.getAddressesByUserCtrl);
    app.get(`/${process.env.BASE_URL_API}/addresses-by-customer/:cus_uuid`, addressCtrl.getAddressesByCustomerCtrl);
    app.get(`/${process.env.BASE_URL_API}/addresses-by-supplier/:sup_uuid`, addressCtrl.getAddressesBySupplierCtrl);
}

export default configureAddressRoutes;
