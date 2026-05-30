import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ProductVariationReviewEntity } from "../../../domain/product-variation-review/product-variation-review.entity";

export class SequelizeProductVariationReview extends Model<ProductVariationReviewEntity, Omit<ProductVariationReviewEntity, 'id'>> {
  declare cmp_uuid: string;
  declare pro_uuid: string;
  declare prov_uuid: string;
  declare provrev_uuid: string;
  declare usr_uuid: string;
  declare cus_uuid: string;
  declare provrev_rating: number;
  declare provrev_comment: string;
  declare provrev_isverified: boolean;
  declare provrev_createdat: Date;
  declare provrev_updatedat: Date;
}

SequelizeProductVariationReview.init({
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
  provrev_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cus_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provrev_rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  provrev_comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  provrev_isverified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  provrev_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  provrev_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'provrev_createdat',
  updatedAt: 'provrev_updatedat',
  tableName: 'provrev_productsvariationsreviews'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeProductVariationReview.sync();
}
