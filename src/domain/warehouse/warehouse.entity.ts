export interface WarehouseEntity {
    cmp_uuid: string;
    war_uuid: string;
    war_name: string;
    war_address: string;
    war_lat: number;
    war_lng: number;
    war_active: boolean;
    war_createdat: Date;
    war_updatedat: Date;
}

//Update
export type WarehouseUpdateData = Pick<WarehouseEntity, 'war_name' | 'war_address' | 'war_lat' | 'war_lng' | 'war_active'>;
