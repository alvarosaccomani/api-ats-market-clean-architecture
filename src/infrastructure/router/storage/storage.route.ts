import { Express } from "express";
import { R2StorageService } from "../../services/r2-storage.service";
import { StorageUseCase } from "../../../application/storage/storage-use-case";
import { StorageController } from "../../controller/storage/storage.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureStorageRoutes(app: Express, _socketAdapter?: SocketAdapter) {
    /*
     * Iniciar adaptadores de infraestructura
     */
    const r2StorageService = new R2StorageService();

    /*
     * Iniciar casos de uso
     */
    const storageUseCase = new StorageUseCase(
        r2StorageService,
        r2StorageService.publicBucket,
        r2StorageService.privateBucket,
        process.env.STORAGE_APP_PREFIX || 'ats-market'
    );

    /*
     * Iniciar controlador
     */
    const storageCtrl = new StorageController(storageUseCase);

    /**
     * @swagger
     * /storage/presigned-upload:
     *   post:
     *     tags:
     *       - Storage
     *     summary: Obtener URL prefirmada para subida directa a Cloudflare R2
     *     description: Genera una URL prefirmada (Presigned URL) para que el frontend suba archivos binarios directamente a Cloudflare R2 mediante HTTP PUT sin pasar por el servidor Node.js.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - filename
     *               - contentType
     *             properties:
     *               filename:
     *                 type: string
     *                 example: ticket_123.jpg
     *               contentType:
     *                 type: string
     *                 example: image/jpeg
     *               bucketType:
     *                 type: string
     *                 enum: [public, private]
     *                 default: private
     *               folder:
     *                 type: string
     *                 example: vouchers
     *               expiresInSeconds:
     *                 type: number
     *                 default: 300
     *     responses:
     *       200:
     *         description: URL prefirmada generada exitosamente.
     *       401:
     *         description: Token no provisto o inválido.
     *       400:
     *         description: Datos inválidos o tipo MIME no permitido.
     */
    app.post(`/${process.env.BASE_URL_API}/storage/presigned-upload`, authMiddleware, storageCtrl.getUploadPresignedUrlCtrl);

    /**
     * @swagger
     * /storage/presigned-download:
     *   post:
     *     tags:
     *       - Storage
     *     summary: Obtener URL prefirmada temporal para visualizar o descargar un archivo privado
     *     description: Genera una URL temporal firmada para acceder a objetos alojados en el bucket privado.
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - key
     *             properties:
     *               key:
     *                 type: string
     *                 description: Clave o path del objeto en el bucket privado
     *                 example: vouchers/user-123/receipt.png
     *               expiresInSeconds:
     *                 type: number
     *                 default: 300
     *     responses:
     *       200:
     *         description: URL prefirmada de lectura generada exitosamente.
     *       401:
     *         description: Token no provisto o inválido.
     *       400:
     *         description: Parámetros inválidos.
     */
    app.post(`/${process.env.BASE_URL_API}/storage/presigned-download`, authMiddleware, storageCtrl.getDownloadPresignedUrlCtrl);
}

export default configureStorageRoutes;
