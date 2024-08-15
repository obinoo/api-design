import prisma from  '../db'
import { Request, Response, NextFunction} from 'express'


export const getProducts = async(req:Request, res: Response)=>{

    try{
    const user = await prisma.user.findUnique({
  where:{
    id: req.user.id
  },
  include:{
    products: true
  }
    });
    
    if(!user){
        res.status(401)
        res.json({message: 'Not found'})
        return
    }

    res.json({ data: user.products})
}catch(error){
    res.status(500).json({ message: 'Server error', error });
}
}


export const getOneProduct = async(req:Request, res:Response)=>{

    const id = req.params.id;

    const product = prisma.product.findFirst({
        where:{
            id,
            belongsToId: req.params.id
        }
    })
    res.json({ data: product})
}


export const createProduct = async(req: Request, res:Response, next: NextFunction)=>{

   try{
    const product = prisma.product.create({
        data:{
            name: req.body.id,
            belongsToId: req.user.id
        }
    })
    res.json({ data: product})

} catch(err: any){
    err.type = 'input'
    next(err)
}
}

export const updateProduct = async (req: Request, res: Response)=>{

    const updated = prisma.product.update({
        where:{
            // id: req.params.id,
            // belongsToId: req.user.id
            id_belongsToId:{
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data:{
            name: req.body.name
        }
    })
    res.json({ data: updated})
}

export const deleteProduct = async (req:Request, res:Response)=>{
    const deleted = prisma.product.delete({
        where:{
            // id: req.params.id,
            // belongsToId: req.user.id
            id_belongsToId:{
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })
}