import { CustomerEntity, CustomerUpdateData } from "./customer.entity";

export interface CustomerRepository {
    getCustomers(): Promise<CustomerEntity[] | null>;
    findCustomerById(usr_uuid: string, cus_uuid: string): Promise<CustomerEntity | null>;
    createCustomer(customer: CustomerEntity): Promise<CustomerEntity | null>;
    updateCustomer(usr_uuid: string, cus_uuid: string, customer: CustomerUpdateData): Promise<CustomerEntity | null>;
    deleteCustomer(usr_uuid: string, cus_uuid: string): Promise<CustomerEntity | null>;
    findCustomerByName(cus_name: string, excludeUuid?: string | null): Promise<CustomerEntity | null>;
}