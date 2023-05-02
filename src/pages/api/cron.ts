import middleware from './middleware'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import api from './api'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const datos = await api.setFiveRandomTeams();

    res.status(200)
        .setHeader('Clear-Storage', 'true')
        .json(datos);
}

export default middleware(handler)