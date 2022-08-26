
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/pages/listarUser.css';
import {BsWrench} from 'react-icons/bs';
import {BiArchive} from 'react-icons/bi';
import {BsEye} from 'react-icons/bs'
import {BiPaperclip} from  'react-icons/bi';
import { Link } from "react-router-dom";

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

     
 //`/adm/${adm._id}/${adm.name}`
function AdministradoresMap(){
    const [list, setList] = useState([]);

    useEffect(()=>{
        api.get("adm/cadastrados")
      .then((todo)=> setList(todo.data));
    },[])
    
        return (
            
            <div id="page-CreateUser">
                  <Sidebar/>
                  <div className="create-user-form" >
                  <h2 style={text}>ADMINISTRADORES</h2>

                  <ul>  
                {list.map(adm => (
                        <div  style={listStyle}  >
                        
                           <span style={text}>{adm.name}</span>
                           <Link to={`/adm/${adm._id}`} className="mostrar_dados">
                                <button type="button" className= "botao">
                                    <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                                </button>
                            </Link>
                            
                            <button type="button" className= "botao">
                                <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                            </button>
                            <Link to={`/doc/${adm._id}/${adm.name}`} className="mostrar_dados">
                            <button type="button" className= "botao">
                                <BiArchive size={26} color="rgba(0, 0, 0, 0.6)"/>
                            </button>
                            </Link>
                            
                            <button type="button" className= "botao">
                                <BiPaperclip size={26} color="rgba(0, 0, 0, 0.6)"/>
                            </button>
                        
                           
                       </div>
                       ))}                  
                </ul>
                  </div>
               
            </div>
        )   
        

 //adm/cadastrados

};

export default AdministradoresMap;