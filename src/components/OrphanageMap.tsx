import React from 'react';
import maplogo from '../images/logohappy.svg';
import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import{Map,TileLayer} from 'react-leaflet';
import '../styles/pages/orphanagesmap.css';
import 'leaflet/dist/leaflet.css';
function OrphanageMap(){
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
            >
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
            </Map>
            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}
export default OrphanageMap;