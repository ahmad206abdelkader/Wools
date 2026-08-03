import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import { BadRequestError, sendApiError } from "@/libs/apiErrors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end();
    return;
  }

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new BadRequestError('Invalid post ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    sendApiError(res, error, 'GET /api/posts/[postId] failed');
  }
}
