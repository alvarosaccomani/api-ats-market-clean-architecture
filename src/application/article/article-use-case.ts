import { ArticleRepository } from "../../domain/article/article.repository";
import { ArticleValue } from "../../domain/article/article.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class ArticleUseCase {
    constructor(
        private readonly articleRepository: ArticleRepository
    ) {
        this.getArticles = this.getArticles.bind(this);
        this.getDetailArticle = this.getDetailArticle.bind(this);
        this.createArticle = this.createArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.findArticleByName = this.findArticleByName.bind(this);
    }

    public async getArticles(cmp_uuid: string, art_uuid: string) {
        try {
            const article = await this.articleRepository.getArticles(cmp_uuid, art_uuid);
            if(!article) {
                throw new Error('No hay articulos.');
            }
            return article.map(article => ({
                cmp_uuid: article.cmp_uuid,
                art_uuid: article.art_uuid,
                art_code: article.art_code,
                art_name: article.art_name,
                art_image: article.art_image,
                art_description: article.art_description,
                art_pricecost: article.art_pricecost,
                art_stock: article.art_stock,
                sup_uuid: article.sup_uuid,
                itm_uuid: article.itm_uuid,
                cat_uuid: article.cat_uuid,
                art_createdat: TimezoneConverter.toIsoStringInTimezone(article.art_createdat, 'America/Buenos_Aires'),
                art_updatedat: TimezoneConverter.toIsoStringInTimezone(article.art_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getArticles (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async getDetailArticle(cmp_uuid: string, art_uuid: string) {
        try {
            const article = await this.articleRepository.findArticleById(cmp_uuid, art_uuid);
            if(!article) {
                throw new Error(`No hay articulo con el Id: ${cmp_uuid}, ${art_uuid}`);
            }
            return {
                cmp_uuid: article.cmp_uuid,
                art_uuid: article.art_uuid,
                art_code: article.art_code,
                art_name: article.art_name,
                art_image: article.art_image,
                art_description: article.art_description,
                art_pricecost: article.art_pricecost,
                art_stock: article.art_stock,
                sup_uuid: article.sup_uuid,
                itm_uuid: article.itm_uuid,
                cat_uuid: article.cat_uuid,
                art_createdat: TimezoneConverter.toIsoStringInTimezone(article.art_createdat, 'America/Buenos_Aires'),
                art_updatedat: TimezoneConverter.toIsoStringInTimezone(article.art_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailArticle (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }
    
    public async createArticle({ cmp_uuid, art_uuid, art_code, art_name, art_image, art_description, art_pricecost, art_stock, sup_uuid, itm_uuid, cat_uuid } : { cmp_uuid: string, art_uuid: string, art_code: string, art_name: string, art_image: string, art_description: string, art_pricecost: number, art_stock: number, sup_uuid: string, itm_uuid: string, cat_uuid: string }) {
        try {
            const articleValue = new ArticleValue({ cmp_uuid, art_uuid, art_code, art_name, art_image, art_description, art_pricecost, art_stock, sup_uuid, itm_uuid, cat_uuid });
            const articleCreated = await this.articleRepository.createArticle(articleValue);
            if(!articleCreated) {
                throw new Error(`No se pudo insertar el articulo.`);
            }
            return {
                cmp_uuid: articleCreated.cmp_uuid,
                art_uuid: articleCreated.art_uuid,
                art_code: articleCreated.art_code,
                art_name: articleCreated.art_name,
                art_image: articleCreated.art_image,
                art_description: articleCreated.art_description,
                art_pricecost: articleCreated.art_pricecost,
                art_stock: articleCreated.art_stock,
                sup_uuid: articleCreated.sup_uuid,
                itm_uuid: articleCreated.itm_uuid,
                cat_uuid: articleCreated.cat_uuid,
                art_createdat: TimezoneConverter.toIsoStringInTimezone(articleCreated.art_createdat, 'America/Buenos_Aires'),
                art_updatedat: TimezoneConverter.toIsoStringInTimezone(articleCreated.art_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createArticle (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async updateArticle(cmp_uuid: string, art_uuid: string, { art_code, art_name, art_image, art_description, art_pricecost, art_stock, sup_uuid, itm_uuid, cat_uuid } : { art_code: string, art_name: string, art_image: string, art_description: string, art_pricecost: number, art_stock: number, sup_uuid: string, itm_uuid: string, cat_uuid: string }) {
        try {
            const articleUpdated = await this.articleRepository.updateArticle(cmp_uuid, art_uuid, { art_code, art_name, art_image, art_description, art_pricecost, art_stock, sup_uuid, itm_uuid, cat_uuid });
            if(!articleUpdated) {
                throw new Error(`No se pudo actualizar el articulo.`);
            }
            return {
                cmp_uuid: articleUpdated.cmp_uuid,
                art_uuid: articleUpdated.art_uuid,
                art_code: articleUpdated.art_code,
                art_name: articleUpdated.art_name,
                art_image: articleUpdated.art_image,
                art_description: articleUpdated.art_description,
                art_pricecost: articleUpdated.art_pricecost,
                art_stock: articleUpdated.art_stock,
                sup_uuid: articleUpdated.sup_uuid,
                itm_uuid: articleUpdated.itm_uuid,
                cat_uuid: articleUpdated.cat_uuid,
                art_createdat: TimezoneConverter.toIsoStringInTimezone(articleUpdated.art_createdat, 'America/Buenos_Aires'),
                art_updatedat: TimezoneConverter.toIsoStringInTimezone(articleUpdated.art_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateArticle (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async deleteArticle(cmp_uuid: string, art_uuid: string) {
        try {
            const articleDeleted = await this.articleRepository.deleteArticle(cmp_uuid, art_uuid);
            if(!articleDeleted) {
                throw new Error(`No se pudo eliminar el articulo.`);
            }
            return {
                cmp_uuid: articleDeleted.cmp_uuid,
                art_uuid: articleDeleted.art_uuid,
                art_code: articleDeleted.art_code,
                art_name: articleDeleted.art_name,
                art_image: articleDeleted.art_image,
                art_description: articleDeleted.art_description,
                art_pricecost: articleDeleted.art_pricecost,
                art_stock: articleDeleted.art_stock,
                sup_uuid: articleDeleted.sup_uuid,
                itm_uuid: articleDeleted.itm_uuid,
                cat_uuid: articleDeleted.cat_uuid,
                art_createdat: TimezoneConverter.toIsoStringInTimezone(articleDeleted.art_createdat, 'America/Buenos_Aires'),
                art_updatedat: TimezoneConverter.toIsoStringInTimezone(articleDeleted.art_updatedat, 'America/Buenos_Aires')
            };;
        } catch (error: any) {
            console.error('Error en deleteArticle (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

    public async findArticleByName(cmp_uuid: string, art_uuid: string, art_name: string, excludeUuid?: string) {
        try {
            const article = await this.articleRepository.findArticleByName(cmp_uuid, art_uuid, art_name, excludeUuid)
            if(article) {
                throw new Error(`Ya existe un articulo con el nombre ${art_name}.`);
            }
            return article
        } catch (error: any) {
            console.error('Error en findArticleByName (use case):', error.message);
            throw error; // Propagar el error hacia el controlador
        }
    }

}