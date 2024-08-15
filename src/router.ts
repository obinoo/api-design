import express, { NextFunction, Request, Response } from "express";
import { body, check, oneOf } from 'express-validator';
import { handleInputErrors } from "./utils/middleware";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./controllers/products";
import { createUpdate, deleteUpdated, getOneUpdate, getUpdates, updateUpdate } from "./controllers/update";

const router = express.Router();


// product

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)


// update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',body('title').optional(),
       body('body').optional(),
       oneOf([check('status').equals('IN_PROGRESS'), check('status').equals('SHIPPED'),
       check('status').equals('DEPRECATED')])
       ,body('version').optional(), updateUpdate)

router.post('/update', body('title').exists(),
       body('body').exists(), body('productId').exists(), createUpdate)
router.delete('/update/:id', deleteUpdated)


//  update point
router.get('/updatepoint', ()=>{})
router.get('/uodatepoint/:id', ()=>{})
router.put('/updatepoint/:id', body('name').optional().isString(), 
       body('description').optional().isString(), ()=>{})

router.post('/updatepoint', body('name').optional().isString(), 
        body('description').optional().isString(), 
        body('updateId').exists().isString(),  ()=>{})
router.delete('/updatepoint/:id', ()=>{})

router.use((err: any, req: Request, res: Response, next: NextFunction)=>{
       console.log(err)
       res.json({ message: 'in route handler'})
})

export default router;






// import express, { Request, Response } from "express";

// const router = express.Router();

// // product routes
// router.get('/product', (req: Request, res: Response) => {
//   res.send("Get all products");
// });

// router.get('/product/:id', (req: Request, res: Response) => {
//   res.send(`Get product with ID ${req.params.id}`);
// });

// router.put('/product/:id', (req: Request, res: Response) => {
//   res.send(`Update product with ID ${req.params.id}`);
// });

// router.post('/product', (req: Request, res: Response) => {
//   res.send("Create a new product");
// });

// router.delete('/product/:id', (req: Request, res: Response) => {
//   res.send(`Delete product with ID ${req.params.id}`);
// });

// // update routes
// router.get('/update', (req: Request, res: Response) => {
//   res.send("Get all updates");
// });

// router.get('/update/:id', (req: Request, res: Response) => {
//   res.send(`Get update with ID ${req.params.id}`);
// });

// router.put('/update/:id', (req: Request, res: Response) => {
//   res.send(`Update update with ID ${req.params.id}`);
// });

// router.post('/update', (req: Request, res: Response) => {
//   res.send("Create a new update");
// });

// router.delete('/update/:id', (req: Request, res: Response) => {
//   res.send(`Delete update with ID ${req.params.id}`);
// });

// // update point routes
// router.get('/updatepoint', (req: Request, res: Response) => {
//   res.send("Get all update points");
// });

// router.get('/updatepoint/:id', (req: Request, res: Response) => {
//   res.send(`Get update point with ID ${req.params.id}`);
// });

// router.put('/updatepoint/:id', (req: Request, res: Response) => {
//   res.send(`Update update point with ID ${req.params.id}`);
// });

// router.post('/updatepoint', (req: Request, res: Response) => {
//   res.send("Create a new update point");
// });

// router.delete('/updatepoint/:id', (req: Request, res: Response) => {
//   res.send(`Delete update point with ID ${req.params.id}`);
// });

// export default router;
