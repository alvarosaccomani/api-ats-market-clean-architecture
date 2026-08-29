import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { AnalitycEventEntity } from "../../../domain/analytic-event/analytic-event.entity";

export class SequelizeAnalyticsEvent extends Model<AnalitycEventEntity, Omit<AnalitycEventEntity, 'id'>> {
  declare cmp_uuid: string;
  declare aev_uuid: string;
  declare aev_eventtype: string;
  declare aev_targetuuid: string;
  declare aev_metadata: string;
  declare aev_createdat: Date;
  declare aev_updatedat: Date;
}

SequelizeAnalyticsEvent.init({
  cmp_uuid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  aev_uuid: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  aev_eventtype: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  aev_targetuuid: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  aev_metadata: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aev_createdat: {
    type: DataTypes.DATE,
    allowNull: false
  },
  aev_updatedat: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'aev_createdat',
  updatedAt: 'aev_updatedat',
  tableName: 'aev_analyticsevents'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
  SequelizeAnalyticsEvent.sync();
}
