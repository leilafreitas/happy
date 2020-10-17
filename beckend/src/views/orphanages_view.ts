import Orphanage from "../models/Orphanage";
import imagesView from "./imagesView";
import * as Yup from 'yup';

export default{
    render(orphanage:Orphanage){
        return{
            name:orphanage.id,
            latitude:orphanage.latitude,
            longitude:orphanage.longitude,
            about:orphanage.about,
            instructions:orphanage.instructions,
            open_on_weekends:orphanage.open_on_weekends,
            opening_hours:orphanage.opening_hours, 
            image:imagesView.renderMany(orphanage.images)
        }
    },
    renderMany(orphanages:Orphanage[]){
        return orphanages.map(orphanage=> this.render(orphanage))
    }
}