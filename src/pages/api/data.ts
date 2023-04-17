import { NextApiRequest, NextApiResponse } from "next";
import api from "./api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Verificar la presencia y el valor del parámetro de consulta compartido
    if (req.query.key !== 'sharedKey') {
        res.status(404).end();
        return;
    }

    const datos = await api.setFiveRandomTeams();

    res.status(200)
        .setHeader('Clear-Storage', 'true')
        .json(datos);
}
