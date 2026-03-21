import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { PaymentMethodEntity } from "../../../domain/payment-method/payment-method.entity";

export class SequelizePaymentMethod extends Model<PaymentMethodEntity, Omit<PaymentMethodEntity, 'id'>> {
  declare cmp_uuid: string;
  declare pmt_uuid: string;
  declare pmt_name: string;
  declare pmt_order: number;
  declare pmt_bkcolor: string;
  declare pmt_frcolor: string;
  declare pmt_active: boolean;
  declare pmt_createdat: Date;
  declare pmt_updatedat: Date;
}

SequelizePaymentMethod.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  pmt_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  pmt_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pmt_order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  pmt_bkcolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pmt_frcolor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pmt_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  pmt_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pmt_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'pmt_createdat', 
  updatedAt: 'pmt_updatedat',
  tableName: 'pmt_paymentmethods'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizePaymentMethod.sync();
}