import { configDotenv } from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/user.js';
import exploreRouter from './routes/explore.js';
import caseRouter from './routes/case.js';
import { checkSession } from './middlewares/authHandler.js';

configDotenv({path:'./config/config.env'});

const app = express();

export const listen = (port)=>{
  return app.listen(port,()=>console.log('server is working on port',port))
}

app.use(cors({
  origin:'*',
  credentials:true //allows passing of headers
}));
app.use(cookieParser()); //enables receiving cookies from client
app.use(express.json()); //enables receiving body data from client

app.use('/user',userRouter);
app.use('/explore',exploreRouter);
app.use('/case',checkSession,caseRouter);

app.use(errorHandler);