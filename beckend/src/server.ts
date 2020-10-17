import express, { response } from 'express';
import './database/connection';
import router from './routes';
import path from 'path';
import 'express-async-errors';
import handle from './handle/errorHandle';



//TESTAR A API COM RESTESTTEST
const server=express();

server.use(express.json());

server.use(router);
//Para acessar as images na url
server.use('/uploads',express.static(path.join(__dirname,'..','uploads')))
server.use(handle);
server.listen(3333);
