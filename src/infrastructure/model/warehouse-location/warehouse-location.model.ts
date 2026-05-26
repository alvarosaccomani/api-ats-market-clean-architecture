import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { WarehouseLocationEntity } from "../../../domain/warehouse-location/warehouse-location.entity";

export class SequelizeWarehouseLocation extends Model<WarehouseLocationEntity, Omit<WarehouseLocationEntity, 'id'>> {
  declare cmp_uuid: string;
  declare war_uuid: string;
  declare warl_uuid: string;
  declare warl_aisle: string;
  declare warl_sector: string;
  declare warl_rack: string;
  declare warl_shelf: string;
  declare warl_bincode: string;
  declare warl_active: boolean;
  declare warl_createdat: Date;
  declare warl_updatedat: Date;
}

SequelizeWarehouseLocation.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  war_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  warl_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  warl_aisle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  warl_sector: {
    type: DataTypes.STRING,
    allowNull: false
  },
  warl_rack: {
    type: DataTypes.STRING,
    allowNull: false
  },
  warl_shelf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  warl_bincode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  warl_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  warl_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  warl_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'warl_createdat',
  updatedAt: 'warl_updatedat',
  tableName: 'warl_warehouselocations'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeWarehouseLocation.sync();
}
