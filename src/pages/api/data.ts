import { NextApiRequest, NextApiResponse } from "next";
import api from "./api";

// Middleware para verificar la autenticación en la cabecera HTTP
const authenticateMiddleware = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers['authorization'];

    // Verificar la presencia de la cabecera personalizada y el valor de autenticación correspondiente
    if (authHeader !== 'Bearer YOUR_AUTHENTICATION_TOKEN') {
        res.status(401).send('Unauthorized');
        return;
    }

    await handler(req, res);
};

// Manejador de la ruta "api/cron" con el middleware de autenticación
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    const datos = await api.setFiveRandomTeams();

    res.status(200)
        .setHeader('Clear-Storage', 'true')
        .json(datos);
};

export default authenticateMiddleware(handler);
