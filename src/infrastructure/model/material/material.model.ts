import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { MaterialEntity } from "../../../domain/material/material.entity";

export class SequelizeMaterial extends Model<MaterialEntity, Omit<MaterialEntity, 'id'>> {
  declare cmp_uuid: string;
  declare mat_uuid: string;
  declare gmat_uuid: string;
  declare mat_name: string;
  declare mat_description: string;
  declare mat_createdat: Date;
  declare mat_updatedat: Date;
}

SequelizeMaterial.init({
  cmp_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  mat_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  gmat_uuid: {
    type: DataTypes.STRING,
    primaryKey: true/*,
    autoIncrement: true*/
  },
  mat_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mat_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mat_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  mat_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'mat_createdat', 
  updatedAt: 'mat_updatedat',
  tableName: 'mat_materials'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeMaterial.sync();
}