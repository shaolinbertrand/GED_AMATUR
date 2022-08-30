
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/pages/CriarUser.css';
import {BsWrench} from 'react-icons/bs';
import {BsEye} from 'react-icons/bs'
import {BiPaperclip} from  'react-icons/bi';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';


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

    useEffect(()=>{
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Visualizou Documentos do Registrado "+props.match.params.name
      })
        api.get(`adm/doc/${props.match.params.id}`)
      .then((todo)=> setList(todo.data));
    },[])

    function irPraUrl(url) {
        window.location.href=url;
      }
      function savePdf() {
        var data = new Date
        var doc = new jsPDF()
        doc.text(`Eu ${localStorage.getItem('nome')} colaborador(a) do Conselho Regional de Admininstração de\nRoraima no cargo ${localStorage.getItem('cargo')} afirmo ter digitalizado todas as pastas \nem anexo  dando veracidade nos documentos do(a) registrado(a) \n${props.match.params.name} portador do registro ${props.match.params.registro}\nconferida em ${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()} às ${data.getHours()}:${data.getMinutes()} `, 0, 20, 'left');
  
        doc.save("Documento de Autenticidade Assinado.pdf");
  
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
                       </div>
                       ))}                  
                </ul>
                <div onClick={() => savePdf()} style={listStyle}  > 
                         <span style={text}>Documento de autenticidade </span>      
                 </div>
                <div>
                    <Link to={`/adm/${props.match.params.id}`} className="mostrar_dados">
                      <button type="button" className= "botao">
                        <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                      </button>
                    </Link>
                    <Link to={`/admin/editadm/${props.match.params.id}`} className="mostrar_dados">
                      <button type="button" className= "botao">
                        <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                      </button>
                    </Link>
                    <Link to={`/upload/${props.match.params.id}/${props.match.params.registro}`} className="mostrar_dados">
                      <button type="button" className= "botao">
                        <BiPaperclip size={26} color="rgba(0, 0, 0, 0.6)"/>
                      </button>
                    </Link>
                </div>
                  </div>
               
            </div>
        )   
        

 //adm/cadastrados

};

export default DocumentosMap;