import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { OrderHistoryEntity } from "../../../domain/order-history/order-history.entity";

export class SequelizeOrderHistory extends Model<OrderHistoryEntity, Omit<OrderHistoryEntity, 'id'>> {
  declare cmp_uuid: string;
  declare ord_uuid: string;
  declare ordh_uuid: string;
  declare ords_uuid: string;
  declare usr_uuid: string;
  declare ordh_comment: string;
  declare ordh_createdat: Date;
}

SequelizeOrderHistory.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ord_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ordh_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ords_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ordh_comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ordh_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'ordh_createdat',
  updatedAt: false,
  tableName: 'ordh_ordershistory'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeOrderHistory.sync();
}
