import { NextApiRequest, NextApiResponse } from "next";
import api from "./api";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    const datos = await api.setFiveRandomTeams();

    res.status(200)
        .setHeader('Clear-Storage', 'true')
        .json(datos);


}