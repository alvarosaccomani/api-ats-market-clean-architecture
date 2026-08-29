import { AnalitycEventEntity, AnalitycEventUpdateData } from "../../../domain/analytic-event/analytic-event.entity";
import { AnalitycEventRepository } from "../../../domain/analytic-event/analytic-event.repository";
import { SequelizeAnalyticsEvent } from "../../model/analytic-event/analytic-event.model";
import { Op } from "sequelize";

export class SequelizeRepository implements AnalitycEventRepository {
    async getAnalitycsEvents(cmp_uuid: string): Promise<AnalitycEventEntity[] | null> {
        try {
            const events = await SequelizeAnalyticsEvent.findAll({ 
                where: { cmp_uuid },
                order: [['aev_createdat', 'ASC']]
            });
            return events.map(e => e.dataValues);
        } catch (error: any) {
            console.error('Error en getAnalitycsEvents:', error.message);
            throw error;
        }
    }
    
    async findAnalitycEventById(cmp_uuid: string, aev_uuid: string): Promise<AnalitycEventEntity | null> {
        try {
            const event = await SequelizeAnalyticsEvent.findOne({ where: { cmp_uuid, aev_uuid } });
            return event ? event.dataValues : null;
        } catch (error: any) {
            console.error('Error en findAnalitycEventById:', error.message);
            throw error;
        }
    }
    
    async createAnalitycEvent(analitycEvent: AnalitycEventEntity): Promise<AnalitycEventEntity | null> {
        try {
            const result = await SequelizeAnalyticsEvent.create(analitycEvent);
            return result ? (result.dataValues as AnalitycEventEntity) : null;
        } catch (error: any) {
            console.error('Error en createAnalitycEvent:', error.message);
            throw error;
        }
    }
    
    async updateAnalitycEvent(cmp_uuid: string, aev_uuid: string, analitycEvent: AnalitycEventUpdateData): Promise<AnalitycEventEntity | null> {
        try {
            const [updatedCount, [updatedEvent]] = await SequelizeAnalyticsEvent.update(
                { 
                    aev_eventtype: analitycEvent.aev_eventtype,
                    aev_targetuuid: analitycEvent.aev_targetuuid,
                    aev_metadata: analitycEvent.aev_metadata
                },
                { 
                    where: { cmp_uuid, aev_uuid },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el evento`);
            }
            return updatedEvent.get({ plain: true }) as AnalitycEventEntity;
        } catch (error: any) {
            console.error('Error en updateAnalitycEvent:', error.message);
            throw error;
        }
    }
    
    async deleteAnalitycEvent(cmp_uuid: string, aev_uuid: string): Promise<AnalitycEventEntity | null> {
        try {
            const event = await this.findAnalitycEventById(cmp_uuid, aev_uuid);
            if (event) {
                await SequelizeAnalyticsEvent.destroy({ where: { cmp_uuid, aev_uuid } });
            }
            return event;
        } catch (error: any) {
            console.error('Error en deleteAnalitycEvent:', error.message);
            throw error;
        }
    }
}
