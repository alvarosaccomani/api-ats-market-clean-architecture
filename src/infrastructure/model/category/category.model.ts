import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { CategoryEntity } from "../../../domain/category/category.entity";

export class SequelizeCategory extends Model<CategoryEntity, Omit<CategoryEntity, 'id'>> {
  declare cmp_uuid: string;
  declare itm_uuid: string;
  declare cat_uuid: string;
  declare gitm_uuid: string;
  declare gcat_uuid: string;
  declare cat_name: string;
  declare cat_description: string;
  declare cat_createdat: Date;
  declare cat_updatedat: Date;
}

SequelizeCategory.init({
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
  cat_uuid: {
    type: DataTypes.STRING,
    primaryKey: true/*,
    autoIncrement: true*/
  },
  gitm_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gcat_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cat_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cat_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cat_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cat_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cat_createdat', 
  updatedAt: 'cat_updatedat',
  tableName: 'cat_categories'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeCategory.sync();
}