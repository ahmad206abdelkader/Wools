import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import { BadRequestError, sendApiError } from '@/libs/apiErrors';

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'GET'){
        res.setHeader('Allow', 'GET');
        res.status(405).end();
        return;
    }

    try{
        const {userId} = req.query;

        if(!userId || typeof userId !== 'string'){
            throw new BadRequestError('Invalid user ID');
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const followersCount = await prisma.user.count({
            where:{
                followingIds:{
                    has: userId
                }
            }
        });

        res.status(200).json({ ...existingUser, followersCount});
    }catch(error){
        sendApiError(res, error, 'GET /api/users/[userId] failed');
    }
}
