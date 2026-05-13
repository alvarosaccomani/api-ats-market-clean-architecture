import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CostPerSupplierEntity } from "../../../domain/cost-per-supplier/cost-per-supplier.entity";

export class SequelizeCostPerSupplier extends Model<CostPerSupplierEntity, Omit<CostPerSupplierEntity, 'id'>> {
  declare cmp_uuid: string;
  declare pro_uuid: string;
  declare prov_uuid: string;
  declare sup_uuid: string;
  declare cps_uuid: string;
  declare cps_pricecost: number;
  declare cps_basecost: boolean;
  declare cur_uuid: string;
  declare cps_exchangerate: number;
  declare cps_suppliersku: string;
  declare cps_leadtimedays: number;
  declare cps_miniumorderquanty: number;
  declare cps_boxquantity: number;
  declare cps_notes: string;
  declare cps_suggestedminimumsellingprice: number;
  declare cps_date: Date;
  declare cps_createdat: Date;
  declare cps_updatedat: Date;
}

SequelizeCostPerSupplier.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  pro_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  prov_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  sup_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cps_uuid: {
    type: DataTypes.STRING,
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cps_pricecost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  cps_basecost: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  cur_uuid: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  cps_exchangerate: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cps_suppliersku: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cps_leadtimedays: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cps_miniumorderquanty: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cps_boxquantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cps_notes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cps_suggestedminimumsellingprice: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cps_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cps_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cps_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cps_createdat',
  updatedAt: 'cps_updatedat',
  tableName: 'cps_costspersupplier'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCostPerSupplier.sync();
}