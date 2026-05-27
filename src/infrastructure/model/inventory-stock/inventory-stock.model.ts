import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { InventoryStockEntity } from "../../../domain/inventory-stock/inventory-stock.entity";

export class SequelizeInventoryStock extends Model<InventoryStockEntity, Omit<InventoryStockEntity, 'id'>> {
  declare cmp_uuid: string;
  declare pro_uuid: string;
  declare prov_uuid: string;
  declare war_uuid: string;
  declare warl_uuid: string;
  declare ist_quanty: number;
  declare ist_quantyreserved: number;
  declare ist_createdat: Date;
  declare ist_updatedat: Date;
}

SequelizeInventoryStock.init({
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
  war_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  warl_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ist_quanty: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  ist_quantyreserved: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  ist_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ist_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'ist_createdat',
  updatedAt: 'ist_updatedat',
  tableName: 'ist_inventorystock'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeInventoryStock.sync();
}
