import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb';
import { BadRequestError, sendApiError } from '@/libs/apiErrors';

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method !== 'POST' && req.method !== 'DELETE'){
        res.setHeader('Allow', ['POST', 'DELETE']);
        res.status(405).end();
        return;
    }

    try{
        const {userId} = req.body;

        const {currentUser} = await serverAuth(req, res);

        if(!userId || typeof userId !== 'string'){
            throw new BadRequestError('Invalid user ID');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user){
            throw new BadRequestError('User not found');
        }

        let updatedFollowingIds = [...(user.followingIds || [])];

        if(req.method === 'POST'){
            updatedFollowingIds.push(userId);

            try{
                await prisma.notification.create({
                    data:{
                        body: 'Someone followed you!',
                        userId
                    }
                });

                await prisma.user.update({
                    where:{
                        id:userId
                    },
                    data:{
                        hasNotification: true
                    }
                })
            }catch(error){
                console.log(error);
            }
        }

        if(req.method === 'DELETE'){
            updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);
        }

        const updatedUser = await prisma.user.update({
            where:{
                id: currentUser.id
            },
            data:{
                followingIds: updatedFollowingIds
            }
        });

        res.status(200).json(updatedUser);

    }catch(error){
        sendApiError(res, error, `${req.method} /api/follow failed`);
    }
}
