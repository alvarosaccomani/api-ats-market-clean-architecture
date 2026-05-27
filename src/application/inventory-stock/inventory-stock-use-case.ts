import { InventoryStockRepository } from "../../domain/inventory-stock/inventory-stock.repository";
import { InventoryStockValue } from "../../domain/inventory-stock/inventory-stock.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class InventoryStockUseCase {
    constructor(
        private readonly inventoryStockRepository: InventoryStockRepository
    ) {
        this.getInventoryStocks = this.getInventoryStocks.bind(this);
        this.findInventoryStockById = this.findInventoryStockById.bind(this);
        this.createInventoryStock = this.createInventoryStock.bind(this);
        this.createInventoryStocksBatch = this.createInventoryStocksBatch.bind(this);
        this.updateInventoryStock = this.updateInventoryStock.bind(this);
        this.deleteInventoryStock = this.deleteInventoryStock.bind(this);
    }

    public async getInventoryStocks(cmp_uuid: string, pro_uuid?: string, prov_uuid?: string, war_uuid?: string, warl_uuid?: string) {
        try {
            const stocks = await this.inventoryStockRepository.getInventoryStocks(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid);
            if (!stocks) {
                return [];
            }
            return stocks.map(stock => ({
                cmp_uuid: stock.cmp_uuid,
                pro_uuid: stock.pro_uuid,
                prov_uuid: stock.prov_uuid,
                war_uuid: stock.war_uuid,
                warl_uuid: stock.warl_uuid,
                ist_quanty: stock.ist_quanty,
                ist_quantyreserved: stock.ist_quantyreserved,
                ist_createdat: stock.ist_createdat ? TimezoneConverter.toIsoStringInTimezone(stock.ist_createdat, 'America/Buenos_Aires') : undefined,
                ist_updatedat: stock.ist_updatedat ? TimezoneConverter.toIsoStringInTimezone(stock.ist_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en getInventoryStocks (use case):', error.message);
            throw error;
        }
    }

    public async findInventoryStockById(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string) {
        try {
            const stock = await this.inventoryStockRepository.findInventoryStockById(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid);
            if (!stock) {
                throw new Error(`No se encontró el stock de inventario.`);
            }
            return {
                cmp_uuid: stock.cmp_uuid,
                pro_uuid: stock.pro_uuid,
                prov_uuid: stock.prov_uuid,
                war_uuid: stock.war_uuid,
                warl_uuid: stock.warl_uuid,
                ist_quanty: stock.ist_quanty,
                ist_quantyreserved: stock.ist_quantyreserved,
                ist_createdat: stock.ist_createdat ? TimezoneConverter.toIsoStringInTimezone(stock.ist_createdat, 'America/Buenos_Aires') : undefined,
                ist_updatedat: stock.ist_updatedat ? TimezoneConverter.toIsoStringInTimezone(stock.ist_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en findInventoryStockById (use case):', error.message);
            throw error;
        }
    }

    public async createInventoryStock(data: { cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string, ist_quanty: number, ist_quantyreserved: number }) {
        try {
            const stockValue = new InventoryStockValue(data);
            const stockCreated = await this.inventoryStockRepository.createInventoryStock(stockValue);
            if (!stockCreated) {
                throw new Error(`No se pudo crear el stock de inventario.`);
            }

            return {
                cmp_uuid: stockCreated.cmp_uuid,
                pro_uuid: stockCreated.pro_uuid,
                prov_uuid: stockCreated.prov_uuid,
                war_uuid: stockCreated.war_uuid,
                warl_uuid: stockCreated.warl_uuid,
                ist_quanty: stockCreated.ist_quanty,
                ist_quantyreserved: stockCreated.ist_quantyreserved,
                ist_createdat: stockCreated.ist_createdat ? TimezoneConverter.toIsoStringInTimezone(stockCreated.ist_createdat, 'America/Buenos_Aires') : undefined,
                ist_updatedat: stockCreated.ist_updatedat ? TimezoneConverter.toIsoStringInTimezone(stockCreated.ist_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en createInventoryStock (use case):', error.message);
            throw error;
        }
    }

    public async createInventoryStocksBatch(data: { cmp_uuid: string, war_uuid?: string, warl_uuid?: string, locations: any[] }) {
        try {
            const { cmp_uuid, war_uuid, warl_uuid, locations } = data;
            if (!Array.isArray(locations)) {
                throw new Error("locations debe ser un arreglo.");
            }

            const stockValues = locations.map(item => {
                return new InventoryStockValue({
                    cmp_uuid: item.cmp_uuid || cmp_uuid,
                    pro_uuid: item.pro_uuid || "",
                    prov_uuid: item.prov_uuid || "",
                    war_uuid: item.war_uuid || war_uuid || "",
                    warl_uuid: item.warl_uuid || warl_uuid || "",
                    ist_quanty: item.ist_quanty !== undefined ? item.ist_quanty : 0,
                    ist_quantyreserved: item.ist_quantyreserved !== undefined ? item.ist_quantyreserved : 0,
                    ist_createdat: item.ist_createdat ? new Date(item.ist_createdat) : undefined,
                    ist_updatedat: item.ist_updatedat ? new Date(item.ist_updatedat) : undefined
                });
            });

            const results = await this.inventoryStockRepository.createInventoryStocksBatch(stockValues);
            if (!results) {
                return [];
            }

            return results.map(stockCreated => ({
                cmp_uuid: stockCreated.cmp_uuid,
                pro_uuid: stockCreated.pro_uuid,
                prov_uuid: stockCreated.prov_uuid,
                war_uuid: stockCreated.war_uuid,
                warl_uuid: stockCreated.warl_uuid,
                ist_quanty: stockCreated.ist_quanty,
                ist_quantyreserved: stockCreated.ist_quantyreserved,
                ist_createdat: stockCreated.ist_createdat ? TimezoneConverter.toIsoStringInTimezone(stockCreated.ist_createdat, 'America/Buenos_Aires') : undefined,
                ist_updatedat: stockCreated.ist_updatedat ? TimezoneConverter.toIsoStringInTimezone(stockCreated.ist_updatedat, 'America/Buenos_Aires') : undefined
            }));
        } catch (error: any) {
            console.error('Error en createInventoryStocksBatch (use case):', error.message);
            throw error;
        }
    }

    public async updateInventoryStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string, data: { ist_quanty: number, ist_quantyreserved: number }) {
        try {
            const stockUpdated = await this.inventoryStockRepository.updateInventoryStock(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid, data);
            if (!stockUpdated) {
                throw new Error(`No se pudo actualizar el stock de inventario.`);
            }

            return {
                cmp_uuid: stockUpdated.cmp_uuid,
                pro_uuid: stockUpdated.pro_uuid,
                prov_uuid: stockUpdated.prov_uuid,
                war_uuid: stockUpdated.war_uuid,
                warl_uuid: stockUpdated.warl_uuid,
                ist_quanty: stockUpdated.ist_quanty,
                ist_quantyreserved: stockUpdated.ist_quantyreserved,
                ist_createdat: stockUpdated.ist_createdat ? TimezoneConverter.toIsoStringInTimezone(stockUpdated.ist_createdat, 'America/Buenos_Aires') : undefined,
                ist_updatedat: stockUpdated.ist_updatedat ? TimezoneConverter.toIsoStringInTimezone(stockUpdated.ist_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en updateInventoryStock (use case):', error.message);
            throw error;
        }
    }

    public async deleteInventoryStock(cmp_uuid: string, pro_uuid: string, prov_uuid: string, war_uuid: string, warl_uuid: string) {
        try {
            const stockDeleted = await this.inventoryStockRepository.deleteInventoryStock(cmp_uuid, pro_uuid, prov_uuid, war_uuid, warl_uuid);
            if (!stockDeleted) {
                throw new Error(`No se pudo eliminar el stock de inventario.`);
            }

            return {
                cmp_uuid: stockDeleted.cmp_uuid,
                pro_uuid: stockDeleted.pro_uuid,
                prov_uuid: stockDeleted.prov_uuid,
                war_uuid: stockDeleted.war_uuid,
                warl_uuid: stockDeleted.warl_uuid,
                ist_quanty: stockDeleted.ist_quanty,
                ist_quantyreserved: stockDeleted.ist_quantyreserved,
                ist_createdat: stockDeleted.ist_createdat ? TimezoneConverter.toIsoStringInTimezone(stockDeleted.ist_createdat, 'America/Buenos_Aires') : undefined,
                ist_updatedat: stockDeleted.ist_updatedat ? TimezoneConverter.toIsoStringInTimezone(stockDeleted.ist_updatedat, 'America/Buenos_Aires') : undefined
            };
        } catch (error: any) {
            console.error('Error en deleteInventoryStock (use case):', error.message);
            throw error;
        }
    }
}
