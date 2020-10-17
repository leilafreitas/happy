import express, { response } from 'express';
import './database/connection';
import router from './routes';
import path from 'path';



//TESTAR A API COM RESTESTTEST
const server=express();

server.use(express.json());

server.use(router);
//Para acessar as images na url
server.use('/uploads',express.static(path.join(__dirname,'..','uploads')))

server.listen(3333);
