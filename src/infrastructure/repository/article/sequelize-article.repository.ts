import { ArticleEntity, ArticleUpdateData } from "../../../domain/article/article.entity";
import { ArticleRepository } from "../../../domain/article/article.repository";
import { SequelizeArticle } from "../../model/article/article.model";
import { Op } from "sequelize";

export class SequelizeRepository implements ArticleRepository {
    async getArticles(cmp_uuid: string): Promise<ArticleEntity[] | null> {
        try {
            let config = {
                where: {
                    cmp_uuid: cmp_uuid ?? null
                }
            }
            const articles = await SequelizeArticle.findAll(config);
            if(!articles) {
                throw new Error(`No hay articulos`)
            };
            return articles;
        } catch (error: any) {
            console.error('Error en getArticles:', error.message);
            throw error;
        }
    }
    async findArticleById(cmp_uuid: string, art_uuid: string): Promise<ArticleEntity | null> {
        try {
            const article = await SequelizeArticle.findOne({ 
                where: { 
                    cmp_uuid: cmp_uuid ?? null,
                    art_uuid: art_uuid ?? null
                } 
            });
            if(!article) {
                throw new Error(`No hay article con el Id: ${cmp_uuid}, ${art_uuid}`);
            };
            return article.dataValues;
        } catch (error: any) {
            console.error('Error en findArticleById:', error.message);
            throw error;
        }
    }
    async createArticle(article: ArticleEntity): Promise<ArticleEntity | null> {
        try {
            let { cmp_uuid, art_uuid, art_code, art_name, art_image, art_description, art_pricecost, art_stock, sup_uuid, itm_uuid, cat_uuid, art_createdat, art_updatedat } = article
            const result = await SequelizeArticle.create({ cmp_uuid, art_uuid, art_code, art_name, art_image, art_description, art_pricecost, art_stock, sup_uuid, itm_uuid, cat_uuid, art_createdat, art_updatedat });
            if(!result) {
                throw new Error(`No se ha agregado el article`);
            }
            let newArticle = result.dataValues as SequelizeArticle
            return newArticle;
        } catch (error: any) {
            console.error('Error en createArticle:', error.message);
            throw error;
        }
    }
    async updateArticle(cmp_uuid: string, art_uuid: string, article: ArticleUpdateData): Promise<ArticleEntity | null> {
        try {
            const [updatedCount, [updatedArticle]] = await SequelizeArticle.update(
                { 
                    art_code: article.art_code, 
                    art_name: article.art_name, 
                    art_image: article.art_image, 
                    art_description: article.art_description,
                    art_pricecost: article.art_pricecost,
                    art_stock: article.art_stock,
                    sup_uuid: article.sup_uuid,
                    itm_uuid: article.itm_uuid,
                    cat_uuid: article.cat_uuid
                },
                { 
                    where: { cmp_uuid, art_uuid },
                    returning: true, // necesario en PostgreSQL
                }
            );
            if (updatedCount === 0) {
                throw new Error(`No se ha actualizado el article`);
            };
            return updatedArticle.get({ plain: true }) as ArticleEntity;
        } catch (error: any) {
            console.error('Error en updateArticle:', error.message);
            throw error;
        }
    }
    async deleteArticle(cmp_uuid: string, art_uuid: string): Promise<ArticleEntity | null> {
        try {
            const article = await this.findArticleById(cmp_uuid, art_uuid);
            const result = await SequelizeArticle.destroy({ where: { cmp_uuid, art_uuid } });
            if(!result) {
                throw new Error(`No se ha eliminado el article`);
            };
            return article;
        } catch (error: any) {
            console.error('Error en deleteArticle:', error.message);
            throw error;
        }
    }
    async findArticleByName(cmp_uuid: string, art_name: string, excludeUuid?: string): Promise<ArticleEntity | null> {
        try {
            const whereCondition: any = { 
                cmp_uuid: cmp_uuid ?? null,
                art_name: art_name ?? null
             };
            if (excludeUuid) {
                whereCondition.art_uuid = { [Op.ne]: excludeUuid };
            }
            const article = await SequelizeArticle.findOne({ 
                where: whereCondition
            });
            return article;
        } catch (error: any) {
            console.error('Error en findArticleByName:', error.message);
            throw error;
        }
    }
    
}