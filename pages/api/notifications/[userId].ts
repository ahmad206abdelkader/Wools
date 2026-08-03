import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import { BadRequestError, sendApiError } from '@/libs/apiErrors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end();
    return;
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new BadRequestError('Invalid user ID');
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hasNotification: false,
      }
    });

    res.status(200).json(notifications);
  } catch (error) {
    sendApiError(res, error, 'GET /api/notifications/[userId] failed');
  }
}
