import { AnalitycEventEntity, AnalitycEventUpdateData } from "./analytic-event.entity";

export interface AnalitycEventRepository {
    getAnalitycsEvents(cmp_uuid: string): Promise<AnalitycEventEntity[] | null>;
    findAnalitycEventById(cmp_uuid: string, aev_uuid: string): Promise<AnalitycEventEntity | null>;
    createAnalitycEvent(analitycEvent: AnalitycEventEntity): Promise<AnalitycEventEntity | null>;
    updateAnalitycEvent(cmp_uuid: string, aev_uuid: string, analitycEvent: AnalitycEventUpdateData): Promise<AnalitycEventEntity | null>;
    deleteAnalitycEvent(cmp_uuid: string, aev_uuid: string): Promise<AnalitycEventEntity | null>;
}