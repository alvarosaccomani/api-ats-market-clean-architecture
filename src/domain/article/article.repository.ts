import { ArticleEntity, ArticleUpdateData } from "./article.entity";

export interface ArticleRepository {
    getArticles(cmp_uuid: string, cus_uuid: string): Promise<ArticleEntity[] | null>;
    findArticleById(cmp_uuid: string, cus_uuid: string): Promise<ArticleEntity | null>;
    createArticle(article: ArticleEntity): Promise<ArticleEntity | null>;
    updateArticle(cmp_uuid: string, cus_uuid: string, article: ArticleUpdateData): Promise<ArticleEntity | null>;
    deleteArticle(cmp_uuid: string, cus_uuid: string): Promise<ArticleEntity | null>;
    findArticleByName(cmp_uuid: string, cus_uuid: string, art_name: string, excludeUuid?: string | null): Promise<ArticleEntity | null>;
}