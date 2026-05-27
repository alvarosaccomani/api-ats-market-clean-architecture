export interface InventoryStockEntity {
    cmp_uuid: string;
    pro_uuid: string;
    prov_uuid: string;
    war_uuid: string;
    warl_uuid: string;
    ist_quanty: number;
    ist_quantyreserved: number;
    ist_createdat: Date;
    ist_updatedat: Date;
}

//Update
export type InventoryStockUpdateData = Pick<InventoryStockEntity, 'ist_quanty' | 'ist_quantyreserved'>;
