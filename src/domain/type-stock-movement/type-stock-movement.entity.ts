export interface TypeStockMovementEntity {
    tsmo_uuid: string,
    tsmo_code: string,
    tsmo_name: string,    
    tsmo_description: string,
    tsmo_bkcolor: string,
    tsmo_frcolor: string,
    tsmo_createdat: Date,
    tsmo_updatedat: Date
}

//Update
export type TypeStockMovementUpdateData = Pick<TypeStockMovementEntity, 'tsmo_code' | 'tsmo_name' | 'tsmo_description' | 'tsmo_bkcolor' | 'tsmo_frcolor'>;