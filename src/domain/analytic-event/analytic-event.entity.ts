export interface AnalitycEventEntity {
    cmp_uuid: string;
    aev_uuid: string;
    aev_eventtype: string;
    aev_targetuuid: string;
    aev_metadata: string;
    aev_createdat: Date;
    aev_updatedat: Date;
}

//Update
export type AnalitycEventUpdateData = Pick<AnalitycEventEntity, 'aev_eventtype' | 'aev_targetuuid' | 'aev_metadata'>;
