import { Express } from "express";
import { SequelizeRepository as SequelizeCouponRepository } from "../../repository/coupon/sequelize-coupon.repository";
import { CouponUseCase } from "../../../application/coupon/coupon-use-case";
import { CouponController } from "../../controller/coupon/coupon.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureCouponRoutes(app: Express, socketAdapter: SocketAdapter) {
    const sequelizeCouponRepository = new SequelizeCouponRepository();
    const couponUseCase = new CouponUseCase(sequelizeCouponRepository);
    const couponCtrl = new CouponController(couponUseCase);
    
    /**
     * @swagger
     * /coupon/validate:
     *   post:
     *     summary: Validar un cupón de descuento en el Checkout (público)
     *     tags:
     *       - Coupons
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ValidateCouponDto'
     *     responses:
     *       200:
     *         description: Cupón válido y cálculo de descuento realizado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CouponEntity'
     *       400:
     *         description: Cupón inválido, expirado o monto de compra insuficiente.
     */
    app.post(`/${process.env.BASE_URL_API}/coupon/validate`, couponCtrl.validateCtrl);
    
    /**
     * @swagger
     * /coupons/{cmp_uuid}:
     *   get:
     *     summary: Listar todos los cupones de una empresa
     *     tags:
     *       - Coupons
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Cupones retornados.
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
     *                     $ref: '#/components/schemas/CouponEntity'
     *       400:
     *         description: Error al recuperar los cupones.
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/coupons/:cmp_uuid`, authMiddleware, couponCtrl.getAllCtrl);

    /**
     * @swagger
     * /coupon/{cmp_uuid}/{cou_uuid}:
     *   get:
     *     summary: Obtener detalle de un cupón por UUID
     *     tags:
     *       - Coupons
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cou_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Cupón retornado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CouponEntity'
     *       400:
     *         description: Cupón no encontrado.
     *       401:
     *         description: No autorizado.
     */
    app.get(`/${process.env.BASE_URL_API}/coupon/:cmp_uuid/:cou_uuid`, authMiddleware, couponCtrl.getCtrl);

    /**
     * @swagger
     * /coupon:
     *   post:
     *     summary: Crear un nuevo cupón de descuento
     *     tags:
     *       - Coupons
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCouponDto'
     *     responses:
     *       200:
     *         description: Cupón creado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CouponEntity'
     *       400:
     *         description: Error al crear el cupón o código ya existente.
     *       401:
     *         description: No autorizado.
     */
    app.post(`/${process.env.BASE_URL_API}/coupon`, authMiddleware, couponCtrl.insertCtrl);

    /**
     * @swagger
     * /coupon/{cmp_uuid}/{cou_uuid}:
     *   put:
     *     summary: Actualizar un cupón existente
     *     tags:
     *       - Coupons
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cou_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UpdateCouponDto'
     *     responses:
     *       200:
     *         description: Cupón actualizado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/CouponEntity'
     *       400:
     *         description: Error al actualizar el cupón.
     *       401:
     *         description: No autorizado.
     */
    app.put(`/${process.env.BASE_URL_API}/coupon/:cmp_uuid/:cou_uuid`, authMiddleware, couponCtrl.updateCtrl);

    /**
     * @swagger
     * /coupon/{cmp_uuid}/{cou_uuid}:
     *   delete:
     *     summary: Eliminar un cupón por UUID
     *     tags:
     *       - Coupons
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: cmp_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *       - in: path
     *         name: cou_uuid
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *       200:
     *         description: Cupón eliminado con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *       400:
     *         description: Error al eliminar el cupón.
     *       401:
     *         description: No autorizado.
     */
    app.delete(`/${process.env.BASE_URL_API}/coupon/:cmp_uuid/:cou_uuid`, authMiddleware, couponCtrl.deleteCtrl);
}

export default configureCouponRoutes;
