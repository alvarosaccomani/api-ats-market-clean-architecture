import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { AddressEntity } from "../../../domain/address/address.entity";

export class SequelizeAddress extends Model<AddressEntity, Omit<AddressEntity, 'id'>> {
  declare adr_uuid: string;
  declare cmp_uuid: string;
  declare usr_uuid: string;
  declare cus_uuid: string;
  declare sup_uuid: string;
  declare adr_alias: string;
  declare adr_recipientname: string;
  declare adr_contactphone: string;
  declare adr_reference: string;
  declare adr_country: string;
  declare adr_address: string;
  declare adr_city: string;
  declare adr_province: string;
  declare adr_postalcode: string;
  declare adr_lat: number;
  declare adr_lng: number;
  declare adr_createdat: Date;
  declare adr_updatedat: Date;
}

SequelizeAddress.init({
  adr_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cus_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sup_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_alias: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_recipientname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_contactphone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_reference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_province: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_postalcode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adr_lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  adr_lng: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  adr_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  adr_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'adr_createdat', 
  updatedAt: 'adr_updatedat',
  tableName: 'adr_addresses'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeAddress.sync();
}