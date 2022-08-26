import React from 'react';
import {BiLogIn} from 'react-icons/bi'
import '../styles/pages/inicial.css';
import logoImg from '../images/logo.png';
import { Link } from 'react-router-dom';
function Inicial(){
    return(
        <div id="page-inicial">
            <div className="content-wrapper">
                <img src={logoImg} className="CRA-RR"/>
        
                <main>
                    <h1>Gestão Eletronica de Documentos</h1>
                    <p>Sistema de Arquivos CRA-RR</p>
                </main>

                <div className='location'>
                    <strong>Boa Vista</strong>
                    <span>Roraima</span>
                </div>
                <Link to="/login" className="enter-app">
                    <BiLogIn size={26} color="rgba(0, 0, 0, 0.6)"/>
                </Link>
            </div>
        </div>
    );
}

export default Inicial;