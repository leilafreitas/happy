import React, { FormEvent,ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import SideBar from './SideBar';
import { FiPlus } from "react-icons/fi";
import '../styles/pages/create-orphanage.css';
import happyMapIcon from "../utils/mapIcon";
import api from '../services/api';
import { useState } from "react";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  //let [orphanages,setOrphanages]=useState<Orphanage[]>([]);
  const history=useHistory();
  const [name,setName]=useState('');
  const[about,setAbout] =useState('');
  const [instructions,setInstructions]=useState('');
  const[open_on_weekends,setOpen_on_weekends]=useState(false);
  const[opening_hours, setOpen_hours]=useState('');
  const[position,setPosition] = useState({latitude:0,longitude:0});
  const[images,setFiles]=useState<File[]>([]);
  const[previewImages,setPreview]=useState<string[]>([]);
  /*useEffect(()=>{
      api.post('orphanages').then(response=>{
          setOrphanages(response.data);
      })
  }    
  ,[]);*/
  function handleMapClick(event: LeafletMouseEvent){
    const{lat,lng}=event.latlng;
    setPosition({
      latitude:lat,
      longitude:lng
    })
  }
  async function handleSubmit(event:FormEvent){
    event.preventDefault();
    const{latitude,longitude}=position;
    const data= new FormData();
    data.append('name',name);
    data.append('latitude',String(latitude));
    data.append('longitude',String(longitude));
    data.append('about',about);
    data.append('instructions',instructions);
    data.append('open_on_weekends',String(open_on_weekends));
    data.append('opening_hours',opening_hours);
    images.forEach(image=>{
      data.append('images',image)
    });
    await api.post('orphanages',data);
    alert('Cadastro realizado com Sucesso');
    history.push('/map');

  }
  function handleSelectImages(event:ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }
    const selectedImages=Array.from(event.target.files);
    setFiles(selectedImages);
    const selectedImagesPreviw= selectedImages.map(image =>{
      return URL.createObjectURL(image);
    })
    setPreview(selectedImagesPreviw);

  }
  return (
    <div id="page-create-orphanage">
      <SideBar/>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
            <Map 
              center={[-6.2141753,-38.4958464]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {position.latitude !== 0 
              && <Marker interactive={false} icon={happyMapIcon} position={[position.latitude,position.longitude]} />}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e=>setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={e=>setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(image=>{
                    return (
                      <img src={image} alt="" key={image}/>
                    )
                  })
                }
              <label htmlFor='image[]' className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions"  value={instructions} onChange={e=>setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e=>setOpen_hours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends? "active":''} onClick={()=>setOpen_on_weekends(true)}>Sim</button>
                <button type="button" className={!open_on_weekends? "active":''} onClick={()=>setOpen_on_weekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;