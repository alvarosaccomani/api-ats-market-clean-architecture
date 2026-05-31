export interface OrderHistoryEntity {
    cmp_uuid: string;
    ord_uuid: string;
    ordh_uuid: string;
    ords_uuid: string;
    usr_uuid: string;
    ordh_comment: string;
    ordh_createdat: Date;
}

//Update
export type OrderHistoryUpdateData = Pick<OrderHistoryEntity, 'ordh_comment'>;
