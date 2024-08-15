import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express, { Request, Response, NextFunction } from 'express';


export const comparePassword = (password:any, hash: any) =>{
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password : any) =>{
  return bcrypt.hash(password, 5)
}

export const createJwt = (user: { id: any; userName: any; })=>{

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

  const token = jwt.sign({
    id: user.id,
    username: user.userName
  }, secret, { expiresIn: '1h' })

  return token;
}


export const protect = (req: Request, res: Response, next:NextFunction) =>{
  const bearer = req.headers.authorization

  if(!bearer){
    res.status(401)
    res.json({message: "Not authorized"})
    return
  }

  const [, token] = bearer.split(' ')

  if(!token){
    res.status(401)
    res.json({message: "Not valid token"})
    return
  }

  try{

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    
  const user = jwt.verify(token, secret)
  req.user = user
  next()
  }catch(err){
    res.status(401)
    res.json({message: "Not valid token"})
    return
  }

}

