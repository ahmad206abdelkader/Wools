import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import { BadRequestError, sendApiError } from '@/libs/apiErrors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end();
    return;
  }

  try {
    const { email, username, name, password } = req.body;

    if (!email || !username || !name || !password) {
      throw new BadRequestError('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      }
    });

    res.status(200).json(user);
  } catch (error) {
    sendApiError(res, error, 'POST /api/register failed');
  }
}
