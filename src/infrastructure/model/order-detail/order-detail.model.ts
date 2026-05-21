import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { OrderDetailEntity } from "../../../domain/order-detail/order-detail.entity";

export class SequelizeOrderDetail extends Model<OrderDetailEntity, Omit<OrderDetailEntity, 'id'>> {
  declare cmp_uuid: string;
  declare ord_uuid: string;
  declare ordd_uuid: string;
  declare pro_uuid: string;
  declare prov_uuid: string;
  declare ordd_productname: string;
  declare ordd_code: string;
  declare ordd_sku: string;
  declare ordd_quantity: number;
  declare ordd_unitprice: number;
  declare ordd_discount: number;
  declare ordd_subtotal: number;
  declare ordd_taxrate: number;
  declare ordd_tax: number;
  declare ordd_basecost: number;
  declare ordd_createdat: Date;
  declare ordd_updatedat: Date;
}

SequelizeOrderDetail.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  ord_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  ordd_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  pro_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prov_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ordd_productname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ordd_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ordd_sku: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ordd_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ordd_unitprice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ordd_discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  ordd_subtotal: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  ordd_taxrate: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  ordd_tax: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  ordd_basecost: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  ordd_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ordd_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'ordd_createdat', 
  updatedAt: 'ordd_updatedat',
  tableName: 'ordd_orderdetails'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeOrderDetail.sync();
}
