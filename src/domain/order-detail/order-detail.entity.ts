export interface OrderDetailEntity {
    cmp_uuid: string;
    ord_uuid: string;
    ordd_uuid: string;
    pro_uuid: string;
    prov_uuid?: string;
    ordd_productname: string;
    ordd_code: string;
    ordd_sku: string;
    ordd_quantity: number;
    ordd_unitprice: number;
    ordd_discount?: number;
    ordd_subtotal?: number;
    ordd_taxrate?: number;
    ordd_tax?: number;
    ordd_basecost?: number;
    ordd_createdat?: Date;
    ordd_updatedat?: Date;
}

//Update
export type OrderDetailUpdateData = Pick<OrderDetailEntity, 'pro_uuid' | 'prov_uuid' | 'ordd_productname' | 'ordd_code' | 'ordd_sku' | 'ordd_quantity' | 'ordd_unitprice' | 'ordd_discount' | 'ordd_subtotal' | 'ordd_taxrate' | 'ordd_tax' | 'ordd_basecost'>;
