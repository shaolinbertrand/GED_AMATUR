import React from 'react';
import '../styles/pages/inicial.css';
import Sidebar from '../components/Sidebar'
import api from '../services/api';
 function Inicial(props){
    return(
        <div id="page-inicial">
            <Sidebar id={props.match.params.id}/>
                <div className="content-wrapper">
                    <main>
                        <h1>Gestão Eletronica de Documentos</h1>
                        <p>Sistema de Arquivos CRA-RR</p>
                    </main>

                    <div className='location'>
                        <strong>Boa Vista</strong>
                        <span>Roraima</span>
                    </div>
                </div>
        </div>
    );
}

export default Inicial;