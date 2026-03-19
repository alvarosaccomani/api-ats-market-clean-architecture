import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { GlobalCategoryEntity } from "../../../domain/global-category/global-category.entity";

export class SequelizeGlobalCategory extends Model<GlobalCategoryEntity, Omit<GlobalCategoryEntity, 'id'>> {
  declare gitm_uuid: string;
  declare gcat_uuid: string;
  declare gcat_name: string;
  declare gcat_description: string;
  declare gcat_image: string;
  declare gcat_createdat: Date;
  declare gcat_updatedat: Date;
}

SequelizeGlobalCategory.init({
  gitm_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  gcat_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  gcat_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gcat_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gcat_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gcat_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  gcat_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'gcat_createdat', 
  updatedAt: 'gcat_updatedat',
  tableName: 'gcat_globalcategories'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeGlobalCategory.sync();
}