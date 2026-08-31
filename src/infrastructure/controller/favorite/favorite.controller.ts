import { Request, Response } from "express";
import { FavoriteUseCase } from "../../../application/favorite/favorite-use-case";
import https from "https";

function getIpLocation(ip: string): Promise<{ city: string; region: string; country: string }> {
    return new Promise((resolve) => {
        const cleanIp = ip.replace(/^::ffff:/, "");
        if (!cleanIp || cleanIp === "::1" || cleanIp === "127.0.0.1" || cleanIp.startsWith("fe80") || cleanIp.startsWith("10.") || cleanIp.startsWith("192.168.")) {
            const mockLocations = [
                { city: "Rosario", region: "Santa Fe", country: "Argentina" },
                { city: "Córdoba", region: "Córdoba", country: "Argentina" },
                { city: "CABA", region: "Buenos Aires", country: "Argentina" },
                { city: "Mendoza", region: "Mendoza", country: "Argentina" },
                { city: "La Plata", region: "Buenos Aires", country: "Argentina" }
            ];
            const randomIndex = Math.floor(Math.random() * mockLocations.length);
            return resolve(mockLocations[randomIndex]);
        }
        https.get(`https://ip-api.com/json/${cleanIp}?fields=status,country,regionName,city`, (res) => {
            let data = "";
            res.on("data", (chunk) => { data += chunk; });
            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.status === "success") {
                        return resolve({
                            city: parsed.city || "Desconocido",
                            region: parsed.regionName || "Desconocido",
                            country: parsed.country || "Desconocido"
                        });
                    }
                } catch (e) {}
                resolve({ city: "Desconocido", region: "Desconocido", country: "Desconocido" });
            });
        }).on("error", () => {
            resolve({ city: "Desconocido", region: "Desconocido", country: "Desconocido" });
        });
    });
}

export class FavoriteController {
    constructor(private readonly favoriteUseCase: FavoriteUseCase) {
        this.addFavoriteCtrl = this.addFavoriteCtrl.bind(this);
        this.removeFavoriteCtrl = this.removeFavoriteCtrl.bind(this);
        this.getFavoritesCtrl = this.getFavoritesCtrl.bind(this);
    }

    public async addFavoriteCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, pro_uuid, prov_uuid } = req.body;
            const usr_uuid = (req as any).user?.sub;

            if (!cmp_uuid || !pro_uuid || !prov_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "Faltan parámetros requeridos (cmp_uuid, pro_uuid, prov_uuid)."
                });
            }

            if (!usr_uuid) {
                return res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado."
                });
            }

            // Capturar la IP de la solicitud
            let clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "";
            if (clientIp.includes(",")) {
                clientIp = clientIp.split(",")[0].trim();
            }

            // Obtener geolocalización por IP
            const location = await getIpLocation(clientIp);

            // Obtener dispositivo desde el User-Agent
            const userAgent = req.headers["user-agent"] || "";
            const isMobile = /mobile|iphone|ipad|android/i.test(userAgent);
            const device = isMobile ? "Mobile" : "Desktop";

            const result = await this.favoriteUseCase.addFavorite({
                usr_uuid,
                cmp_uuid,
                pro_uuid,
                prov_uuid,
                clientIp,
                device,
                location
            });

            return res.status(201).json({
                success: true,
                message: "Producto agregado a favoritos con éxito.",
                data: result
            });
        } catch (error: any) {
            console.error('Error en addFavoriteCtrl:', error.message);
            return res.status(500).json({
                success: false,
                message: "Error al agregar a favoritos.",
                error: error.message
            });
        }
    }

    public async removeFavoriteCtrl(req: Request, res: Response) {
        try {
            const { prov_uuid } = req.params;
            const { cmp_uuid } = req.query; 
            const usr_uuid = (req as any).user?.sub;

            if (!prov_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "Falta el parámetro prov_uuid."
                });
            }

            if (!usr_uuid) {
                return res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado."
                });
            }

            const result = await this.favoriteUseCase.removeFavorite({
                usr_uuid,
                prov_uuid,
                cmp_uuid: cmp_uuid as string
            });

            return res.status(200).json({
                success: true,
                message: result ? "Producto eliminado de favoritos." : "El producto no estaba en favoritos.",
                data: result
            });
        } catch (error: any) {
            console.error('Error en removeFavoriteCtrl:', error.message);
            return res.status(500).json({
                success: false,
                message: "Error al eliminar de favoritos.",
                error: error.message
            });
        }
    }

    public async getFavoritesCtrl(req: Request, res: Response) {
        try {
            const usr_uuid = (req as any).user?.sub;
            const withDetails = req.query.details === 'true';

            if (!usr_uuid) {
                return res.status(401).json({
                    success: false,
                    message: "Usuario no autenticado."
                });
            }

            const result = withDetails 
                ? await this.favoriteUseCase.getFavoritesWithDetailsByUserId(usr_uuid)
                : await this.favoriteUseCase.getFavoritesByUserId(usr_uuid);

            return res.status(200).json({
                success: true,
                data: result
            });
        } catch (error: any) {
            console.error('Error en getFavoritesCtrl:', error.message);
            return res.status(500).json({
                success: false,
                message: "Error al obtener favoritos.",
                error: error.message
            });
        }
    }
}
