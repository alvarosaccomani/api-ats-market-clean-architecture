import { Express } from "express";
import { SequelizeRepository as SequelizePaymentMethodRepository } from "../../repository/payment-method/sequelize-payment-method.repository";
import { PaymentMethodUseCase } from "../../../application/payment-method/payment-method-use-case";
import { PaymentMethodController } from "../../controller/payment-method/payment-method.controller";
import SocketAdapter from "../../services/socketAdapter";

function configurePaymentMethodRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizePaymentMethodRepository = new SequelizePaymentMethodRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const paymentMethodUseCase = new PaymentMethodUseCase(sequelizePaymentMethodRepository);
    
    /*
    *   Iniciar controller
    */
    
    const paymentMethodCtrl = new PaymentMethodController(paymentMethodUseCase, socketAdapter);
    
    /**
     * @swagger
     * /payment-methods/{cmp_uuid}:
     *   get:
     *     summary: Obtener lista de métodos de pago configurados para una empresa
     *     tags:
     *       - PaymentMethods
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
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
     *         description: Métodos de pago retornados.
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
     *                     $ref: '#/components/schemas/PaymentMethodEntity'
     *       400:
     *         description: Error al recuperar los métodos de pago.
     */
    app.get(`/${process.env.BASE_URL_API}/payment-methods/:cmp_uuid/:filter?/:page?/:perPage?`, paymentMethodCtrl.getAllCtrl);

    /**
     * @swagger
     * /payment-method/{cmp_uuid}/{pmt_uuid}:
     *   get:
     *     summary: Obtener detalle de un método de pago por UUID
     *     tags:
     *       - PaymentMethods
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: pmt_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Método de pago retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/PaymentMethodEntity'
     *       400:
     *         description: Método de pago no encontrado.
     */
    app.get(`/${process.env.BASE_URL_API}/payment-method/:cmp_uuid/:pmt_uuid`, paymentMethodCtrl.getCtrl);

    /**
     * @swagger
     * /payment-method:
     *   post:
     *     summary: Crear un nuevo método de pago
     *     tags:
     *       - PaymentMethods
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreatePaymentMethodDto'
     *     responses:
     *       200:
     *         description: Método de pago creado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/PaymentMethodEntity'
     *       400:
     *         description: Error al crear el método de pago.
     */
    app.post(`/${process.env.BASE_URL_API}/payment-method`, paymentMethodCtrl.insertCtrl);

    /**
     * @swagger
     * /payment-method/{cmp_uuid}/{pmt_uuid}:
     *   put:
     *     summary: Actualizar un método de pago existente
     *     tags:
     *       - PaymentMethods
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: pmt_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdatePaymentMethodDto'
     *     responses:
     *       200:
     *         description: Método de pago actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/PaymentMethodEntity'
     *       400:
     *         description: Error al actualizar el método de pago.
     */
    app.put(`/${process.env.BASE_URL_API}/payment-method/:cmp_uuid/:pmt_uuid`, paymentMethodCtrl.updateCtrl);

    /**
     * @swagger
     * /payment-method/{cmp_uuid}/{pmt_uuid}:
     *   delete:
     *     summary: Eliminar un método de pago por UUID
     *     tags:
     *       - PaymentMethods
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: pmt_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Método de pago eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar el método de pago.
     */
    app.delete(`/${process.env.BASE_URL_API}/payment-method/:cmp_uuid/:pmt_uuid`, paymentMethodCtrl.deleteCtrl);
}

export default configurePaymentMethodRoutes;
