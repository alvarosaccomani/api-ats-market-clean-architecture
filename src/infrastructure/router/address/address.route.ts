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
    
    /**
     * @swagger
     * /addresses:
     *   get:
     *     summary: Obtener lista de direcciones (con paginación opcional)
     *     tags:
     *       - Addresses
     *     parameters:
     *       - in: query
     *         name: filter
     *         schema:
     *           type: string
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *       - in: query
     *         name: perPage
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Direcciones retornadas.
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
     *                     $ref: '#/components/schemas/AddressEntity'
     *       400:
     *         description: Error al recuperar las direcciones.
     */
    app.get(`/${process.env.BASE_URL_API}/addresses/:filter?/:page?/:perPage?`, addressCtrl.getAllCtrl);

    /**
     * @swagger
     * /address/{adr_uuid}:
     *   get:
     *     summary: Obtener detalle de una dirección por UUID
     *     tags:
     *       - Addresses
     *     parameters:
     *       - in: path
     *         name: adr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Dirección retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/AddressEntity'
     *       400:
     *         description: Dirección no encontrada o ID inválido.
     */
    app.get(`/${process.env.BASE_URL_API}/address/:adr_uuid`, addressCtrl.getCtrl);

    /**
     * @swagger
     * /address:
     *   post:
     *     summary: Registrar una nueva dirección
     *     tags:
     *       - Addresses
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateAddressDto'
     *     responses:
     *       200:
     *         description: Dirección insertada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/AddressEntity'
     *       400:
     *         description: Error al insertar la dirección.
     */
    app.post(`/${process.env.BASE_URL_API}/address`, addressCtrl.insertCtrl);

    /**
     * @swagger
     * /address/{adr_uuid}:
     *   put:
     *     summary: Actualizar una dirección existente
     *     tags:
     *       - Addresses
     *     parameters:
     *       - in: path
     *         name: adr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateAddressDto'
     *     responses:
     *       200:
     *         description: Dirección actualizada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/AddressEntity'
     *       400:
     *         description: Error al actualizar la dirección.
     */
    app.put(`/${process.env.BASE_URL_API}/address/:adr_uuid`, addressCtrl.updateCtrl);

    /**
     * @swagger
     * /address/{adr_uuid}:
     *   delete:
     *     summary: Eliminar una dirección por UUID
     *     tags:
     *       - Addresses
     *     parameters:
     *       - in: path
     *         name: adr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Dirección eliminada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar la dirección.
     */
    app.delete(`/${process.env.BASE_URL_API}/address/:adr_uuid`, addressCtrl.deleteCtrl);

    /**
     * @swagger
     * /addresses-by-company/{cmp_uuid}:
     *   get:
     *     summary: Obtener todas las direcciones asociadas a una empresa
     *     tags:
     *       - Addresses
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Direcciones de la empresa retornadas.
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
     *                     $ref: '#/components/schemas/AddressEntity'
     *       400:
     *         description: Error al recuperar las direcciones.
     */
    app.get(`/${process.env.BASE_URL_API}/addresses-by-company/:cmp_uuid`, addressCtrl.getAddressesByCompanyCtrl);

    /**
     * @swagger
     * /addresses-by-user/{usr_uuid}:
     *   get:
     *     summary: Obtener todas las direcciones asociadas a un usuario
     *     tags:
     *       - Addresses
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Direcciones del usuario retornadas.
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
     *                     $ref: '#/components/schemas/AddressEntity'
     *       400:
     *         description: Error al recuperar las direcciones.
     */
    app.get(`/${process.env.BASE_URL_API}/addresses-by-user/:usr_uuid`, addressCtrl.getAddressesByUserCtrl);

    /**
     * @swagger
     * /addresses-by-customer/{cus_uuid}:
     *   get:
     *     summary: Obtener todas las direcciones asociadas a un cliente
     *     tags:
     *       - Addresses
     *     parameters:
     *       - in: path
     *         name: cus_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Direcciones del cliente retornadas.
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
     *                     $ref: '#/components/schemas/AddressEntity'
     *       400:
     *         description: Error al recuperar las direcciones.
     */
    app.get(`/${process.env.BASE_URL_API}/addresses-by-customer/:cus_uuid`, addressCtrl.getAddressesByCustomerCtrl);

    /**
     * @swagger
     * /addresses-by-supplier/{sup_uuid}:
     *   get:
     *     summary: Obtener todas las direcciones asociadas a un proveedor
     *     tags:
     *       - Addresses
     *     parameters:
     *       - in: path
     *         name: sup_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Direcciones del proveedor retornadas.
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
     *                     $ref: '#/components/schemas/AddressEntity'
     *       400:
     *         description: Error al recuperar las direcciones.
     */
    app.get(`/${process.env.BASE_URL_API}/addresses-by-supplier/:sup_uuid`, addressCtrl.getAddressesBySupplierCtrl);
}

export default configureAddressRoutes;
