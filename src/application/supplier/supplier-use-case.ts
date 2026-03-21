import { v4 as uuid } from "uuid";
import { SupplierRepository } from "../../domain/supplier/supplier.repository";
import { SupplierValue } from "../../domain/supplier/supplier.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class SupplierUseCase {
    constructor(
        private readonly supplierRepository: SupplierRepository
    ) {
        this.getSuppliers = this.getSuppliers.bind(this);
        this.getDetailSupplier = this.getDetailSupplier.bind(this);
        this.createSupplier = this.createSupplier.bind(this);
        this.updateSupplier = this.updateSupplier.bind(this);
        this.deleteSupplier = this.deleteSupplier.bind(this);
        this.findSupplierByName = this.findSupplierByName.bind(this);
    }

    public async getSuppliers(cmp_uuid: string) {
        try {
            const supplier = await this.supplierRepository.getSuppliers(cmp_uuid);
            if(!supplier) {
                throw new Error('No hay proveedores.');
            }
            return supplier.map(supplier => ({
                cmp_uuid: supplier.cmp_uuid,
                sup_uuid: supplier.sup_uuid,
                sup_fullname: supplier.sup_fullname,
                sup_email: supplier.sup_email,
                sup_phone: supplier.sup_phone,
                pmt_uuid: supplier.pmt_uuid,
                usr_uuid: supplier.usr_uuid,
                sup_createdat: TimezoneConverter.toIsoStringInTimezone(supplier.sup_createdat, 'America/Buenos_Aires'),
                sup_updatedat: TimezoneConverter.toIsoStringInTimezone(supplier.sup_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getSuppliers (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailSupplier(cmp_uuid: string, sup_uuid: string) {
        try {
            const supplier = await this.supplierRepository.findSupplierById(cmp_uuid, sup_uuid);
            if(!supplier) {
                throw new Error(`No hay proveedor con el Id: ${cmp_uuid}, ${sup_uuid}`);
            }
            return {
                cmp_uuid: supplier.cmp_uuid,
                sup_uuid: supplier.sup_uuid,
                sup_fullname: supplier.sup_fullname,
                sup_email: supplier.sup_email,
                sup_phone: supplier.sup_phone,
                pmt_uuid: supplier.pmt_uuid,
                usr_uuid: supplier.usr_uuid,
                sup_createdat: TimezoneConverter.toIsoStringInTimezone(supplier.sup_createdat, 'America/Buenos_Aires'),
                sup_updatedat: TimezoneConverter.toIsoStringInTimezone(supplier.sup_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createSupplier({ cmp_uuid, sup_uuid, sup_fullname, sup_email, sup_phone, pmt_uuid, usr_uuid } : { cmp_uuid: string, sup_uuid: string, sup_fullname: string, sup_email: string, sup_phone: string, pmt_uuid: string, usr_uuid: string }) {
        try {
            const supplierValue = new SupplierValue({ cmp_uuid, sup_uuid, sup_fullname, sup_email, sup_phone, pmt_uuid, usr_uuid });
            const supplierCreated = await this.supplierRepository.createSupplier(supplierValue);
            if(!supplierCreated) {
                throw new Error(`No se pudo insertar el proveedor.`);
            }
            return {
                cmp_uuid: supplierCreated.cmp_uuid,
                sup_uuid: supplierCreated.sup_uuid,
                sup_fullname: supplierCreated.sup_fullname,
                sup_email: supplierCreated.sup_email,
                sup_phone: supplierCreated.sup_phone,
                pmt_uuid: supplierCreated.pmt_uuid,
                usr_uuid: supplierCreated.usr_uuid,
                sup_createdat: TimezoneConverter.toIsoStringInTimezone(supplierCreated.sup_createdat, 'America/Buenos_Aires'),
                sup_updatedat: TimezoneConverter.toIsoStringInTimezone(supplierCreated.sup_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateSupplier(cmp_uuid: string, sup_uuid: string, { sup_fullname, sup_email, sup_phone, pmt_uuid, usr_uuid } : { sup_fullname: string, sup_email: string, sup_phone: string, pmt_uuid: string, usr_uuid: string }) {
        try {
            const supplierUpdated = await this.supplierRepository.updateSupplier(cmp_uuid, sup_uuid, { sup_fullname, sup_email, sup_phone, pmt_uuid, usr_uuid });
            if(!supplierUpdated) {
                throw new Error(`No se pudo actualizar el proveedor.`);
            }
            return {
                cmp_uuid: supplierUpdated.cmp_uuid,
                sup_uuid: supplierUpdated.sup_uuid,
                sup_fullname: supplierUpdated.sup_fullname,
                sup_email: supplierUpdated.sup_email,
                sup_phone: supplierUpdated.sup_phone,
                pmt_uuid: supplierUpdated.pmt_uuid,
                usr_uuid: supplierUpdated.usr_uuid,
                sup_createdat: TimezoneConverter.toIsoStringInTimezone(supplierUpdated.sup_createdat, 'America/Buenos_Aires'),
                sup_updatedat: TimezoneConverter.toIsoStringInTimezone(supplierUpdated.sup_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteSupplier(cmp_uuid: string, sup_uuid: string) {
        try {
            const supplierDeleted = await this.supplierRepository.deleteSupplier(cmp_uuid, sup_uuid);
            if(!supplierDeleted) {
                throw new Error(`No se pudo eliminar el proveedor.`);
            }
            return {
                cmp_uuid: supplierDeleted.cmp_uuid,
                sup_uuid: supplierDeleted.sup_uuid,
                sup_fullname: supplierDeleted.sup_fullname,
                sup_email: supplierDeleted.sup_email,
                sup_phone: supplierDeleted.sup_phone,
                pmt_uuid: supplierDeleted.pmt_uuid,
                usr_uuid: supplierDeleted.usr_uuid,
                sup_createdat: TimezoneConverter.toIsoStringInTimezone(supplierDeleted.sup_createdat, 'America/Buenos_Aires'),
                sup_updatedat: TimezoneConverter.toIsoStringInTimezone(supplierDeleted.sup_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteSupplier (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findSupplierByName(cmp_uuid: string, sup_fullname: string, excludeUuid?: string) {
        try {
            const supplier = await this.supplierRepository.findSupplierByName(cmp_uuid, sup_fullname, excludeUuid)
            if(supplier) {
                throw new Error(`Ya existe un proveedor con el nombre ${sup_fullname}.`);
            }
            return supplier
        } catch (error: any) {
            console.error('Error en findPaymentMethodByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}