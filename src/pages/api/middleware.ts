import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const middleware = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session) {
      res.status(401).send('Unauthorized')
      return
    }

    // El usuario está autenticado, así que permitimos el acceso
    return handler(req, res)
  }
}

export default middleware
