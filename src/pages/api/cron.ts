import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import api from './api'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const cronJobSecret = process.env.NEXT_PUBLIC_CRONJOB_AUTH_TOKEN;

    if (req.headers['cron-job'] !== cronJobSecret) {
        res.status(401).send('Acceso no autorizado');
        return;
    }

    const datos = await api.setFiveRandomTeams();

    res.status(200)
        .setHeader('Clear-Storage', 'true')
        .setHeader('Cron-Job', `${cronJobSecret}`)
        .json(datos);
}

export default handler;
