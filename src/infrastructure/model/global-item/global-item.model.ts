import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { GlobalItemEntity } from "../../../domain/global-item/global-item.entity";

export class SequelizeGlobalItem extends Model<GlobalItemEntity, Omit<GlobalItemEntity, 'id'>> {
  declare gitm_uuid: string;
  declare gitm_name: string;
  declare gitm_description: string;
  declare gitm_createdat: Date;
  declare gitm_updatedat: Date;
}

SequelizeGlobalItem.init({
  gitm_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  gitm_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gitm_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gitm_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  gitm_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'gitm_createdat', 
  updatedAt: 'gitm_updatedat',
  tableName: 'gitm_globalitems'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeGlobalItem.sync();
}