import { CouponEntity, CouponUpdateData } from "../../../domain/coupon/coupon.entity";
import { CouponRepository } from "../../../domain/coupon/coupon.repository";
import { SequelizeCoupon } from "../../model/coupon/coupon.model";
import { Op } from "sequelize";

export class SequelizeRepository implements CouponRepository {
    async getCoupons(cmp_uuid: string): Promise<CouponEntity[] | null> {
        try {
            const coupons = await SequelizeCoupon.findAll({
                where: { cmp_uuid: cmp_uuid ?? null }
            });
            return coupons;
        } catch (error: any) {
            console.error('Error en getCoupons:', error.message);
            throw error;
        }
    }

    async findCouponById(cmp_uuid: string, cou_uuid: string): Promise<CouponEntity | null> {
        try {
            const coupon = await SequelizeCoupon.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    cou_uuid: cou_uuid ?? null
                }
            });
            return coupon ? coupon.dataValues : null;
        } catch (error: any) {
            console.error('Error en findCouponById:', error.message);
            throw error;
        }
    }

    async findCouponByCode(cmp_uuid: string, code: string): Promise<CouponEntity | null> {
        try {
            const coupon = await SequelizeCoupon.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    cou_code: { [Op.iLike]: code.trim() } // Búsqueda insensible a mayúsculas
                }
            });
            return coupon ? coupon.dataValues : null;
        } catch (error: any) {
            console.error('Error en findCouponByCode:', error.message);
            throw error;
        }
    }

    async createCoupon(coupon: CouponEntity): Promise<CouponEntity | null> {
        try {
            const result = await SequelizeCoupon.create(coupon);
            return result ? (result.dataValues as CouponEntity) : null;
        } catch (error: any) {
            console.error('Error en createCoupon:', error.message);
            throw error;
        }
    }

    async updateCoupon(cmp_uuid: string, cou_uuid: string, coupon: CouponUpdateData): Promise<CouponEntity | null> {
        try {
            const [updatedCount, [updatedCoupon]] = await SequelizeCoupon.update(
                coupon,
                { 
                    where: { cmp_uuid, cou_uuid },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha encontrado el cupón a actualizar.`);
            }
            return updatedCoupon.get({ plain: true }) as CouponEntity;
        } catch (error: any) {
            console.error('Error en updateCoupon:', error.message);
            throw error;
        }
    }

    async deleteCoupon(cmp_uuid: string, cou_uuid: string): Promise<CouponEntity | null> {
        try {
            const coupon = await this.findCouponById(cmp_uuid, cou_uuid);
            if (!coupon) {
                throw new Error('El cupón no existe.');
            }
            const result = await SequelizeCoupon.destroy({ where: { cmp_uuid, cou_uuid } });
            if (!result) {
                throw new Error('No se pudo eliminar el cupón.');
            }
            return coupon;
        } catch (error: any) {
            console.error('Error en deleteCoupon:', error.message);
            throw error;
        }
    }

    async incrementUsedCount(cmp_uuid: string, cou_uuid: string): Promise<void> {
        try {
            await SequelizeCoupon.increment(
                'cou_usedcount',
                {
                    by: 1,
                    where: { cmp_uuid, cou_uuid }
                }
            );
        } catch (error: any) {
            console.error('Error en incrementUsedCount:', error.message);
            throw error;
        }
    }
}
