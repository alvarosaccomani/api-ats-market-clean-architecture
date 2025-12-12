import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ArticleEntity } from "../../../domain/article/article.entity";

export class SequelizeArticle extends Model<ArticleEntity, Omit<ArticleEntity, 'id'>> {
  declare cmp_uuid: string;
  declare art_uuid: string;
  declare art_code: string;    
  declare art_name: string;
  declare art_image: string;
  declare art_description: string;    
  declare art_pricecost: number;
  declare art_stock: number;
  declare sup_uuid: string;
  declare itm_uuid: string;
  declare cat_uuid: string;
  declare art_createdat: Date;
  declare art_updatedat: Date;
}

SequelizeArticle.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  art_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  art_code: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  art_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  art_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  art_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  art_pricecost: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  art_stock: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  sup_uuid: {
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
  art_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  art_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'art_createdat',
  updatedAt: 'art_updatedat',
  tableName: 'art_articles'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeArticle.sync();
}