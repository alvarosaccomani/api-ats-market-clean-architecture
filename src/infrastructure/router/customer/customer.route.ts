import { Express } from "express";
import { SequelizeRepository as SequelizeCustomerRepository } from "../../repository/customer/sequelize-customer.repository";
import { CustomerUseCase } from "../../../application/customer/customer-use-case";
import { CustomerController } from "../../controller/customer/customer.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCustomerRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCustomerRepository = new SequelizeCustomerRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const customerUseCase = new CustomerUseCase(sequelizeCustomerRepository);
    
    /*
    *   Iniciar controller
    */
    
    const customerCtrl = new CustomerController(customerUseCase, socketAdapter);
    
    /**
     * @swagger
     * /customers:
     *   get:
     *     summary: Obtener lista de clientes (con paginación opcional)
     *     tags:
     *       - Customers
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
     *         description: Clientes retornados.
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
     *                     $ref: '#/components/schemas/CustomerEntity'
     *       400:
     *         description: Error al recuperar los clientes.
     */
    app.get(`/${process.env.BASE_URL_API}/customers/:filter?/:page?/:perPage?`, customerCtrl.getAllCtrl);

    /**
     * @swagger
     * /customer/{usr_uuid}/{cus_uuid}:
     *   get:
     *     summary: Obtener detalle de un cliente por usuario y cliente UUID
     *     tags:
     *       - Customers
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cus_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Cliente retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CustomerEntity'
     *       400:
     *         description: Datos requeridos no válidos.
     */
    app.get(`/${process.env.BASE_URL_API}/customer/:usr_uuid/:cus_uuid`, customerCtrl.getCtrl);

    /**
     * @swagger
     * /customer:
     *   post:
     *     summary: Registrar un nuevo cliente
     *     tags:
     *       - Customers
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCustomerDto'
     *     responses:
     *       200:
     *         description: Cliente insertado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CustomerEntity'
     *       400:
     *         description: Error al insertar el cliente o cliente duplicado.
     */
    app.post(`/${process.env.BASE_URL_API}/customer`, customerCtrl.insertCtrl);

    /**
     * @swagger
     * /customer/{usr_uuid}/{cus_uuid}:
     *   put:
     *     summary: Actualizar un cliente existente
     *     tags:
     *       - Customers
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cus_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateCustomerDto'
     *     responses:
     *       200:
     *         description: Cliente actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CustomerEntity'
     *       400:
     *         description: Error al actualizar el cliente.
     */
    app.put(`/${process.env.BASE_URL_API}/customer/:usr_uuid/:cus_uuid`, customerCtrl.updateCtrl);

    /**
     * @swagger
     * /customer/{usr_uuid}/{cus_uuid}:
     *   delete:
     *     summary: Eliminar un cliente por UUID
     *     tags:
     *       - Customers
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cus_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Cliente eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar el cliente.
     */
    app.delete(`/${process.env.BASE_URL_API}/customer/:usr_uuid/:cus_uuid`, customerCtrl.deleteCtrl);

    /**
     * @swagger
     * /customer-by-user/{usr_uuid}:
     *   get:
     *     summary: Obtener el cliente asociado a un usuario específico
     *     tags:
     *       - Customers
     *     parameters:
     *       - in: path
     *         name: usr_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Cliente obtenido con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CustomerEntity'
     *       400:
     *         description: Error al obtener el cliente.
     */
    app.get(`/${process.env.BASE_URL_API}/customer-by-user/:usr_uuid`, customerCtrl.getCustomerByUserCtrl);
}

export default configureCustomerRoutes;
