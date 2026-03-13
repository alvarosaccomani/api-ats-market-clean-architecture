import { CompanyRepository } from "../../domain/company/company.repository";
import { CompanyValue } from "../../domain/company/company.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class CompanyUseCase {
    constructor(
        private readonly companyRepository: CompanyRepository
    ) {
        this.getCompanies = this.getCompanies.bind(this);
        this.getDetailCompany = this.getDetailCompany.bind(this);
        this.createCompany = this.createCompany.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.findCompanyByName = this.findCompanyByName.bind(this);
        this.findCompanyBySlug = this.findCompanyBySlug.bind(this);
        this.getFeaturedCompanies = this.getFeaturedCompanies.bind(this);
    }

    public async getCompanies() {
        try {
            const company = await this.companyRepository.getCompanies();
            if(!company) {
                throw new Error('No hay empresas.');
            }
            return company.map(company => ({
                cmp_uuid: company.cmp_uuid,
                cmp_name: company.cmp_name,
                cmp_address: company.cmp_address,    
                cmp_phone: company.cmp_phone,
                cmp_email: company.cmp_email,
                cmp_slug: company.cmp_slug,
                cmp_logo: company.cmp_logo,
                cmp_banner: company.cmp_banner,
                cmp_description: company.cmp_description,
                cmp_isfeatured: company.cmp_isfeatured,
                cmp_status: company.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(company.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(company.cmp_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getCompanies (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailCompany(cmp_uuid: string) {
        try {
            const company = await this.companyRepository.findCompanyById(cmp_uuid);
            if(!company) {
                throw new Error(`No hay empresa con el Id: ${cmp_uuid}`);
            }
            return {
                cmp_uuid: company.cmp_uuid,
                cmp_name: company.cmp_name,
                cmp_address: company.cmp_address,    
                cmp_phone: company.cmp_phone,
                cmp_email: company.cmp_email,
                cmp_slug: company.cmp_slug,
                cmp_logo: company.cmp_logo,
                cmp_banner: company.cmp_banner,
                cmp_description: company.cmp_description,
                cmp_isfeatured: company.cmp_isfeatured,
                cmp_status: company.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(company.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(company.cmp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createCompany({ cmp_uuid, cmp_name, cmp_address, cmp_phone, cmp_email, cmp_slug, cmp_logo, cmp_banner, cmp_description, cmp_isfeatured, cmp_status } : { cmp_uuid: string, cmp_name: string, cmp_address: string, cmp_phone: string, cmp_email: string, cmp_slug: string, cmp_logo: string, cmp_banner: string, cmp_description: string, cmp_isfeatured: boolean, cmp_status: string }) {
        try {
            const companyValue = new CompanyValue({ cmp_uuid, cmp_name, cmp_address, cmp_phone, cmp_email, cmp_slug, cmp_logo, cmp_banner, cmp_description, cmp_isfeatured, cmp_status });
            const companyCreated = await this.companyRepository.createCompany(companyValue);
            if(!companyCreated) {
                throw new Error(`No se pudo insertar la empresa.`);
            }
            return {
                cmp_uuid: companyCreated.cmp_uuid,
                cmp_name: companyCreated.cmp_name,
                cmp_address: companyCreated.cmp_address,    
                cmp_phone: companyCreated.cmp_phone,
                cmp_email: companyCreated.cmp_email,
                cmp_slug: companyCreated.cmp_slug,
                cmp_logo: companyCreated.cmp_logo,
                cmp_banner: companyCreated.cmp_banner,
                cmp_description: companyCreated.cmp_description,
                cmp_isfeatured: companyCreated.cmp_isfeatured,
                cmp_status: companyCreated.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(companyCreated.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(companyCreated.cmp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateCompany(cmp_uuid: string, { cmp_name, cmp_address, cmp_phone, cmp_email, cmp_slug, cmp_logo, cmp_banner, cmp_description, cmp_isfeatured, cmp_status } : { cmp_name: string, cmp_address: string, cmp_phone: string, cmp_email: string, cmp_slug: string, cmp_logo: string, cmp_banner: string, cmp_description: string, cmp_isfeatured: boolean, cmp_status: string }) {
        try {
            const companyUpdated = await this.companyRepository.updateCompany(cmp_uuid, { cmp_name, cmp_address, cmp_phone, cmp_email, cmp_slug, cmp_logo, cmp_banner, cmp_description, cmp_isfeatured, cmp_status });
            if(!companyUpdated) {
                throw new Error(`No se pudo actualizar el articulo.`);
            }
            return {
                cmp_uuid: companyUpdated.cmp_uuid,
                cmp_name: companyUpdated.cmp_name,
                cmp_address: companyUpdated.cmp_address,    
                cmp_phone: companyUpdated.cmp_phone,
                cmp_email: companyUpdated.cmp_email,
                cmp_slug: companyUpdated.cmp_slug,
                cmp_logo: companyUpdated.cmp_logo,
                cmp_banner: companyUpdated.cmp_banner,
                cmp_description: companyUpdated.cmp_description,
                cmp_isfeatured: companyUpdated.cmp_isfeatured,
                cmp_status: companyUpdated.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(companyUpdated.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(companyUpdated.cmp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteCompany(cmp_uuid: string) {
        try {
            const companyDeleted = await this.companyRepository.deleteCompany(cmp_uuid);
            if(!companyDeleted) {
                throw new Error(`No se pudo eliminar la empresa.`);
            }
            return {
                cmp_uuid: companyDeleted.cmp_uuid,
                cmp_name: companyDeleted.cmp_name,
                cmp_address: companyDeleted.cmp_address,    
                cmp_phone: companyDeleted.cmp_phone,
                cmp_email: companyDeleted.cmp_email,
                cmp_slug: companyDeleted.cmp_slug,
                cmp_logo: companyDeleted.cmp_logo,
                cmp_banner: companyDeleted.cmp_banner,
                cmp_description: companyDeleted.cmp_description,
                cmp_isfeatured: companyDeleted.cmp_isfeatured,
                cmp_status: companyDeleted.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(companyDeleted.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(companyDeleted.cmp_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCompanyByName(cmp_name: string, excludeUuid?: string) {
        try {
            const company = await this.companyRepository.findCompanyByName(cmp_name, excludeUuid)
            if(company) {
                throw new Error(`Ya existe una empresa con el nombre ${cmp_name}.`);
            }
            return company
        } catch (error: any) {
            console.error('Error en findCompanyByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findCompanyBySlug(cmp_slug: string, excludeUuid?: string) {
        try {
            const company = await this.companyRepository.findCompanyBySlug(cmp_slug, excludeUuid)
            if(company) {
                throw new Error(`Ya existe una empresa con el slug ${cmp_slug}.`);
            }
            return company
        } catch (error: any) {
            console.error('Error en findCompanyBySlug (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getCompanyBySlug(cmp_slug: string) {
        try {
            const company = await this.companyRepository.getCompanyBySlug(cmp_slug);
            if(!company) {
                throw new Error(`No hay empresa con el slug: ${cmp_slug}`);
            }
            return {
                cmp_uuid: company.cmp_uuid,
                cmp_name: company.cmp_name,
                cmp_address: company.cmp_address,    
                cmp_phone: company.cmp_phone,
                cmp_email: company.cmp_email,
                cmp_slug: company.cmp_slug,
                cmp_logo: company.cmp_logo,
                cmp_banner: company.cmp_banner,
                cmp_description: company.cmp_description,
                cmp_isfeatured: company.cmp_isfeatured,
                cmp_status: company.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(company.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(company.cmp_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailCompany (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getFeaturedCompanies() {
        try {
            const company = await this.companyRepository.getFeaturedCompanies();
            if(!company) {
                throw new Error('No hay empresas.');
            }
            return company.map(company => ({
                cmp_uuid: company.cmp_uuid,
                cmp_name: company.cmp_name,
                cmp_address: company.cmp_address,    
                cmp_phone: company.cmp_phone,
                cmp_email: company.cmp_email,
                cmp_slug: company.cmp_slug,
                cmp_logo: company.cmp_logo,
                cmp_banner: company.cmp_banner,
                cmp_description: company.cmp_description,
                cmp_isfeatured: company.cmp_isfeatured,
                cmp_status: company.cmp_status,
                cmp_createdat: TimezoneConverter.toIsoStringInTimezone(company.cmp_createdat, 'America/Buenos_Aires'),
                cmp_updatedat: TimezoneConverter.toIsoStringInTimezone(company.cmp_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getFeaturedCompanies (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}