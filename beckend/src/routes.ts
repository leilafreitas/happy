import {Router} from 'express';
import multer from 'multer';
import uploadsConfig from './config/upload';
import orphanaheController from './controllers/OrphanagesController';
const routes= Router();
const upload = multer(uploadsConfig);
routes.post('/orphanages',upload.array('images'),orphanaheController.create);
routes.get('/orphanages',orphanaheController.index);
routes.get('/orphanages/:id',orphanaheController.findOne);
export default routes;

