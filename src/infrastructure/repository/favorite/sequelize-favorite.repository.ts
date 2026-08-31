import { FavoriteEntity } from "../../../domain/favorite/favorite.entity";
import { FavoriteRepository } from "../../../domain/favorite/favorite.repository";
import { SequelizeFavorite } from "../../model/favorite/favorite.model";
import { SequelizeProductVariation } from "../../model/product-variation/product-variation.model";
import { SequelizeCompany } from "../../model/company/company.model";
import { Op } from "sequelize";

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

    async getFavoritesWithDetailsByUserId(usr_uuid: string): Promise<any[] | null> {
        try {
            const favorites = await SequelizeFavorite.findAll({
                where: { usr_uuid },
                order: [['fav_createdat', 'DESC']]
            });
            if (!favorites || favorites.length === 0) {
                return [];
            }
            const favList = favorites.map(r => r.toJSON() as FavoriteEntity);
            const provUuids = favList.map(f => f.prov_uuid);

            const variations = await SequelizeProductVariation.findAll({
                where: {
                    prov_uuid: { [Op.in]: provUuids }
                }
            });

            const variationMap = new Map(variations.map(v => [v.prov_uuid, v.toJSON() as any]));

            // Fetch company names
            const cmpUuids = [...new Set(variations.map(v => v.cmp_uuid))];
            const companies = cmpUuids.length > 0 ? await SequelizeCompany.findAll({
                where: { cmp_uuid: { [Op.in]: cmpUuids } }
            }) : [];
            const companyMap = new Map(companies.map(c => [c.cmp_uuid, c.get({ plain: true })]));

            // Merge details
            const results = favList.map(fav => {
                const varData: any = variationMap.get(fav.prov_uuid) || {};
                const compData: any = companyMap.get(fav.cmp_uuid) || {};
                return {
                    ...fav,
                    prov_code: varData.prov_code,
                    prov_sku: varData.prov_sku,
                    prov_name: varData.prov_name,
                    prov_description: varData.prov_description,
                    prov_image: varData.prov_image,
                    prov_color: varData.prov_color,
                    prov_size: varData.prov_size,
                    prov_stock: varData.prov_stock ?? 0,
                    prov_suggestedminimumsellingprice: varData.prov_suggestedminimumsellingprice ?? 0,
                    prov_isvisible: varData.prov_isvisible,
                    cmp_name: compData.cmp_name || '',
                    cmp_slug: compData.cmp_slug || ''
                };
            });

            return results;
        } catch (error: any) {
            console.error('Error en getFavoritesWithDetailsByUserId:', error.message);
            throw error;
        }
    }
}
