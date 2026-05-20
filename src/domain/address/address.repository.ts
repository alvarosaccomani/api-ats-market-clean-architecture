import { AddressEntity, AddressUpdateData } from "./address.entity";

export interface AddressRepository {
    getAddresses(): Promise<AddressEntity[] | null>;
    findAddressById(adr_uuid: string): Promise<AddressEntity | null>;
    createAddress(address: AddressEntity): Promise<AddressEntity | null>;
    updateAddress(adr_uuid: string, address: AddressUpdateData): Promise<AddressEntity | null>;
    deleteAddress(adr_uuid: string): Promise<AddressEntity | null>;
    getAddressesByCompany(cmp_uuid: string): Promise<AddressEntity[] | null>;
    getAddressesByUser(usr_uuid: string): Promise<AddressEntity[] | null>;
    getAddressesByCustomer(cus_uuid: string): Promise<AddressEntity[] | null>;
    getAddressesBySupplier(sup_uuid: string): Promise<AddressEntity[] | null>;
}