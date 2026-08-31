import { Request, Response } from "express";
import { AnalyticEventUseCase } from "../../../application/analytic-event/analytic-event-use-case";
import https from "https";

function getIpLocation(ip: string): Promise<{ city: string; region: string; country: string }> {
    return new Promise((resolve) => {
        const cleanIp = ip.replace(/^::ffff:/, ""); // Limpiar prefijo IPv6 de IPv4
        
        // Si es una IP local/loopback
        if (!cleanIp || cleanIp === "::1" || cleanIp === "127.0.0.1" || cleanIp.startsWith("fe80") || cleanIp.startsWith("10.") || cleanIp.startsWith("192.168.")) {
            const mockLocations = [
                { city: "Rosario", region: "Santa Fe", country: "Argentina" },
                { city: "Córdoba", region: "Córdoba", country: "Argentina" },
                { city: "CABA", region: "Buenos Aires", country: "Argentina" },
                { city: "Mendoza", region: "Mendoza", country: "Argentina" },
                { city: "La Plata", region: "Buenos Aires", country: "Argentina" },
                { city: "San Miguel de Tucumán", region: "Tucumán", country: "Argentina" }
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

export class AnalyticEventController {
    constructor(private analyticEventUseCase: AnalyticEventUseCase) {
        this.trackEventCtrl = this.trackEventCtrl.bind(this);
        this.getSummaryCtrl = this.getSummaryCtrl.bind(this);
    }

    public async trackEventCtrl(req: Request, res: Response) {
        try {
            const { cmp_uuid, aev_eventtype, aev_targetuuid, aev_metadata } = req.body;
            if (!cmp_uuid || !aev_eventtype) {
                return res.status(400).json({
                    success: false,
                    message: "Faltan parámetros requeridos (cmp_uuid, aev_eventtype)."
                });
            }

            // Capturar la IP de la solicitud
            let clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "";
            if (clientIp.includes(",")) {
                clientIp = clientIp.split(",")[0].trim();
            }

            // Obtener geolocalización por IP de forma pasiva
            const location = await getIpLocation(clientIp);

            // Obtener dispositivo desde el User-Agent
            const userAgent = req.headers["user-agent"] || "";
            const isMobile = /mobile|iphone|ipad|android|blackberry|webos/i.test(userAgent);
            const device = isMobile ? "Mobile" : "Desktop";

            // Mezclar ubicación en metadatos
            let metaObj: any = {};
            if (aev_metadata) {
                try {
                    metaObj = typeof aev_metadata === "string" ? JSON.parse(aev_metadata) : aev_metadata;
                } catch (e) {
                    metaObj = { rawMetadata: aev_metadata };
                }
            }
            metaObj.location = location;
            metaObj.clientIp = clientIp;
            metaObj.device = device;

            const event = await this.analyticEventUseCase.trackEvent({
                cmp_uuid,
                aev_eventtype,
                aev_targetuuid,
                aev_metadata: JSON.stringify(metaObj)
            });
            return res.status(201).json({
                success: true,
                message: "Evento registrado con éxito.",
                data: event
            });
        } catch (error: any) {
            console.error('Error en trackEventCtrl:', error.message);
            return res.status(500).json({
                success: false,
                message: "Error al registrar el evento.",
                error: error.message
            });
        }
    }

    public async getSummaryCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if (!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: "El parámetro cmp_uuid es obligatorio."
                });
            }
            const days = req.query.days ? parseInt(req.query.days as string) : 7;
            const prov_uuid = req.query.prov_uuid as string | undefined;

            const summary = await this.analyticEventUseCase.getEventsSummary(cmp_uuid, { days, prov_uuid });
            return res.status(200).json({
                success: true,
                message: "Resumen de analíticas retornado con éxito.",
                data: summary
            });
        } catch (error: any) {
            console.error('Error en getSummaryCtrl:', error.message);
            return res.status(500).json({
                success: false,
                message: "Error al generar el resumen de analíticas.",
                error: error.message
            });
        }
    }
}
