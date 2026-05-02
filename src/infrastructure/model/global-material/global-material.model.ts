import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { GlobalMaterialEntity } from "../../../domain/global-material/global-material.entity";

export class SequelizeGlobalMaterial extends Model<GlobalMaterialEntity, Omit<GlobalMaterialEntity, 'id'>> {
  declare gmat_uuid: string;
  declare gmat_name: string;
  declare gmat_description: string;
  declare gmat_image: string;
  declare gmat_createdat: Date;
  declare gmat_updatedat: Date;
}

SequelizeGlobalMaterial.init({
  gmat_uuid: {
    type: DataTypes.STRING, 
    primaryKey: true/*,
    autoIncrement: true*/
  },
  gmat_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gmat_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gmat_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gmat_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  gmat_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'gmat_createdat', 
  updatedAt: 'gmat_updatedat',
  tableName: 'gmat_globalmaterials'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeGlobalMaterial.sync();
}