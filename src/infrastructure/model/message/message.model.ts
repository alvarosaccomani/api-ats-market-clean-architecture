import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { MessageEntity } from "../../../domain/message/message.entity";

export class SequelizeMessage extends Model<MessageEntity, Omit<MessageEntity, 'id'>> {
  declare cmp_uuid: string;
  declare msg_uuid: string;
  declare ord_uuid: string;
  declare msg_sender: string;
  declare usr_uuid: string;
  declare cus_uuid: string | null;
  declare msg_sendername: string;
  declare msg_text: string;
  declare msg_createdat: Date;
  declare msg_updatedat: Date;
}

SequelizeMessage.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  msg_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ord_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  msg_sender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cus_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  msg_sendername: {
    type: DataTypes.STRING,
    allowNull: false
  },
  msg_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  msg_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  msg_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'msg_createdat',
  updatedAt: 'msg_updatedat',
  tableName: 'msg_messages'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeMessage.sync();
}
