import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { OrderStatusEntity } from "../../../domain/order-status/order-status.entity";

export class SequelizeOrderStatus extends Model<OrderStatusEntity, Omit<OrderStatusEntity, 'id'>> {
  declare ords_uuid: string;
  declare ords_code: string;
  declare ords_name: string;
  declare ords_description: string;
  declare ords_bkcolor: string;
  declare ords_frcolor: string;
  declare ords_createdat: Date;
  declare ords_updatedat: Date;
}

SequelizeOrderStatus.init({
  ords_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ords_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ords_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ords_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ords_bkcolor: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#ffffff'
  },
  ords_frcolor: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#000000'
  },
  ords_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ords_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'ords_createdat', 
  updatedAt: 'ords_updatedat',
  tableName: 'ords_orderstatuses'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeOrderStatus.sync();
}
