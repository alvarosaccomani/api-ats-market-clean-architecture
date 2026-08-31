import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { FavoriteEntity } from "../../../domain/favorite/favorite.entity";

export class SequelizeFavorite extends Model<FavoriteEntity, Omit<FavoriteEntity, 'fav_uuid'>> {
  declare fav_uuid: string;
  declare usr_uuid: string;
  declare cmp_uuid: string;
  declare pro_uuid: string;
  declare prov_uuid: string;
  declare fav_createdat: Date;
  declare fav_updatedat: Date;
}

SequelizeFavorite.init({
  fav_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'usr_users',
      key: 'usr_uuid'
    }
  },
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pro_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prov_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fav_createdat: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  fav_updatedat: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'fav_createdat',
  updatedAt: 'fav_updatedat',
  tableName: 'fav_favorites'
});

if (process.env.NODE_ENV !== "production") {
  SequelizeFavorite.sync();
}
