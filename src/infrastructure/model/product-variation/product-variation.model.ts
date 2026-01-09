import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ProductVariationEntity } from "../../../domain/product-variation/product-variation.entity";

export class SequelizeProductVariation extends Model<ProductVariationEntity, Omit<ProductVariationEntity, 'id'>> {
  declare cmp_uuid: string;
  declare pro_uuid: string;
  declare prov_uuid: string;
  declare prov_code: string;
  declare prov_sku: string;    
  declare prov_name: string;
  declare prov_description: string;
  declare prov_image: string;
  declare prov_color: string;
  declare prov_size: string;
  declare prov_stock: number;
  declare prov_suggestedminimumsellingprice: number;
  declare prov_createdat: Date;
  declare prov_updatedat: Date;
}

SequelizeProductVariation.init({
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
  prov_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prov_sku: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prov_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prov_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prov_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prov_color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prov_size: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prov_stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  prov_suggestedminimumsellingprice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  prov_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  prov_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'prov_createdat',
  updatedAt: 'prov_updatedat',
  tableName: 'prov_productsvariations'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeProductVariation.sync();
}