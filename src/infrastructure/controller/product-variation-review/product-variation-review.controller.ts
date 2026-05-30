import { Request, Response } from "express";
import { ProductVariationReviewUseCase } from "../../../application/product-variation-review/product-variation-review-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class ProductVariationReviewController {
    constructor(private productVariationReviewUseCase: ProductVariationReviewUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }

            const reviews = await this.productVariationReviewUseCase.getProductVariationReviews(cmp_uuid, pro_uuid, prov_uuid);

            if (page && perPage) {
                return res.status(200).send({
                    success: true,
                    message: 'Reseñas retornadas con paginación.',
                    ...paginator(reviews, page, perPage)
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Reseñas retornadas.',
                    data: reviews
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller - product-variation-review):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las reseñas.',
                error: error.message,
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const provrev_uuid = req.params.provrev_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!provrev_uuid || provrev_uuid.toLowerCase() === 'null' || provrev_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta provrev_uuid.' });
            }

            const review = await this.productVariationReviewUseCase.findProductVariationReviewById(cmp_uuid, pro_uuid, prov_uuid, provrev_uuid);
            return res.status(200).send({
                success: true,
                message: 'Reseña retornada.',
                data: review
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller - product-variation-review):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la reseña.',
                error: error.message,
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const pro_uuid = body.pro_uuid;
            const prov_uuid = body.prov_uuid;
            const usr_uuid = body.usr_uuid;
            const cus_uuid = body.cus_uuid;
            const provrev_rating = body.provrev_rating;

            if (!cmp_uuid) return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            if (!pro_uuid) return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            if (!prov_uuid) return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            if (!usr_uuid) return res.status(400).json({ success: false, message: 'Falta usr_uuid.' });
            if (!cus_uuid) return res.status(400).json({ success: false, message: 'Falta cus_uuid.' });
            if (provrev_rating === undefined) return res.status(400).json({ success: false, message: 'Falta provrev_rating.' });

            const review = await this.productVariationReviewUseCase.createProductVariationReview(body);
            return res.status(200).json({
                success: true,
                message: 'Reseña registrada.',
                data: review
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller - product-variation-review):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo registrar la reseña.',
                error: error.message,
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const provrev_uuid = req.params.provrev_uuid;
            const update = req.body;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!provrev_uuid || provrev_uuid.toLowerCase() === 'null' || provrev_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta provrev_uuid.' });
            }

            const review = await this.productVariationReviewUseCase.updateProductVariationReview(cmp_uuid, pro_uuid, prov_uuid, provrev_uuid, update);
            return res.status(200).json({
                success: true,
                message: 'Reseña actualizada.',
                data: review
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller - product-variation-review):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la reseña.',
                error: error.message,
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const pro_uuid = req.params.pro_uuid;
            const prov_uuid = req.params.prov_uuid;
            const provrev_uuid = req.params.provrev_uuid;

            if (!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta cmp_uuid.' });
            }
            if (!pro_uuid || pro_uuid.toLowerCase() === 'null' || pro_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta pro_uuid.' });
            }
            if (!prov_uuid || prov_uuid.toLowerCase() === 'null' || prov_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta prov_uuid.' });
            }
            if (!provrev_uuid || provrev_uuid.toLowerCase() === 'null' || provrev_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({ success: false, message: 'Falta provrev_uuid.' });
            }

            const review = await this.productVariationReviewUseCase.deleteProductVariationReview(cmp_uuid, pro_uuid, prov_uuid, provrev_uuid);
            return res.status(200).json({
                success: true,
                message: 'Reseña eliminada.',
                data: review
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller - product-variation-review):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la reseña.',
                error: error.message,
            });
        }
    }
}
