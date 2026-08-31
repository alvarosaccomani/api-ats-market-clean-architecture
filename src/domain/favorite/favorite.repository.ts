import { FavoriteEntity } from "./favorite.entity";

export interface FavoriteRepository {
    addFavorite(favorite: FavoriteEntity): Promise<FavoriteEntity | null>;
    removeFavorite(usr_uuid: string, prov_uuid: string): Promise<boolean>;
    findFavorite(usr_uuid: string, prov_uuid: string): Promise<FavoriteEntity | null>;
    getFavoritesByUserId(usr_uuid: string): Promise<FavoriteEntity[] | null>;
}