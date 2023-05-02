import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import api from './api';

const MY_APP_SECRET_TOKEN = 'mySecretToken'; // La clave secreta compartida con EasyCron

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers['x-queclube-token'] as string;
  
  if (!token || token !== MY_APP_SECRET_TOKEN) {
    res.status(401).send('Acceso no autorizado');
    return;
  }

  const datos = await api.setFiveRandomTeams();

  res.status(200)
    .setHeader('Clear-Storage', 'true')
    .json(datos);
};

export default handler;
