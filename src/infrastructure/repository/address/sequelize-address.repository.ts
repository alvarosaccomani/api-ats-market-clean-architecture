import { AddressEntity, AddressUpdateData } from "../../../domain/address/address.entity";
import { AddressRepository } from "../../../domain/address/address.repository";
import { SequelizeAddress } from "../../model/address/address.model";

export class SequelizeRepository implements AddressRepository {
    async getAddresses(): Promise<AddressEntity[] | null> {
        try {
            const addresses = await SequelizeAddress.findAll();
            if(!addresses) {
                throw new Error(`No hay direcciones`)
            };
            return addresses;
        } catch (error: any) {
            console.error('Error en getAddresses:', error.message);
            throw error;
        }
    }
    async findAddressById(adr_uuid: string): Promise<AddressEntity | null> {
        try {
            const address = await SequelizeAddress.findOne({ 
                where: { 
                    adr_uuid: adr_uuid ?? null
                }
            });
            if(!address) {
                throw new Error(`No hay direccion con el Id: ${adr_uuid}`);
            };
            return address.dataValues;
        } catch (error: any) {
            console.error('Error en findAddressById:', error.message);
            throw error;
        }
    }
    async createAddress(address: AddressEntity): Promise<AddressEntity | null> {
        try {
            let { adr_uuid, cmp_uuid, usr_uuid, cus_uuid, sup_uuid, adr_alias, adr_recipientname, adr_contactphone, adr_reference, adr_country, adr_address, adr_city, adr_province, adr_postalcode, adr_lat, adr_lng, adr_createdat, adr_updatedat } = address
            const result = await SequelizeAddress.create({ adr_uuid, cmp_uuid, usr_uuid, cus_uuid, sup_uuid, adr_alias, adr_recipientname, adr_contactphone, adr_reference, adr_country, adr_address, adr_city, adr_province, adr_postalcode, adr_lat, adr_lng, adr_createdat, adr_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado la direccion`);
            }
            let newAddress = result.dataValues as SequelizeAddress
            return newAddress;
        } catch (error: any) {
            console.error('Error en createAddress:', error.message);
            throw error;
        }
    }
    async updateAddress(adr_uuid: string, address: AddressUpdateData): Promise<AddressEntity | null> {
        try {
            const [updatedCount, [updatedAddress]] = await SequelizeAddress.update(
                { 
                    cmp_uuid: address.cmp_uuid,
                    usr_uuid: address.usr_uuid,
                    cus_uuid: address.cus_uuid,
                    sup_uuid: address.sup_uuid,
                    adr_alias: address.adr_alias,
                    adr_recipientname: address.adr_recipientname,
                    adr_contactphone: address.adr_contactphone,
                    adr_reference: address.adr_reference,
                    adr_country: address.adr_country,
                    adr_address: address.adr_address,
                    adr_city: address.adr_city,
                    adr_province: address.adr_province,
                    adr_postalcode: address.adr_postalcode,
                    adr_lat: address.adr_lat,
                    adr_lng: address.adr_lng
                },
                { 
                    where: { adr_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado la direccion`);
            };
            return updatedAddress.get({ plain: true }) as AddressEntity;
        } catch (error: any) {
            console.error('Error en updateAddress:', error.message);
            throw error;
        }
    }
    async deleteAddress(adr_uuid: string): Promise<AddressEntity | null> {
        try {
            const address = await this.findAddressById(adr_uuid);
            const result = await SequelizeAddress.destroy({ where: { adr_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado la direccion`);
            };
            return address;
        } catch (error: any) {
            console.error('Error en deleteAddress:', error.message);
            throw error;
        }
    }
    async getAddressesByCompany(cmp_uuid: string): Promise<AddressEntity[] | null> {
        try {
            const addresses = await SequelizeAddress.findAll({
                where: { cmp_uuid }
            });
            if (!addresses) {
                throw new Error(`No hay direcciones para la empresa con UUID: ${cmp_uuid}`);
            }
            return addresses.map(address => address.dataValues);
        } catch (error: any) {
            console.error('Error en getAddressesByCompany:', error.message);
            throw error;
        }
    }    
    async getAddressesByUser(usr_uuid: string): Promise<AddressEntity[] | null> {
        try {
            const addresses = await SequelizeAddress.findAll({
                where: { usr_uuid }
            });
            if (!addresses) {
                throw new Error(`No hay direcciones para el usuario con UUID: ${usr_uuid}`);
            }
            return addresses.map(address => address.dataValues);
        } catch (error: any) {
            console.error('Error en getAddressesByUser:', error.message);
            throw error;
        }
    }    
    async getAddressesByCustomer(cus_uuid: string): Promise<AddressEntity[] | null> {
        try {
            const addresses = await SequelizeAddress.findAll({
                where: { cus_uuid }
            });
            if (!addresses) {
                throw new Error(`No hay direcciones para el cliente con UUID: ${cus_uuid}`);
            }
            return addresses.map(address => address.dataValues);
        } catch (error: any) {
            console.error('Error en getAddressesByCustomer:', error.message);
            throw error;
        }
    }    
    async getAddressesBySupplier(sup_uuid: string): Promise<AddressEntity[] | null> {
        try {
            const addresses = await SequelizeAddress.findAll({
                where: { sup_uuid }
            });
            if (!addresses) {
                throw new Error(`No hay direcciones para el proveedor con UUID: ${sup_uuid}`);
            }
            return addresses.map(address => address.dataValues);
        } catch (error: any) {
            console.error('Error en getAddressesBySupplier:', error.message);
            throw error;
        }
    }
    
}