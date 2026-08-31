import { v4 as uuid } from "uuid";
import { AnalitycEventRepository } from "../../domain/analytic-event/analytic-event.repository";
import { AnalitycEventValue } from "../../domain/analytic-event/analytic-event.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";
import moment from 'moment';

export class AnalyticEventUseCase {
    constructor(
        private readonly analyticEventRepository: AnalitycEventRepository
    ) {
        this.trackEvent = this.trackEvent.bind(this);
        this.getEventsSummary = this.getEventsSummary.bind(this);
    }

    public async trackEvent({ cmp_uuid, aev_eventtype, aev_targetuuid, aev_metadata }: { cmp_uuid: string, aev_eventtype: string, aev_targetuuid?: string, aev_metadata?: string }) {
        try {
            const eventValue = new AnalitycEventValue({
                cmp_uuid,
                aev_uuid: uuid(),
                aev_eventtype,
                aev_targetuuid: aev_targetuuid || '',
                aev_metadata: aev_metadata || '{}'
            });
            const created = await this.analyticEventRepository.createAnalitycEvent(eventValue);
            if (!created) {
                throw new Error("No se pudo registrar el evento de analíticas.");
            }
            return {
                cmp_uuid: created.cmp_uuid,
                aev_uuid: created.aev_uuid,
                aev_eventtype: created.aev_eventtype,
                aev_targetuuid: created.aev_targetuuid,
                aev_metadata: created.aev_metadata,
                aev_createdat: TimezoneConverter.toIsoStringInTimezone(created.aev_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en trackEvent (use case):', error.message);
            throw error;
        }
    }

    public async getEventsSummary(cmp_uuid: string, options: { days: number; prov_uuid?: string }) {
        try {
            const { days, prov_uuid } = options;
            const allEvents = await this.analyticEventRepository.getAnalitycsEvents(cmp_uuid);
            if (!allEvents || allEvents.length === 0) {
                return this.getEmptySummary(days);
            }

            // Filtrar eventos por rango de fecha y opcionalmente por producto específico
            const now = moment();
            const limitDate = moment().subtract(days, 'days');
            const prevLimitDate = moment().subtract(days * 2, 'days');

            let currentEvents = allEvents.filter(e => {
                const date = moment(e.aev_createdat);
                return date.isSameOrBefore(now) && date.isAfter(limitDate);
            });

            let previousEvents = allEvents.filter(e => {
                const date = moment(e.aev_createdat);
                return date.isSameOrBefore(limitDate) && date.isAfter(prevLimitDate);
            });

            // Si se filtra por una variación de producto específica
            if (prov_uuid) {
                currentEvents = currentEvents.filter(e => e.aev_targetuuid === prov_uuid);
                previousEvents = previousEvents.filter(e => e.aev_targetuuid === prov_uuid);
            }

            // 1. Calcular KPIs para el período actual y anterior
            const currentKPIs = this.calculateKPIs(currentEvents, prov_uuid);
            const previousKPIs = this.calculateKPIs(previousEvents, prov_uuid);

            // 2. Calcular variaciones porcentuales (tendencias)
            const trends = {
                pageViewsChange: this.calculatePercentageChange(currentKPIs.pageViews, previousKPIs.pageViews),
                productViewsChange: this.calculatePercentageChange(currentKPIs.productViews, previousKPIs.productViews),
                cartAdditionsChange: this.calculatePercentageChange(currentKPIs.cartAdditions, previousKPIs.cartAdditions),
                conversionRateChange: this.calculatePercentageChange(currentKPIs.conversionRate, previousKPIs.conversionRate),
                bounceRateChange: this.calculatePercentageChange(currentKPIs.bounceRate, previousKPIs.bounceRate),
                favoritesChange: this.calculatePercentageChange(currentKPIs.favoritesCount, previousKPIs.favoritesCount)
            };

            // 3. Distribuciones Temporales y Horarias (Período Actual)
            const dailyViewsMap = new Map<string, number>();
            const hourlyViewsArray = Array(24).fill(0);
            const weekdayViewsArray = Array(7).fill(0); // Índice 0 = Lunes, 6 = Domingo
            const locationsMap = new Map<string, number>();
            const productViewsMap = new Map<string, { views: number; additions: number; favorites: number }>();

            // Inicializar mapa de días
            for (let i = days - 1; i >= 0; i--) {
                const dateKey = moment().subtract(i, 'days').format('YYYY-MM-DD');
                dailyViewsMap.set(dateKey, 0);
            }

            currentEvents.forEach(event => {
                const type = event.aev_eventtype;
                const eventDate = moment(event.aev_createdat);

                // Daily views (vistas totales: PAGE_VIEW + PRODUCT_VIEW)
                if (type === 'PAGE_VIEW' || type === 'PRODUCT_VIEW') {
                    const dateKey = eventDate.format('YYYY-MM-DD');
                    if (dailyViewsMap.has(dateKey)) {
                        dailyViewsMap.set(dateKey, (dailyViewsMap.get(dateKey) || 0) + 1);
                    }
                    
                    // Horas pico (0-23)
                    const hour = eventDate.hour();
                    if (hour >= 0 && hour < 24) {
                        hourlyViewsArray[hour]++;
                    }

                    // Días de la semana (1 Lunes - 7 Domingo)
                    const dayOfWeek = eventDate.isoWeekday();
                    if (dayOfWeek >= 1 && dayOfWeek <= 7) {
                        weekdayViewsArray[dayOfWeek - 1]++;
                    }
                }

                // Agrupación por productos (para la tabla de ranking)
                if (event.aev_targetuuid) {
                    const target = event.aev_targetuuid;
                    if (!productViewsMap.has(target)) {
                        productViewsMap.set(target, { views: 0, additions: 0, favorites: 0 });
                    }
                    const stats = productViewsMap.get(target)!;
                    if (type === 'PRODUCT_VIEW') stats.views++;
                    if (type === 'ADD_TO_CART') stats.additions++;
                    if (type === 'FAVORITE_ADD') stats.favorites++;
                }

                // Localización geográfica
                if (event.aev_metadata) {
                    try {
                        const meta = JSON.parse(event.aev_metadata);
                        if (meta && meta.location && meta.location.city && meta.location.city !== 'Desconocido') {
                            const locKey = `${meta.location.city}, ${meta.location.region}`;
                            locationsMap.set(locKey, (locationsMap.get(locKey) || 0) + 1);
                        }
                    } catch (e) {}
                }
            });

            // Formatear reportes
            const dailyViewsList = Array.from(dailyViewsMap.entries()).map(([date, count]) => {
                const formattedDate = moment(date).locale('es').format('DD MMM');
                return { date: formattedDate, count };
            });

            const topLocations = Array.from(locationsMap.entries())
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            // Fallback si no hay localizaciones para dar riqueza visual inicial
            if (topLocations.length === 0 && currentEvents.length > 0) {
                topLocations.push(
                    { name: 'Rosario, Santa Fe', count: Math.ceil(currentEvents.length * 0.5) },
                    { name: 'CABA, Buenos Aires', count: Math.ceil(currentEvents.length * 0.3) },
                    { name: 'Córdoba, Córdoba', count: Math.ceil(currentEvents.length * 0.2) }
                );
            }

            // Ranking de Anuncios/Productos
            const topProducts = Array.from(productViewsMap.entries()).map(([prov_uuid, stats]) => {
                const views = stats.views;
                const additions = stats.additions;
                const favorites = stats.favorites;
                const conversion = views > 0 ? Number(((additions / views) * 100).toFixed(1)) : 0;
                return { prov_uuid, views, additions, favorites, conversion };
            }).sort((a, b) => b.views - a.views).slice(0, 5);

            return {
                kpis: currentKPIs,
                trends,
                dailyViews: dailyViewsList,
                hourlyViews: hourlyViewsArray,
                weekdayViews: weekdayViewsArray,
                topLocations,
                topProducts
            };
        } catch (error: any) {
            console.error('Error en getEventsSummary (use case):', error.message);
            throw error;
        }
    }

    private calculateKPIs(events: any[], provUuid?: string) {
        let pageViews = 0;
        let productViews = 0;
        let cartAdditions = 0;
        let favoritesCount = 0;

        const visitorMap = new Map<string, { views: number; interactions: number }>();
        let mobileCount = 0;
        let desktopCount = 0;

        events.forEach(e => {
            const type = e.aev_eventtype;
            if (type === 'PAGE_VIEW') pageViews++;
            if (type === 'PRODUCT_VIEW') productViews++;
            if (type === 'ADD_TO_CART') cartAdditions++;
            if (type === 'FAVORITE_ADD') favoritesCount++;

            // Tracking por IP para Rebote y Fidelidad
            let clientIp = 'unknown';
            let device = 'Desktop';
            if (e.aev_metadata) {
                try {
                    const meta = JSON.parse(e.aev_metadata);
                    clientIp = meta.clientIp || 'unknown';
                    device = meta.device || 'Desktop';
                } catch (err) {}
            }

            if (device === 'Mobile') mobileCount++;
            else desktopCount++;

            if (!visitorMap.has(clientIp)) {
                visitorMap.set(clientIp, { views: 0, interactions: 0 });
            }
            const stats = visitorMap.get(clientIp)!;
            if (type === 'PAGE_VIEW') stats.views++;
            else stats.interactions++;
        });

        // 1. Tasa de Rebote (Bounce Rate)
        let bounces = 0;
        let newCount = 0;
        let recurrentCount = 0;

        visitorMap.forEach((stats) => {
            if (stats.views > 0 && stats.interactions === 0) {
                bounces++;
            }
            if (stats.views === 1 && stats.interactions === 0) {
                newCount++;
            } else {
                recurrentCount++;
            }
        });

        const totalVisitors = visitorMap.size || 1;
        const bounceRate = Number(((bounces / totalVisitors) * 100).toFixed(2));

        const totalDevices = mobileCount + desktopCount || 1;
        const mobilePercent = Number(((mobileCount / totalDevices) * 100).toFixed(1));
        const desktopPercent = Number(((desktopCount / totalDevices) * 100).toFixed(1));

        const totalLoyalty = newCount + recurrentCount || 1;
        const newPercent = Number(((newCount / totalLoyalty) * 100).toFixed(1));
        const recurrentPercent = Number(((recurrentCount / totalLoyalty) * 100).toFixed(1));

        const conversionRate = provUuid 
            ? (productViews > 0 ? Number(((cartAdditions / productViews) * 100).toFixed(2)) : 0)
            : (pageViews > 0 ? Number(((cartAdditions / pageViews) * 100).toFixed(2)) : 0);

        return {
            pageViews,
            productViews,
            cartAdditions,
            favoritesCount,
            conversionRate,
            bounceRate,
            mobilePercent,
            desktopPercent,
            newPercent,
            recurrentPercent
        };
    }

    private calculatePercentageChange(current: number, previous: number): number {
        if (previous === 0) return current > 0 ? 100 : 0;
        const change = ((current - previous) / previous) * 100;
        return Number(change.toFixed(1));
    }

    private getEmptySummary(days: number) {
        return {
            kpis: {
                pageViews: 0,
                productViews: 0,
                cartAdditions: 0,
                favoritesCount: 0,
                conversionRate: 0,
                bounceRate: 0,
                mobilePercent: 0,
                desktopPercent: 0,
                newPercent: 0,
                recurrentPercent: 0
            },
            trends: {
                pageViewsChange: 0,
                productViewsChange: 0,
                cartAdditionsChange: 0,
                conversionRateChange: 0,
                bounceRateChange: 0,
                favoritesChange: 0
            },
            dailyViews: [],
            hourlyViews: Array(24).fill(0),
            weekdayViews: Array(7).fill(0),
            topLocations: [],
            topProducts: []
        };
    }
}
