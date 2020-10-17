import React from 'react';
import '../styles/pages/landing.css';
import logo from '../images/logo.svg';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
function landing(){
    return(
        <div id="page-landing">
      <div className="content-wrapper">
        <img src={logo} alt="Harry"/>
        <main>
          <h1>
            Leve felicidade para o mundo
          </h1>
          <p>
            Visite orfanatos e mude o dia de muitas crianças
          </p>
        </main>
        <div className="location">
            <strong>Rio Grande do Norte</strong>
            <span>São Miguel</span>
        </div>
        <Link to="/map" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
        </Link>
      </div>
    </div>
    );
}
export default landing;