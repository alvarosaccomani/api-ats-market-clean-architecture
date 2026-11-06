import { Request, Response } from "express";
import { StorageUseCase } from "../../../application/storage/storage-use-case";

export class StorageController {
    constructor(private readonly storageUseCase: StorageUseCase) {
        this.getUploadPresignedUrlCtrl = this.getUploadPresignedUrlCtrl.bind(this);
        this.getDownloadPresignedUrlCtrl = this.getDownloadPresignedUrlCtrl.bind(this);
    }

    /**
     * Endpoint para solicitar una URL prefirmada de subida (PUT) directa a Cloudflare R2.
     * Extrae el identificador del usuario de la sesión autenticada (req.user) para evitar spoofing.
     */
    public async getUploadPresignedUrlCtrl(req: Request, res: Response) {
        try {
            const authUser = (req as any).user;
            // El sub del token contiene el usr_uuid
            const authenticatedUsrUuid = authUser?.sub || authUser?.usr_uuid;
            const { usr_uuid: bodyUsrUuid, filename, contentType, bucketType, folder, expiresInSeconds } = req.body;

            const effectiveUsrUuid = authenticatedUsrUuid || bodyUsrUuid;

            if (!effectiveUsrUuid) {
                return res.status(401).json({
                    success: false,
                    message: 'Usuario no autenticado o identificador de usuario no provisto.',
                });
            }

            const result = await this.storageUseCase.getPresignedUploadUrl({
                usr_uuid: effectiveUsrUuid,
                filename,
                contentType,
                bucketType,
                folder,
                expiresInSeconds: expiresInSeconds ? parseInt(expiresInSeconds, 10) : undefined,
            });

            return res.status(200).send({
                success: true,
                message: 'URL prefirmada generada exitosamente.',
                data: result,
            });
        } catch (error: any) {
            console.error('Error en getUploadPresignedUrlCtrl (storage controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo generar la URL prefirmada de subida.',
                error: error.message,
            });
        }
    }

    /**
     * Endpoint para solicitar una URL prefirmada de descarga temporal para un archivo privado.
     */
    public async getDownloadPresignedUrlCtrl(req: Request, res: Response) {
        try {
            const { key, expiresInSeconds } = req.body;

            const result = await this.storageUseCase.getPresignedDownloadUrl(
                key,
                expiresInSeconds ? parseInt(expiresInSeconds, 10) : undefined
            );

            return res.status(200).send({
                success: true,
                message: 'URL de descarga prefirmada generada exitosamente.',
                data: result,
            });
        } catch (error: any) {
            console.error('Error en getDownloadPresignedUrlCtrl (storage controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo generar la URL prefirmada de descarga.',
                error: error.message,
            });
        }
    }
}
