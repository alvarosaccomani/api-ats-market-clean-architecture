import { v4 as uuidv4 } from 'uuid';
import { FavoriteEntity } from './favorite.entity';

export class FavoriteValue implements FavoriteEntity {
  public fav_uuid: string;
  public cmp_uuid: string;
  public pro_uuid: string;
  public prov_uuid: string;
  public usr_uuid: string;
  public fav_createdat: Date;
  public fav_updatedat: Date;

  constructor({ cmp_uuid, pro_uuid, prov_uuid, usr_uuid }: { cmp_uuid: string; pro_uuid: string; prov_uuid: string; usr_uuid: string }) {
    this.fav_uuid = uuidv4();
    this.cmp_uuid = cmp_uuid;
    this.pro_uuid = pro_uuid;
    this.prov_uuid = prov_uuid;
    this.usr_uuid = usr_uuid;
    this.fav_createdat = new Date();
    this.fav_updatedat = new Date();
  }
}