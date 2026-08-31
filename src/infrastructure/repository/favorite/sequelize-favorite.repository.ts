import { FavoriteEntity } from "../../../domain/favorite/favorite.entity";
import { FavoriteRepository } from "../../../domain/favorite/favorite.repository";
import { SequelizeFavorite } from "../../model/favorite/favorite.model";

export class SequelizeFavoriteRepository implements FavoriteRepository {
    async addFavorite(favorite: FavoriteEntity): Promise<FavoriteEntity | null> {
        try {
            const result = await SequelizeFavorite.create(favorite);
            return result ? (result.toJSON() as FavoriteEntity) : null;
        } catch (error: any) {
            console.error('Error en addFavorite:', error.message);
            throw error;
        }
    }

    async removeFavorite(usr_uuid: string, prov_uuid: string): Promise<boolean> {
        try {
            const result = await SequelizeFavorite.destroy({
                where: { usr_uuid, prov_uuid }
            });
            return result > 0;
        } catch (error: any) {
            console.error('Error en removeFavorite:', error.message);
            throw error;
        }
    }

    async findFavorite(usr_uuid: string, prov_uuid: string): Promise<FavoriteEntity | null> {
        try {
            const result = await SequelizeFavorite.findOne({
                where: { usr_uuid, prov_uuid }
            });
            return result ? (result.toJSON() as FavoriteEntity) : null;
        } catch (error: any) {
            console.error('Error en findFavorite:', error.message);
            throw error;
        }
    }

    async getFavoritesByUserId(usr_uuid: string): Promise<FavoriteEntity[] | null> {
        try {
            const results = await SequelizeFavorite.findAll({
                where: { usr_uuid },
                order: [['fav_createdat', 'DESC']]
            });
            return results.map(r => r.toJSON() as FavoriteEntity);
        } catch (error: any) {
            console.error('Error en getFavoritesByUserId:', error.message);
            throw error;
        }
    }
}
