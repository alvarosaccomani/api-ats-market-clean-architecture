import { CouponEntity, CouponUpdateData } from "./coupon.entity";

export interface CouponRepository {
    getCoupons(cmp_uuid: string): Promise<CouponEntity[] | null>;
    findCouponById(cmp_uuid: string, cou_uuid: string): Promise<CouponEntity | null>;
    findCouponByCode(cmp_uuid: string, code: string): Promise<CouponEntity | null>;
    createCoupon(coupon: CouponEntity): Promise<CouponEntity | null>;
    updateCoupon(cmp_uuid: string, cou_uuid: string, coupon: CouponUpdateData): Promise<CouponEntity | null>;
    deleteCoupon(cmp_uuid: string, cou_uuid: string): Promise<CouponEntity | null>;
    incrementUsedCount(cmp_uuid: string, cou_uuid: string): Promise<void>;
}