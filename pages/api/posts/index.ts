import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { BadRequestError, sendApiError } from "@/libs/apiErrors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end();
    return;
  }

  try {
    
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      if (!body || typeof body !== 'string') {
        throw new BadRequestError('A post body is required');
      }

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id
        }
      });

      res.status(200).json(post);
      return;
    }

    if (req.method === 'GET') {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === 'string') {
        posts = await prisma.post.findMany({
          where: {
            userId
          },
          include: {
            user: true,
            comments: true
          },
          orderBy: {
            createdAt: 'desc'
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
      }

      res.status(200).json(posts);
      return;
    }
  } catch (error) {
    sendApiError(res, error, `${req.method} /api/posts failed`);
  }
}
