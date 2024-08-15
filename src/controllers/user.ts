import prisma from '../db'
import express, { NextFunction, Request , Response} from 'express';
import { hashPassword, createJwt, comparePassword} from '../utils/auth'

export const createNew = async (req: Request, res: Response, next: NextFunction)=>{
    try{
    console.log("Executing createNew function");
    const user = await prisma.user.create({
        data:{
            userName: req.body.userName,
            password: await hashPassword(req.body.password)
        }
    })
    
    const token = createJwt(user)
    res.json({ token })

    } catch(err: any){
        err.type = 'input'
        next(err)
    }
}


export const signIn = async (req: Request, res: Response)=>{
    console.log("Executing signIn function");
    const user = await prisma.user.findUnique({
        where:{
            userName: req.body.userName
        }

    })

    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const isValid = await comparePassword(req.body.password, user.password)

    if(!isValid){
        res.status(401)
        res.json({message: 'nope'})
        return
    }

    const token = createJwt(user)
    res.json({ token })
}