import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { PaymentWebhookLogEntity } from '../../../domain/payment-webhook-log/payment-webhook-log.entity';

export class SequelizePaymentWebhookLog extends Model<PaymentWebhookLogEntity, Omit<PaymentWebhookLogEntity, 'pwl_uuid'>> implements PaymentWebhookLogEntity {
  declare pwl_uuid: string;
  declare pwl_provider: 'MERCADO_PAGO' | 'STRIPE';
  declare pwl_eventid: string;
  declare pwl_paymentid: string | null;
  declare cmp_uuid: string | null;
  declare ord_uuid: string | null;
  declare pwl_status: 'PROCESSED' | 'IGNORED' | 'FAILED';
  declare pwl_payload: any;
  declare pwl_errormessage: string | null;
  declare pwl_createdat: Date;
  declare pwl_updatedat: Date;
}

SequelizePaymentWebhookLog.init({
  pwl_uuid: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  pwl_provider: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  pwl_eventid: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  pwl_paymentid: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cmp_uuid: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  ord_uuid: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  pwl_status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'PROCESSED'
  },
  pwl_payload: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  pwl_errormessage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pwl_createdat: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  pwl_updatedat: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'pwl_createdat',
  updatedAt: 'pwl_updatedat',
  tableName: 'pwl_paymentwebhooklogs'
});

if (process.env.NODE_ENV !== 'production') {
  SequelizePaymentWebhookLog.sync({ alter: true });
}
