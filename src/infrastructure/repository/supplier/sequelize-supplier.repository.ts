import { SupplierEntity, SupplierUpdateData } from "../../../domain/supplier/supplier.entity";
import { SupplierRepository } from "../../../domain/supplier/supplier.repository";
import { SequelizeSupplier } from "../../model/supplier/supplier.model";
import { Op } from "sequelize";

export class SequelizeRepository implements SupplierRepository {
    async getSuppliers(cmp_uuid: string): Promise<SupplierEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const suppliers = await SequelizeSupplier.findAll(config);
            if(!suppliers) {
                throw new Error(`No hay proveedores`)
            };
            return suppliers;
        } catch (error: any) {
            console.error('Error en getSuppliers:', error.message);
            throw error;
        }
    }
    async findSupplierById(cmp_uuid: string, sup_uuid: string): Promise<SupplierEntity | null> {
        try {
            const supplier = await SequelizeSupplier.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    sup_uuid: sup_uuid ?? null
                }
            });
            if(!supplier) {
                throw new Error(`No hay proveedor con el Id: ${cmp_uuid}, ${sup_uuid}`);
            };
            return supplier.dataValues;
        } catch (error: any) {
            console.error('Error en findSupplierById:', error.message);
            throw error;
        }
    }
    async createSupplier(supplier: SupplierEntity): Promise<SupplierEntity | null> {
        try {
            let { cmp_uuid, sup_uuid, sup_fullname, sup_email, sup_phone, pmt_uuid, usr_uuid, sup_createdat, sup_updatedat } = supplier
            const result = await SequelizeSupplier.create({ cmp_uuid, sup_uuid, sup_fullname, sup_email, sup_phone, pmt_uuid, usr_uuid, sup_createdat, sup_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el proveedor`);
            }
            let newSupplier = result.dataValues as SequelizeSupplier
            return newSupplier;
        } catch (error: any) {
            console.error('Error en createSupplier:', error.message);
            throw error;
        }
    }
    async updateSupplier(cmp_uuid: string, sup_uuid: string, supplier: SupplierUpdateData): Promise<SupplierEntity | null> {
        try {
            const [updatedCount, [updatedSupplier]] = await SequelizeSupplier.update(
                { 
                    sup_fullname: supplier.sup_fullname,
                    sup_email: supplier.sup_email,
                    sup_phone: supplier.sup_phone,
                    pmt_uuid: supplier.pmt_uuid,
                    usr_uuid: supplier.usr_uuid
                },
                { 
                    where: { cmp_uuid, sup_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el proveedor`);
            };
            return updatedSupplier.get({ plain: true }) as SupplierEntity;
        } catch (error: any) {
            console.error('Error en updateSupplier:', error.message);
            throw error;
        }
    }
    async deleteSupplier(cmp_uuid: string, sup_uuid: string): Promise<SupplierEntity | null> {
        try {
            const supplier = await this.findSupplierById(cmp_uuid, sup_uuid);
            const result = await SequelizeSupplier.destroy({ where: { cmp_uuid, sup_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el proveedor`);
            };
            return supplier;
        } catch (error: any) {
            console.error('Error en deleteItem:', error.message);
            throw error;
        }
    }
    async findSupplierByName(cmp_uuid: string, sup_fullname: string, excludeUuid?: string): Promise<SupplierEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                sup_fullname: sup_fullname ?? null
             };
            if (excludeUuid) {
                whereCondition.sup_uuid = { [Op.ne]: excludeUuid };
            }
            const supplier = await SequelizeSupplier.findOne({ 
                where: whereCondition
            });
            return supplier;
        } catch (error: any) {
            console.error('Error en findSupplierByName:', error.message);
            throw error;
        }
    }
    
}