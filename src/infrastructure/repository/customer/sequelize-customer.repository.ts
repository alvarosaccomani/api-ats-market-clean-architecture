import { CustomerEntity, CustomerUpdateData } from "../../../domain/customer/customer.entity";
import { CustomerRepository } from "../../../domain/customer/customer.repository";
import { SequelizeCustomer } from "../../model/customer/customer.model";
import { Op } from "sequelize";

export class SequelizeRepository implements CustomerRepository {
    async getCustomers(cmp_uuid: string): Promise<CustomerEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const customers = await SequelizeCustomer.findAll(config);
            if(!customers) {
                throw new Error(`No hay clientes`)
            };
            return customers;
        } catch (error: any) {
            console.error('Error en getCustomers:', error.message);
            throw error;
        }
    }
    async findCustomerById(cmp_uuid: string, cus_uuid: string): Promise<CustomerEntity | null> {
        try {
            const customer = await SequelizeCustomer.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    cus_uuid: cus_uuid ?? null
                }
            });
            if(!customer) {
                throw new Error(`No hay cliente con el Id: ${cmp_uuid}, ${cus_uuid}`);
            };
            return customer.dataValues;
        } catch (error: any) {
            console.error('Error en findCustomerById:', error.message);
            throw error;
        }
    }
    async createCustomer(customer: CustomerEntity): Promise<CustomerEntity | null> {
        try {
            let { cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth, pmt_uuid, usr_uuid, cus_createdat, cus_updatedat } = customer
            const result = await SequelizeCustomer.create({ cmp_uuid, cus_uuid, cus_fullname, cus_email, cus_phone, cus_dateofbirth, pmt_uuid, usr_uuid, cus_createdat, cus_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el cliente`);
            }
            let newCustomer = result.dataValues as SequelizeCustomer
            return newCustomer;
        } catch (error: any) {
            console.error('Error en createCustomer:', error.message);
            throw error;
        }
    }
    async updateCustomer(cmp_uuid: string, cus_uuid: string, customer: CustomerUpdateData): Promise<CustomerEntity | null> {
        try {
            const [updatedCount, [updatedCustomer]] = await SequelizeCustomer.update(
                { 
                    cus_fullname: customer.cus_fullname,
                    cus_email: customer.cus_email,
                    cus_phone: customer.cus_phone,
                    cus_dateofbirth: customer.cus_dateofbirth,
                    pmt_uuid: customer.pmt_uuid,
                    usr_uuid: customer.usr_uuid
                },
                { 
                    where: { cmp_uuid, cus_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el cliente`);
            };
            return updatedCustomer.get({ plain: true }) as CustomerEntity;
        } catch (error: any) {
            console.error('Error en updateCustomer:', error.message);
            throw error;
        }
    }
    async deleteCustomer(cmp_uuid: string, cus_uuid: string): Promise<CustomerEntity | null> {
        try {
            const customer = await this.findCustomerById(cmp_uuid, cus_uuid);
            const result = await SequelizeCustomer.destroy({ where: { cmp_uuid, cus_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el cliente`);
            };
            return customer;
        } catch (error: any) {
            console.error('Error en deleteCustomer:', error.message);
            throw error;
        }
    }
    async findCustomerByName(cmp_uuid: string, cus_fullname: string, excludeUuid?: string): Promise<CustomerEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                cus_fullname: cus_fullname ?? null
             };
            if (excludeUuid) {
                whereCondition.cus_uuid = { [Op.ne]: excludeUuid };
            }
            const customer = await SequelizeCustomer.findOne({ 
                where: whereCondition
            });
            return customer;
        } catch (error: any) {
            console.error('Error en findCustomerByName:', error.message);
            throw error;
        }
    }
    
}