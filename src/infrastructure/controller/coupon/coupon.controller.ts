import { Request, Response } from "express";
import { CouponUseCase } from "../../../application/coupon/coupon-use-case";

export class CouponController {
    constructor(private readonly couponUseCase: CouponUseCase) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.validateCtrl = this.validateCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar los cupones.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            const coupons = await this.couponUseCase.getCoupons(cmp_uuid);
            return res.status(200).json({
                success: true,
                message: 'Cupones retornados.',
                data: coupons
            });
        } catch (error: any) {
            console.error('Error en getAllCtrl (coupon):', error.message);
            return res.status(500).json({
                success: false,
                message: 'Error al recuperar los cupones.',
                error: error.message
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cou_uuid } = req.params;
            if(!cmp_uuid || !cou_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar el cupón.',
                    error: 'Debe proporcionar Id de company y Id de cupón.'
                });
            }
            const coupon = await this.couponUseCase.getCouponDetail(cmp_uuid, cou_uuid);
            return res.status(200).json({
                success: true,
                message: 'Cupón retornado.',
                data: coupon
            });
        } catch (error: any) {
            console.error('Error en getCtrl (coupon):', error.message);
            return res.status(500).json({
                success: false,
                message: 'Error al recuperar el cupón.',
                error: error.message
            });
        }
    }

    public async insertCtrl(req: Request, res: Response) {
        try {
            const body = req.body;
            if(!body.cmp_uuid || !body.cou_code || !body.cou_type || body.cou_value === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo crear el cupón.',
                    error: 'Los campos cmp_uuid, cou_code, cou_type y cou_value son obligatorios.'
                });
            }
            const coupon = await this.couponUseCase.createCoupon(body);
            return res.status(200).json({
                success: true,
                message: 'Cupón creado.',
                data: coupon
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (coupon):', error.message);
            return res.status(500).json({
                success: false,
                message: 'Error al crear el cupón.',
                error: error.message
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cou_uuid } = req.params;
            const body = req.body;
            if(!cmp_uuid || !cou_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar el cupón.',
                    error: 'Debe proporcionar Id de company y Id de cupón.'
                });
            }
            const coupon = await this.couponUseCase.updateCoupon(cmp_uuid, cou_uuid, body);
            return res.status(200).json({
                success: true,
                message: 'Cupón actualizado.',
                data: coupon
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (coupon):', error.message);
            return res.status(500).json({
                success: false,
                message: 'Error al actualizar el cupón.',
                error: error.message
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, cou_uuid } = req.params;
            if(!cmp_uuid || !cou_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar el cupón.',
                    error: 'Debe proporcionar Id de company y Id de cupón.'
                });
            }
            const coupon = await this.couponUseCase.deleteCoupon(cmp_uuid, cou_uuid);
            return res.status(200).json({
                success: true,
                message: 'Cupón eliminado.',
                data: coupon
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (coupon):', error.message);
            return res.status(500).json({
                success: false,
                message: 'Error al eliminar el cupón.',
                error: error.message
            });
        }
    }

    public async validateCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, code, purchaseAmount } = req.body;
            if(!cmp_uuid || !code || purchaseAmount === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo validar el cupón.',
                    error: 'Debe proporcionar cmp_uuid, code y purchaseAmount.'
                });
            }
            
            const result = await this.couponUseCase.validateCoupon(cmp_uuid, code, Number(purchaseAmount));
            return res.status(200).json({
                success: true,
                message: 'Cupón válido.',
                data: result
            });
        } catch (error: any) {
            console.error('Error en validateCtrl (coupon):', error.message);
            return res.status(400).json({
                success: false,
                message: 'El cupón no es válido.',
                error: error.message
            });
        }
    }
}
