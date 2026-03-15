import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ItemEntity } from "../../../domain/item/item.entity";

export class SequelizeItem extends Model<ItemEntity, Omit<ItemEntity, 'id'>> {
  declare cmp_uuid: string;
  declare itm_uuid: string;
  declare itm_name: string;
  declare itm_description: string;
  declare itm_createdat: Date;
  declare itm_updatedat: Date;
}

SequelizeItem.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  itm_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  itm_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  itm_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  itm_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  itm_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'itm_createdat', 
  updatedAt: 'itm_updatedat',
  tableName: 'itm_items'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeItem.sync();
}