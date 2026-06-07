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
    
    // Ruta pública de validación (usada por compradores en el Checkout)
    app.post(`/${process.env.BASE_URL_API}/coupon/validate`, couponCtrl.validateCtrl);
    
    // Rutas protegidas de gestión (usadas por vendedores)
    app.get(`/${process.env.BASE_URL_API}/coupons/:cmp_uuid`, authMiddleware, couponCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/coupon/:cmp_uuid/:cou_uuid`, authMiddleware, couponCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/coupon`, authMiddleware, couponCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/coupon/:cmp_uuid/:cou_uuid`, authMiddleware, couponCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/coupon/:cmp_uuid/:cou_uuid`, authMiddleware, couponCtrl.deleteCtrl);
}

export default configureCouponRoutes;
