import { v4 as uuid } from "uuid";
import { CustomerRepository } from "../../domain/customer/customer.repository";
import { CustomerValue } from "../../domain/customer/customer.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepository
    ) {
        this.getCustomers = this.getCustomers.bind(this);
        this.getDetailCustomer = this.getDetailCustomer.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.findCustomerByName = this.findCustomerByName.bind(this);
    }

    public async getCustomers() {
        try {
            const customer = await this.customerRepository.getCustomers();
            if(!customer) {
                throw new Error('No hay clientes.');
            }
            return customer.map(customer => ({
                usr_uuid: customer.usr_uuid,
                cus_uuid: customer.cus_uuid,
                cus_fullname: customer.cus_fullname,
                cus_email: customer.cus_email,
                cus_phone: customer.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customer.cus_dateofbirth, 'America/Buenos_Aires'),
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customer.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customer.cus_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCustomers (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCustomer(usr_uuid: string, cus_uuid: string) {
        try {
            const customer = await this.customerRepository.findCustomerById(usr_uuid, cus_uuid);
            if(!customer) {
                throw new Error(`No hay cliente con el Id: ${usr_uuid}, ${cus_uuid}`);
            }
            return {
                usr_uuid: customer.usr_uuid,
                cus_uuid: customer.cus_uuid,
                cus_fullname: customer.cus_fullname,
                cus_email: customer.cus_email,
                cus_phone: customer.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customer.cus_dateofbirth, 'America/Buenos_Aires'),
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customer.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customer.cus_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCustomer({ usr_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth } : { usr_uuid: string, cus_uuid: string, cus_fullname: string, cus_email: string, cus_phone: string, cus_dateofbirth: Date }) {
        try {
            const customerValue = new CustomerValue({ usr_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth });
            const customerCreated = await this.customerRepository.createCustomer(customerValue);
            if(!customerCreated) {
                throw new Error(`No se pudo insertar el cliente.`);
            }
            return {
                usr_uuid: customerCreated.usr_uuid,
                cus_uuid: customerCreated.cus_uuid,
                cus_fullname: customerCreated.cus_fullname,
                cus_email: customerCreated.cus_email,
                cus_phone: customerCreated.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customerCreated.cus_dateofbirth, 'America/Buenos_Aires'),
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customerCreated.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customerCreated.cus_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCustomer(usr_uuid: string, cus_uuid: string, { cus_fullname, cus_email, cus_phone, cus_dateofbirth } : { cus_fullname: string, cus_email: string, cus_phone: string, cus_dateofbirth: Date }) {
        try {
            const customerUpdated = await this.customerRepository.updateCustomer(usr_uuid, cus_uuid, { cus_fullname, cus_email, cus_phone, cus_dateofbirth });
            if(!customerUpdated) {
                throw new Error(`No se pudo actualizar el cliente.`);
            }
            return {
                usr_uuid: customerUpdated.usr_uuid,
                cus_uuid: customerUpdated.cus_uuid,
                cus_fullname: customerUpdated.cus_fullname,
                cus_email: customerUpdated.cus_email,
                cus_phone: customerUpdated.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customerUpdated.cus_dateofbirth, 'America/Buenos_Aires'),
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customerUpdated.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customerUpdated.cus_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCustomer(usr_uuid: string, cus_uuid: string) {
        try {
            const customerDeleted = await this.customerRepository.deleteCustomer(usr_uuid, cus_uuid);
            if(!customerDeleted) {
                throw new Error(`No se pudo eliminar el cliente.`);
            }
            return {
                usr_uuid: customerDeleted.usr_uuid,
                cus_uuid: customerDeleted.cus_uuid,
                cus_fullname: customerDeleted.cus_fullname,
                cus_email: customerDeleted.cus_email,
                cus_phone: customerDeleted.cus_phone,
                cus_dateofbirth: TimezoneConverter.toIsoStringInTimezone(customerDeleted.cus_dateofbirth, 'America/Buenos_Aires'),
                cus_createdat: TimezoneConverter.toIsoStringInTimezone(customerDeleted.cus_createdat, 'America/Buenos_Aires'),
                cus_updatedat: TimezoneConverter.toIsoStringInTimezone(customerDeleted.cus_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCustomerByName(cus_fullname: string, excludeUuid?: string) {
        try {
            const customer = await this.customerRepository.findCustomerByName(cus_fullname, excludeUuid)
            if(customer) {
                throw new Error(`Ya existe un cliente con el nombre ${cus_fullname}.`);
            }
            return customer
        } catch (error: any) {
            console.error('Error en findCustomerByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}