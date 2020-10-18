import { create } from 'domain';
import {getRepository} from 'typeorm';
import Orphanages from '../models/Orphanage';
import {Request,Response} from 'express';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';
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
            const data ={
                name,
                latitude,
                longitude,
                about,
                instructions,
                open_on_weekends: open_on_weekends === "true" ,
                opening_hours, 
                images
            }
            const schema = Yup.object().shape({
                name:Yup.string().required(),
                latitude:Yup.number().required(),
                longitude:Yup.number().required(),
                about:Yup.string().required().max(300),
                instructions:Yup.string().required(),
                open_on_weekends:Yup.boolean().required(),
                opening_hours:Yup.string().required(), 
                images:Yup.array(
                    Yup.object().shape({
                        path:Yup.string().required()
                })
                )
            });
            await schema.validate(data,{
                abortEarly:false,

            });
            const orphanage = OrphanageRepository.create(data);
        
            await OrphanageRepository.save(orphanage);
            
            return res.json(orphanage)
    },
    async findOne(req:Request,res:Response){
        const OrphanageRepository=getRepository(Orphanage);
        const result=await OrphanageRepository.findOneOrFail(req.params.id,{relations:['images']} );
        return res.json(orphanageView.render(result));
    }
    
}