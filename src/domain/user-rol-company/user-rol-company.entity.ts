import { UserEntity } from "../user/user.entity";

export interface UserRolCompanyEntity {
    cmp_uuid: string,
    usr_uuid: string,
    usr?: UserEntity,
    rol_uuid: string,
    usrrolcmp_createdat: Date,
    usrrolcmp_updatedat: Date

}