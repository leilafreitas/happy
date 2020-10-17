import { create } from 'domain';
import {getRepository} from 'typeorm';
import { isExpressionStatement } from 'typescript';
import Orphanages from '../models/Orphanage';
import {Request,Response} from 'express';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
export default{
    async index(req:Request,res:Response){
        const OrphanageRepository=getRepository(Orphanage);
        const lista=await OrphanageRepository.find({
            relations:['images']
        });
        return res.json(orphanageView.renderMany(lista));
    },

    async create(req:Request,res:Response){
       
            const{
                name,
                latitude,
                longitude,
                about,
                instructions,
                open_on_weekends,
                opening_hours, 
            }= req.body;
        
            const OrphanageRepository= getRepository(Orphanages);
            const requentImages= req.files as Express.Multer.File[];
            const images= requentImages.map(image=>{
                return {path:image.filename}
            })
            const orphanage = OrphanageRepository.create({
                name,
                latitude,
                longitude,
                about,
                instructions,
                open_on_weekends,
                opening_hours, 
                images
            });
        
            await OrphanageRepository.save(orphanage);
            return res.json(orphanage)
    },
    async findOne(req:Request,res:Response){
        const OrphanageRepository=getRepository(Orphanage);
        const result=await OrphanageRepository.findOneOrFail(req.params.id,{relations:['images']} );
        return res.json(orphanageView.render(result));
    }
    
}