export interface WarehouseLocationEntity {
    cmp_uuid: string;
    war_uuid: string;
    warl_uuid: string;
    warl_aisle: string;
    warl_sector: string;
    warl_rack: string;
    warl_shelf: string;
    warl_bincode: string;
    warl_active: boolean;
    warl_createdat: Date;
    warl_updatedat: Date;
}

//Update
export type WarehouseLocationUpdateData = Pick<WarehouseLocationEntity, 'warl_aisle' | 'warl_sector' | 'warl_rack' | 'warl_shelf' | 'warl_bincode' | 'warl_active'>;
