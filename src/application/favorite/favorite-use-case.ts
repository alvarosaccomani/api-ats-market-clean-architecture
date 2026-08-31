import { FavoriteRepository } from "../../domain/favorite/favorite.repository";
import { FavoriteEntity } from "../../domain/favorite/favorite.entity";
import { FavoriteValue } from "../../domain/favorite/favorite.value";
import { AnalyticEventUseCase } from "../analytic-event/analytic-event-use-case";

export class FavoriteUseCase {
    constructor(
        private readonly favoriteRepository: FavoriteRepository,
        private readonly analyticEventUseCase: AnalyticEventUseCase
    ) {}

    public async addFavorite({ 
        usr_uuid, 
        cmp_uuid, 
        pro_uuid, 
        prov_uuid, 
        clientIp, 
        device, 
        location 
    }: { 
        usr_uuid: string; 
        cmp_uuid: string; 
        pro_uuid: string; 
        prov_uuid: string; 
        clientIp?: string; 
        device?: string; 
        location?: any; 
    }): Promise<FavoriteEntity | null> {
        // Verificar si ya existe en favoritos
        const existing = await this.favoriteRepository.findFavorite(usr_uuid, prov_uuid);
        if (existing) {
            return existing;
        }

        const favValue = new FavoriteValue({ cmp_uuid, pro_uuid, prov_uuid, usr_uuid });
        const created = await this.favoriteRepository.addFavorite(favValue);

        if (created) {
            // Tracking automático del evento FAVORITE_ADD para las analíticas
            try {
                await this.analyticEventUseCase.trackEvent({
                    cmp_uuid,
                    aev_eventtype: 'FAVORITE_ADD',
                    aev_targetuuid: prov_uuid,
                    aev_metadata: JSON.stringify({
                        clientIp: clientIp || '127.0.0.1',
                        device: device || 'Desktop',
                        location: location || { country: 'Argentina', region: 'Buenos Aires', city: 'CABA' },
                        usr_uuid
                    })
                });
            } catch (err: any) {
                console.error('[FavoriteUseCase] Error al trackear FAVORITE_ADD:', err.message);
            }
        }

        return created;
    }

    public async removeFavorite({ 
        usr_uuid, 
        prov_uuid, 
        cmp_uuid 
    }: { 
        usr_uuid: string; 
        prov_uuid: string; 
        cmp_uuid?: string; 
    }): Promise<boolean> {
        const existing = await this.favoriteRepository.findFavorite(usr_uuid, prov_uuid);
        if (!existing) {
            return false;
        }

        const deleted = await this.favoriteRepository.removeFavorite(usr_uuid, prov_uuid);

        if (deleted) {
            // Tracking del evento FAVORITE_REMOVE
            try {
                await this.analyticEventUseCase.trackEvent({
                    cmp_uuid: cmp_uuid || existing.cmp_uuid,
                    aev_eventtype: 'FAVORITE_REMOVE',
                    aev_targetuuid: prov_uuid,
                    aev_metadata: JSON.stringify({ usr_uuid })
                });
            } catch (err: any) {
                console.error('[FavoriteUseCase] Error al trackear FAVORITE_REMOVE:', err.message);
            }
        }

        return deleted;
    }

    public async getFavoritesByUserId(usr_uuid: string): Promise<FavoriteEntity[] | null> {
        return await this.favoriteRepository.getFavoritesByUserId(usr_uuid);
    }
}
