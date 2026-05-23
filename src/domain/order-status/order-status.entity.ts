export interface OrderStatusEntity {
    ords_uuid: string,
    ords_code: string,
    ords_name: string,    
    ords_description: string,
    ords_bkcolor: string,
    ords_frcolor: string,
    ords_createdat: Date,
    ords_updatedat: Date
}

//Update
export type OrderStatusUpdateData = Pick<OrderStatusEntity, 'ords_code' | 'ords_name' | 'ords_description' | 'ords_bkcolor' | 'ords_frcolor'>;
