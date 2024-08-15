import { validationResult } from "express-validator";
import { Request, Response, NextFunction} from 'express'

export const handleInputErrors = (req: Request, res: Response, next: NextFunction)=>{
const error = validationResult(req)

if(!error.isEmpty){
    res.status(401)
    res.json({errors: error.array() })
}
}