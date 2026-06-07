import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CouponEntity } from "../../../domain/coupon/coupon.entity";

export class SequelizeCoupon extends Model<CouponEntity, Omit<CouponEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cou_uuid: string;
  declare cou_code: string;
  declare cou_type: string;
  declare cou_value: number;
  declare cou_minpurchase: number;
  declare cou_maxdiscount: number;
  declare cou_startdate: Date;
  declare cou_enddate: Date;
  declare cou_limit: number;
  declare cou_usedcount: number;
  declare cou_active: boolean;
  declare cou_createdat: Date;
  declare cou_updatedat: Date;
}

SequelizeCoupon.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  cou_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  cou_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cou_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cou_value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cou_minpurchase: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  cou_maxdiscount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  cou_startdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cou_enddate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cou_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 999999
  },
  cou_usedcount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  cou_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  cou_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cou_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cou_createdat', 
  updatedAt: 'cou_updatedat',
  tableName: 'cou_coupons'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCoupon.sync({ alter: true });
}
