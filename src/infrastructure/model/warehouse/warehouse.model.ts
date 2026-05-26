import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { WarehouseEntity } from "../../../domain/warehouse/warehouse.entity";

export class SequelizeWarehouse extends Model<WarehouseEntity, Omit<WarehouseEntity, 'id'>> {
  declare cmp_uuid: string;
  declare war_uuid: string;
  declare war_name: string;
  declare war_address: string;
  declare war_lat: number;
  declare war_lng: number;
  declare war_active: boolean;
  declare war_createdat: Date;
  declare war_updatedat: Date;
}

SequelizeWarehouse.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  war_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  war_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  war_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  war_lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  war_lng: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  war_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  war_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  war_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'war_createdat', 
  updatedAt: 'war_updatedat',
  tableName: 'war_warehouses'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeWarehouse.sync();
}
