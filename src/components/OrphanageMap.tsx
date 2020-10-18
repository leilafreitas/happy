import React,{useEffect,useState} from 'react';
import maplogo from '../images/logohappy.svg';
import {Link} from 'react-router-dom';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import{Map,TileLayer,Marker,Popup} from 'react-leaflet';
import '../styles/pages/orphanagesmap.css';
import 'leaflet/dist/leaflet.css';
import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';
interface Orphanage {
    id:number,
    latitude:number,
    longitude:number,
    name:string
}
function OrphanageMap(){
    let [orphanages,setOrphanages]=useState<Orphanage[]>([]);

    useEffect(()=>{
        api.get('orphanages').then(response=>{
            setOrphanages(response.data);
        })
    }    
    ,[]);
    return(
        <div className="page-map">
            <aside>
                <header>
                    <img src={maplogo} alt=""/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a visita :)</p>

                </header>
                <footer>
                    <strong>Rio Grande do Norte</strong>
                    <span>São Miguel</span>
                </footer>
            </aside>
            <Map 
            center={[-6.2141753,-38.4958464]}
            zoom={15}
            style={{width:'100%',height:'100%'}}
            className='map-container'
            >
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
                {orphanages.map(orphanage =>{
                    return (
                            <Marker
                                icon={happyMapIcon}
                                position={[orphanage.latitude, orphanage.longitude]}
                                key={orphanage.id}
                            >
                                <Popup closeButton={false} minWidth={248} maxWidth={240} className='map-popup'>
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color='FFF'/>
                                    </Link>
                                </Popup>
                            </Marker>
                            
                    )
                })}
                
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}
export default OrphanageMap;