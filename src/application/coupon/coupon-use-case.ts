import { CouponEntity, CouponUpdateData } from "../../domain/coupon/coupon.entity";
import { CouponRepository } from "../../domain/coupon/coupon.repository";
import { CouponValue } from "../../domain/coupon/coupon.value";
import moment from "moment";

export class CouponUseCase {
    constructor(private readonly couponRepository: CouponRepository) {}

    public async getCoupons(cmp_uuid: string) {
        return await this.couponRepository.getCoupons(cmp_uuid);
    }

    public async getCouponDetail(cmp_uuid: string, cou_uuid: string) {
        return await this.couponRepository.findCouponById(cmp_uuid, cou_uuid);
    }

    public async createCoupon(couponData: any) {
        const couponValue = new CouponValue(couponData);
        return await this.couponRepository.createCoupon(couponValue);
    }

    public async updateCoupon(cmp_uuid: string, cou_uuid: string, updateData: CouponUpdateData) {
        return await this.couponRepository.updateCoupon(cmp_uuid, cou_uuid, updateData);
    }

    public async deleteCoupon(cmp_uuid: string, cou_uuid: string) {
        return await this.couponRepository.deleteCoupon(cmp_uuid, cou_uuid);
    }

    public async validateCoupon(cmp_uuid: string, code: string, purchaseAmount: number) {
        const coupon = await this.couponRepository.findCouponByCode(cmp_uuid, code);
        
        if (!coupon) {
            throw new Error("El cupón ingresado no existe para esta tienda.");
        }

        if (!coupon.cou_active) {
            throw new Error("El cupón no se encuentra activo.");
        }

        const now = moment().startOf('day');
        const startDate = moment(coupon.cou_startdate).startOf('day');
        const endDate = moment(coupon.cou_enddate).endOf('day');

        if (now.isBefore(startDate)) {
            throw new Error("El cupón aún no ha comenzado su vigencia.");
        }

        if (now.isAfter(endDate)) {
            throw new Error("El cupón ha expirado.");
        }

        if (coupon.cou_limit !== null && coupon.cou_limit !== undefined && coupon.cou_usedcount >= coupon.cou_limit) {
            throw new Error("El cupón ha superado su límite máximo de usos.");
        }

        if (purchaseAmount < coupon.cou_minpurchase) {
            throw new Error(`La compra mínima para aplicar este cupón es de $${coupon.cou_minpurchase}.`);
        }

        // Calcular el descuento exacto
        let discount = 0;
        if (coupon.cou_type === 'PERCENTAGE') {
            discount = purchaseAmount * (coupon.cou_value / 100);
            if (coupon.cou_maxdiscount > 0 && discount > coupon.cou_maxdiscount) {
                discount = coupon.cou_maxdiscount;
            }
        } else if (coupon.cou_type === 'FIXED') {
            discount = coupon.cou_value;
        }

        // El descuento no puede ser mayor que el monto de compra
        if (discount > purchaseAmount) {
            discount = purchaseAmount;
        }

        return {
            coupon,
            discount: Math.round(discount * 100) / 100 // Redondear a 2 decimales
        };
    }
}
