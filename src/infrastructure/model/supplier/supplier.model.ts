import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { SupplierEntity } from "../../../domain/supplier/supplier.entity";

export class SequelizeSupplier extends Model<SupplierEntity, Omit<SupplierEntity, 'id'>> {
  declare cmp_uuid: string;
  declare sup_uuid: string;
  declare sup_fullname: string;
  declare sup_email: string;
  declare sup_phone: string;
  declare pmt_uuid: string;
  declare usr_uuid: string;
  declare sup_createdat: Date;
  declare sup_updatedat: Date;
}

SequelizeSupplier.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  sup_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  sup_fullname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sup_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sup_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pmt_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sup_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  sup_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'sup_createdat', 
  updatedAt: 'sup_updatedat',
  tableName: 'sup_suppliers'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeSupplier.sync();
}