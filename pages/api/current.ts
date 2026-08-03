import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';
import { AuthenticationError, sendApiError } from '@/libs/apiErrors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end();
    return;
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    res.status(200).json(currentUser);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(200).json(null);
      return;
    }

    sendApiError(res, error, 'GET /api/current failed');
  }
}
