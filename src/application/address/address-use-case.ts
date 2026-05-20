import { v4 as uuid } from "uuid";
import { AddressRepository } from "../../domain/address/address.repository";
import { AddressValue } from "../../domain/address/address.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class AddressUseCase {
    constructor(
        private readonly addressRepository: AddressRepository
    ) {
        this.getAddresses = this.getAddresses.bind(this);
        this.getDetailAddress = this.getDetailAddress.bind(this);
        this.createAddress = this.createAddress.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.deleteAddress = this.deleteAddress.bind(this);
        this.getAddressesByCompany = this.getAddressesByCompany.bind(this);
        this.getAddressesByUser = this.getAddressesByUser.bind(this);
        this.getAddressesByCustomer = this.getAddressesByCustomer.bind(this);
        this.getAddressesBySupplier = this.getAddressesBySupplier.bind(this);
    }

    public async getAddresses() {
        try {
            const address = await this.addressRepository.getAddresses();
            if(!address) {
                throw new Error('No hay direcciones.');
            }
            return address.map(address => ({
                adr_uuid: address.adr_uuid,
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
                adr_lng: address.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(address.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(address.adr_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getAddresses (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailAddress(adr_uuid: string) {
        try {
            const address = await this.addressRepository.findAddressById(adr_uuid);
            if(!address) {
                throw new Error(`No hay direccion con el Id: ${adr_uuid}`);
            }
            return {
                adr_uuid: address.adr_uuid,
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
                adr_lng: address.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(address.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(address.adr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createAddress({ adr_uuid, cmp_uuid, usr_uuid, cus_uuid, sup_uuid, adr_alias, adr_recipientname, adr_contactphone, adr_reference, adr_country, adr_address, adr_city, adr_province, adr_postalcode, adr_lat, adr_lng } : { adr_uuid: string, cmp_uuid: string, usr_uuid: string, cus_uuid: string, sup_uuid: string, adr_alias: string, adr_recipientname: string, adr_contactphone: string, adr_reference: string, adr_country: string, adr_address: string, adr_city: string, adr_province: string, adr_postalcode: string, adr_lat: number, adr_lng: number }) {
        try {
            const addressValue = new AddressValue({ adr_uuid, cmp_uuid, usr_uuid, cus_uuid, sup_uuid, adr_alias, adr_recipientname, adr_contactphone, adr_reference, adr_country, adr_address, adr_city, adr_province, adr_postalcode, adr_lat, adr_lng });
            const addressCreated = await this.addressRepository.createAddress(addressValue);
            if(!addressCreated) {
                throw new Error(`No se pudo insertar la direccion.`);
            }
            return {
                adr_uuid: addressCreated.adr_uuid,
                cmp_uuid: addressCreated.cmp_uuid,
                usr_uuid: addressCreated.usr_uuid,
                cus_uuid: addressCreated.cus_uuid,
                sup_uuid: addressCreated.sup_uuid,
                adr_alias: addressCreated.adr_alias,
                adr_recipientname: addressCreated.adr_recipientname,
                adr_contactphone: addressCreated.adr_contactphone,
                adr_reference: addressCreated.adr_reference,
                adr_country: addressCreated.adr_country,
                adr_address: addressCreated.adr_address,
                adr_city: addressCreated.adr_city,
                adr_province: addressCreated.adr_province,
                adr_postalcode: addressCreated.adr_postalcode,
                adr_lat: addressCreated.adr_lat,
                adr_lng: addressCreated.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(addressCreated.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(addressCreated.adr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateAddress(adr_uuid: string, { cmp_uuid, usr_uuid, cus_uuid, sup_uuid, adr_alias, adr_recipientname, adr_contactphone, adr_reference, adr_country, adr_address, adr_city, adr_province, adr_postalcode, adr_lat, adr_lng } : { cmp_uuid: string, usr_uuid: string, cus_uuid: string, sup_uuid: string, adr_alias: string, adr_recipientname: string, adr_contactphone: string, adr_reference: string, adr_country: string, adr_address: string, adr_city: string, adr_province: string, adr_postalcode: string, adr_lat: number, adr_lng: number }) {
        try {
            const addressUpdated = await this.addressRepository.updateAddress(adr_uuid, { cmp_uuid, usr_uuid, cus_uuid, sup_uuid, adr_alias, adr_recipientname, adr_contactphone, adr_reference, adr_country, adr_address, adr_city, adr_province, adr_postalcode, adr_lat, adr_lng });
            if(!addressUpdated) {
                throw new Error(`No se pudo actualizar la direccion.`);
            }
            return {
                adr_uuid: addressUpdated.adr_uuid,
                cmp_uuid: addressUpdated.cmp_uuid,
                usr_uuid: addressUpdated.usr_uuid,
                cus_uuid: addressUpdated.cus_uuid,
                sup_uuid: addressUpdated.sup_uuid,
                adr_alias: addressUpdated.adr_alias,
                adr_recipientname: addressUpdated.adr_recipientname,
                adr_contactphone: addressUpdated.adr_contactphone,
                adr_reference: addressUpdated.adr_reference,
                adr_country: addressUpdated.adr_country,
                adr_address: addressUpdated.adr_address,
                adr_city: addressUpdated.adr_city,
                adr_province: addressUpdated.adr_province,
                adr_postalcode: addressUpdated.adr_postalcode,
                adr_lat: addressUpdated.adr_lat,
                adr_lng: addressUpdated.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(addressUpdated.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(addressUpdated.adr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCategory (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteAddress(adr_uuid: string) {
        try {
            const addressDeleted = await this.addressRepository.deleteAddress(adr_uuid);
            if(!addressDeleted) {
                throw new Error(`No se pudo eliminar la direccion.`);
            }
            return {
                adr_uuid: addressDeleted.adr_uuid,
                cmp_uuid: addressDeleted.cmp_uuid,
                usr_uuid: addressDeleted.usr_uuid,
                cus_uuid: addressDeleted.cus_uuid,
                sup_uuid: addressDeleted.sup_uuid,
                adr_alias: addressDeleted.adr_alias,
                adr_recipientname: addressDeleted.adr_recipientname,
                adr_contactphone: addressDeleted.adr_contactphone,
                adr_reference: addressDeleted.adr_reference,
                adr_country: addressDeleted.adr_country,
                adr_address: addressDeleted.adr_address,
                adr_city: addressDeleted.adr_city,
                adr_province: addressDeleted.adr_province,
                adr_postalcode: addressDeleted.adr_postalcode,
                adr_lat: addressDeleted.adr_lat,
                adr_lng: addressDeleted.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(addressDeleted.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(addressDeleted.adr_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteAddress (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getAddressesByCompany(cmp_uuid: string) {
        try {
            const addresses = await this.addressRepository.getAddressesByCompany(cmp_uuid);
            if(!addresses) {
                throw new Error(`No se pudo obtener las direcciones.`);
            }
            return addresses.map(address => ({
                adr_uuid: address.adr_uuid,
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
                adr_lng: address.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(address.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(address.adr_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getAddressesByCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getAddressesByUser(usr_uuid: string) {
        try {
            const addresses = await this.addressRepository.getAddressesByUser(usr_uuid);
            if(!addresses) {
                throw new Error(`No se pudo obtener las direcciones.`);
            }
            return addresses.map(address => ({
                adr_uuid: address.adr_uuid,
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
                adr_lng: address.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(address.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(address.adr_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getAddressesByUser (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getAddressesByCustomer(cus_uuid: string) {
        try {
            const addresses = await this.addressRepository.getAddressesByCustomer(cus_uuid);
            if(!addresses) {
                throw new Error(`No se pudo obtener las direcciones.`);
            }
            return addresses.map(address => ({
                adr_uuid: address.adr_uuid,
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
                adr_lng: address.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(address.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(address.adr_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getAddressesByCustomer (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getAddressesBySupplier(sup_uuid: string) {
        try {
            const addresses = await this.addressRepository.getAddressesBySupplier(sup_uuid);
            if(!addresses) {
                throw new Error(`No se pudo obtener las direcciones.`);
            }
            return addresses.map(address => ({
                adr_uuid: address.adr_uuid,
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
                adr_lng: address.adr_lng,
                adr_createdat: TimezoneConverter.toIsoStringInTimezone(address.adr_createdat, 'America/Buenos_Aires'),
                adr_updatedat: TimezoneConverter.toIsoStringInTimezone(address.adr_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getAddressesBySupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}