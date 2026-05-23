import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { TypeStockMovementEntity } from "../../../domain/type-stock-movement/type-stock-movement.entity";

export class SequelizeTypeStockMovement extends Model<TypeStockMovementEntity, Omit<TypeStockMovementEntity, 'id'>> {
  declare tsmo_uuid: string;
  declare tsmo_code: string;
  declare tsmo_name: string;
  declare tsmo_description: string;
  declare tsmo_bkcolor: string;
  declare tsmo_frcolor: string;
  declare tsmo_createdat: Date;
  declare tsmo_updatedat: Date;
}

SequelizeTypeStockMovement.init({
  tsmo_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  tsmo_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tsmo_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tsmo_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tsmo_bkcolor: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#ffffff'
  },
  tsmo_frcolor: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#000000'
  },
  tsmo_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tsmo_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'tsmo_createdat', 
  updatedAt: 'tsmo_updatedat',
  tableName: 'tsmo_typestockmovements'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeTypeStockMovement.sync();
}
