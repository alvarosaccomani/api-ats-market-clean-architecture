import { CustomerEntity } from "../customer/customer.entity";
import { OrderDetailEntity } from "../order-detail/order-detail.entity";

export interface OrderEntity {
    cmp_uuid: string;
    ord_uuid: string;
    usr_uuid: string;
    cus_uuid: string;
    cus?: CustomerEntity,
    adr_uuid: string;
    ord_ordernumber: number;
    ord_customername: string;
    ord_customeremail: string;
    ord_contactphone: string;
    ords_uuid: string;
    ord_date: Date;
    ord_subtotal: number;
    ord_shippingcost: number;
    ord_tax: number;
    ord_total: number;
    ord_customernotes: string;
    ord_trackingnumber: string;
    ord_createdat: Date;
    ord_updatedat: Date;
    orderDetails?: OrderDetailEntity[];
}

//Update
export type OrderUpdateData = Pick<OrderEntity, 'usr_uuid' | 'cus_uuid' | 'adr_uuid' | 'ord_ordernumber' | 'ord_customername' | 'ord_customeremail' | 'ord_contactphone' | 'ords_uuid' | 'ord_date' | 'ord_subtotal' | 'ord_shippingcost' | 'ord_tax' | 'ord_total' | 'ord_customernotes' | 'ord_trackingnumber'>;
