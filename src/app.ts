require('dotenv').config();
import express, {Request, Response, NextFunction} from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './utils/auth';
import { createNew, signIn } from './controllers/user';
import config from './config';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res, next) =>{
    setTimeout(()=>{
    next(new Error ('hello'))
    }, 1)
})

// Public routes
app.post('/register', (req, res) => {
    console.log("Hitting the /register endpoint");
    createNew;
});
app.post('/signIn', signIn);
app.use((err:any, req: Request, res:Response, next: NextFunction)=>{
    if(err.type === 'auth'){
    res.status(401).json({ message: 'Unauthorized'})
    } else if(err.type === 'input'){
        res.status(400).json({message: 'Invalid inputt'})
    }
    else{
        res.status(500).json({message: 'Internal server error'})
    }
})


// Protected routes
app.use('/api', protect, router);

const PORT = process.env.PORT || 3000;

app.listen(config.port, () => {
    console.log(`Server is up and running on ${config.port}`);
});

