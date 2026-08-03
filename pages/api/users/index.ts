import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import { sendApiError } from '@/libs/apiErrors';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method !== 'GET'){
        res.setHeader('Allow', 'GET');
        res.status(405).end();
        return;
    }

    try{
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json(users);
    }catch(error){
        sendApiError(res, error, 'GET /api/users failed');
    }
}
