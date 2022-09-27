
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/pages/CriarUser.css';
import {BsWrench} from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import {BiPaperclip} from  'react-icons/bi';
import { Link } from 'react-router-dom';


const listStyle = {
    cursor: "pointer",
    boxShadow: '1px 3px 4px grey',
    borderRadius: '16px',
    margin:'10px',
    padding:'10px',
    flexDirection:'row',
    justifyContent:'space-between',
    height: '50px',
    background:"#ffd666"
     } 

const text = {
    fontWeight: "bold",
     cursor: "pointer",
     textAlign:"center",
     fontSize: "0.8em",
     color: "#000000",
     flexDirection: "row",
     marginLeft:'17px',
     marginRight:'17px',
     marginTop:'10px' 
    }    

     
 
function DocumentosMap(props){
    const [list, setList] = useState([]);
    console.log(props.match.params.id)
    useEffect(()=>{
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Visualizou Contratos da Empresa "+props.match.params.name
      })
        api.get(`folha/doc/${props.match.params.id}`)
      .then((todo)=> setList(todo.data));
    },[])

    function irPraUrl(url) {
        window.location.href=url;
      }

    <div id="page-print">
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
        return (
          
            
            <div id="page-CreateUser">
                  <Sidebar/>
                  <div className="create-user-form" >
                  <h2 style={text} >{props.match.params.name}</h2>

                  <ul>  
                {list.map(doc => (
                        <div onClick={() => irPraUrl(doc.url)} style={listStyle}  > 
                         <span style={text}>{doc.name}</span>
                         <span style={text}>{doc.DataUpload}</span> 
                       </div>
                       ))}                  
                </ul>

                    <Link to={`/editEmpresa/${props.match.params.id}`} className="mostrar_dados">
                      <button type="button" className= "botao">
                        <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                      </button>
                    </Link>
                    <Link to={`/uploadDocumento/${props.match.params.id}`} className="mostrar_dados">
                      <button type="button" className= "botao">
                        <BiPaperclip size={26} color="rgba(0, 0, 0, 0.6)"/>
                      </button>
                    </Link>
                </div>
                  </div>
        )   

};

export default DocumentosMap;