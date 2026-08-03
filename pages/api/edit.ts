import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { BadRequestError, sendApiError } from "@/libs/apiErrors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH');
    res.status(405).end();
    return;
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new BadRequestError('Name and username are required');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    sendApiError(res, error, 'PATCH /api/edit failed');
  }
}
