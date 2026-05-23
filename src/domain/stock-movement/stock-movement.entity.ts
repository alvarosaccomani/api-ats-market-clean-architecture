export interface StockMovementEntity {
    cmp_uuid: string,
    pro_uuid: string,
    prov_uuid: string,    
    smo_uuid: string,
    ord_uuid?: string,
    usr_uuid?: string,
    tsmo_uuid: string,
    smo_quantity: number,
    smo_previousstock: number,
	smo_currentstock: number,
  	smo_reason: string,
    smo_createdat: Date,
    smo_updatedat: Date
}

//Update
export type StockMovementUpdateData = Pick<StockMovementEntity, 'ord_uuid' | 'usr_uuid' | 'tsmo_uuid' | 'smo_quantity' | 'smo_previousstock' | 'smo_currentstock' | 'smo_reason'>;