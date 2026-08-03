import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { BadRequestError, sendApiError } from "@/libs/apiErrors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end();
    return;
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new BadRequestError('Invalid post ID');
    }

    if (!body || typeof body !== 'string') {
      throw new BadRequestError('A comment body is required');
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId
      }
    });

    // NOTIFICATION PART START
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        }
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: 'Someone replied on your tweet!',
            userId: post.userId
          }
        });

        await prisma.user.update({
          where: {
            id: post.userId
          },
          data: {
            hasNotification: true
          }
        });
      }
    }
    catch (error) {
      console.log(error);
    }
    // NOTIFICATION PART END

    res.status(200).json(comment);
  } catch (error) {
    sendApiError(res, error, 'POST /api/comments failed');
  }
}
