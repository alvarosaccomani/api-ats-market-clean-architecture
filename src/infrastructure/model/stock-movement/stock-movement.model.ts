import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { StockMovementEntity } from "../../../domain/stock-movement/stock-movement.entity";

export class SequelizeStockMovement extends Model<StockMovementEntity, Omit<StockMovementEntity, 'id'>> {
  declare cmp_uuid: string;
  declare pro_uuid: string;
  declare prov_uuid: string;
  declare smo_uuid: string;
  declare ord_uuid: string;
  declare usr_uuid: string;
  declare tsmo_uuid: string;
  declare smo_quantity: number;
  declare smo_previousstock: number;
  declare smo_currentstock: number;
  declare smo_reason: string;
  declare smo_createdat: Date;
  declare smo_updatedat: Date;
}

SequelizeStockMovement.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  pro_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  prov_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  smo_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ord_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tsmo_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  smo_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  smo_previousstock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  smo_currentstock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  smo_reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  smo_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  smo_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'smo_createdat', 
  updatedAt: 'smo_updatedat',
  tableName: 'smo_stockmovements'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeStockMovement.sync();
}
