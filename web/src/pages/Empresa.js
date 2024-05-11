
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import {BiArchive} from 'react-icons/bi';
import {BsWrench} from 'react-icons/bs'
import {BiPaperclip} from  'react-icons/bi';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import '../styles/pages/listarUser.css';

const listStyle = {
    boxShadow: '1px 3px 4px grey',
    borderRadius: '16px',
    margin:'10px',
    padding:'10px',
    background:"#ffd666"
     } 

const text = {
    fontWeight: "bold",
     textAlign:"center",
     fontSize: "0.8em",
     color: "#000000",
     marginLeft:'17px',
     marginRight:'17px',
     marginTop:'10px' 
    }    

     
 
function Adm(props){
         const [user, setList] = useState([]);
        //const user = api.get(`/usuario/${props.match.params.id}`)
        useEffect(()=>{
            //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
            api.get(`/empresa/${props.match.params.id}`)
            .then(todo => {
            setList(todo.data)
            const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
              acao:"visualizou dados da Empresa "+todo.data.name
            })
           }
            );
        },[])
        console.log(props.id)
        return (
            
            <div id="page-listUser">
                  <Sidebar/>
                  <div className="list-user-form" >
                  <h2 style={text}>Empresa</h2>

                  
                    <div  style={listStyle}  >
                        <h2 style={text}>Nome: {user.name}</h2>
                        <h2 style={text}>Área: {user.area}</h2>
                        <Link to={`/editEmpresa/${props.match.params.id}`} className="mostrar_dados">
                            <button type="button" className= "botao">
                                <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                            </button>
                        </Link>
                        <Link to={`/Empresadoc/${props.match.params.id}/${user.name}`} className="mostrar_dados">
                          <button type="button" className= "botao">
                              <BiArchive size={26} color="rgba(0, 0, 0, 0.6)"/>
                          </button>
                        </Link>
                        <Link to={`/uploadContrato/${props.match.params.id}/`} className="mostrar_dados">
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

export default Adm;