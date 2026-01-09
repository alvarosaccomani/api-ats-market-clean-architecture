import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ProductEntity } from "../../../domain/product/product.entity";

export class SequelizeProduct extends Model<ProductEntity, Omit<ProductEntity, 'id'>> {
  declare cmp_uuid: string;
  declare pro_uuid: string;
  declare pro_code: string;    
  declare pro_name: string;
  declare pro_image: string;
  declare pro_description: string;
  declare itm_uuid: string;
  declare cat_uuid: string;
  declare pro_createdat: Date;
  declare pro_updatedat: Date;
}

SequelizeProduct.init({
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
  pro_code: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  pro_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pro_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pro_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  itm_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cat_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pro_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pro_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'pro_createdat',
  updatedAt: 'pro_updatedat',
  tableName: 'pro_products'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeProduct.sync();
}