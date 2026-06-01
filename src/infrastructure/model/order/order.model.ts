import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { OrderEntity } from "../../../domain/order/order.entity";
import { SequelizeCustomer } from '../customer/customer.model';
import { SequelizeOrderDetail } from '../order-detail/order-detail.model';

export class SequelizeOrder extends Model<OrderEntity, Omit<OrderEntity, 'id'>> {
  declare cmp_uuid: string;
  declare ord_uuid: string;
  declare usr_uuid: string;
  declare cus_uuid: string;
  declare adr_uuid: string;
  declare ord_ordernumber: number;
  declare ords_uuid: string;
  declare ord_date: Date;
  declare ord_subtotal: number;
  declare ord_shippingcost: number;
  declare ord_tax: number;
  declare ord_total: number;
  declare ord_customernotes: string;
  declare ord_trackingnumber: string;
  declare ord_createdat: Date;
  declare ord_updatedat: Date;
}

SequelizeOrder.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  ord_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  usr_uuid: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  cus_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ord_ordernumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ords_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ord_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ord_subtotal: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ord_shippingcost: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ord_tax: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ord_total: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ord_customernotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ord_trackingnumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ord_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ord_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'ord_createdat', 
  updatedAt: 'ord_updatedat',
  tableName: 'ord_orders'
});

//Sequelize Customer model item Foreign Key
SequelizeOrder.belongsTo(SequelizeCustomer, {
    foreignKey: "cmp_uuid",
    targetKey: "cmp_uuid"
});
SequelizeOrder.belongsTo(SequelizeCustomer, {
    foreignKey: 'cus_uuid',
    targetKey: "cus_uuid",
    as: 'cus'
});

SequelizeOrder.hasMany(SequelizeOrderDetail, {
    foreignKey: 'ord_uuid',
    sourceKey: 'ord_uuid',
    as: 'orderDetails'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeOrder.sync();
}