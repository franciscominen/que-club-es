import { NextApiRequest, NextApiResponse } from "next";
import api from "./api";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    // Llama a tu función para generar los datos aleatorios
    const datos = await api.teams.fetchFiveRandomTeams();

    // Devuelve los datos en formato JSON
    res.status(200).json(datos);
}