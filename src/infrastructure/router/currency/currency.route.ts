import { Express } from "express";
import { SequelizeRepository } from "../../repository/currency/sequelize-currency.repository";
import { CurrencyUseCase } from "../../../application/currency/currency-use-case";
import { CurrencyController } from "../../controller/currency/currency.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCurrencyRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCurrencyRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const currencyUseCase = new CurrencyUseCase(sequelizeCurrencyRepository);
    
    /*
    *   Iniciar controller
    */
    
    const currencyCtrl = new CurrencyController(currencyUseCase, socketAdapter);
    
    /**
     * @swagger
     * /currencies:
     *   get:
     *     summary: Obtener lista de todas las monedas activas en la plataforma
     *     tags:
     *       - Currencies
     *     responses:
     *       200:
     *         description: Monedas retornadas.
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
     *                     $ref: '#/components/schemas/CurrencyEntity'
     *       400:
     *         description: Error al recuperar las monedas.
     */
    app.get(`/${process.env.BASE_URL_API}/currencies`, currencyCtrl.getAllCtrl);

    /**
     * @swagger
     * /currency/{cur_uuid}:
     *   get:
     *     summary: Obtener detalle de una moneda por UUID
     *     tags:
     *       - Currencies
     *     parameters:
     *       - in: path
     *         name: cur_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Moneda retornada.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CurrencyEntity'
     *       400:
     *         description: Moneda no encontrada.
     */
    app.get(`/${process.env.BASE_URL_API}/currency/:cur_uuid`, currencyCtrl.getCtrl);

    /**
     * @swagger
     * /currency:
     *   post:
     *     summary: Crear una nueva moneda
     *     tags:
     *       - Currencies
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCurrencyDto'
     *     responses:
     *       200:
     *         description: Moneda creada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CurrencyEntity'
     *       400:
     *         description: Error al crear la moneda.
     */
    app.post(`/${process.env.BASE_URL_API}/currency`, currencyCtrl.insertCtrl);

    /**
     * @swagger
     * /currency/{cur_uuid}:
     *   put:
     *     summary: Actualizar una moneda existente
     *     tags:
     *       - Currencies
     *     parameters:
     *       - in: path
     *         name: cur_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateCurrencyDto'
     *     responses:
     *       200:
     *         description: Moneda actualizada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CurrencyEntity'
     *       400:
     *         description: Error al actualizar la moneda.
     */
    app.put(`/${process.env.BASE_URL_API}/currency/:cur_uuid`, currencyCtrl.updateCtrl);

    /**
     * @swagger
     * /currency/{cur_uuid}:
     *   delete:
     *     summary: Eliminar una moneda por UUID
     *     tags:
     *       - Currencies
     *     parameters:
     *       - in: path
     *         name: cur_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Moneda eliminada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar la moneda.
     */
    app.delete(`/${process.env.BASE_URL_API}/currency/:cur_uuid`, currencyCtrl.deleteCtrl);
}

export default configureCurrencyRoutes;
