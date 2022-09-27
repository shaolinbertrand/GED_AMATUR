
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
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

     
function AdministradoresMap(){
    const [list, setList] = useState([]);

    useEffect(()=>{
        const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
            acao:"Visualizou Todas as Agencias "
          })
    
        api.get("agencia/cadastradas")
      .then((todo)=> setList(todo.data));
    },[])
    const history = useHistory()
    const [busca, setBusca] = useState('');
    async function handleSubmit() {


        const response = await api.get(`/buscarADM?usuario=${busca}`)
    
        if(response.status == 200){
          alert('Agencia encontrado')
          history.push(`/adm/${response.data._id}`)
        }else{
          alert(response.statusText)
        }
     
      }
    
        return (
            
            <div id="page-CreateUser">
                <Sidebar/>
                <div className="create-user-form" >
                <div>
                    <fieldset>
                        <div className="input-block">
                            <h2 style={text}>Busca</h2>
                            <input id="busca" 
                                value={busca} 
                                onChange={event => setBusca(event.target.value)} />
                        </div>
                    </fieldset>
                    <button onClick={handleSubmit}  type="submit" className= "botaoBuscar">
                        Buscar
                    </button>
                </div>
                  <h2 style={text}>Agências</h2>

                  <ul>  
                {list.map(agencia => (
                        <div  style={listStyle}  >
                           
                            <span style={text}>{agencia.name}</span>
                            <span>
                                <Link to={`/agencia/${agencia._id}`} className="mostrar_dados">
                                    <button type="button" className= "botao">
                                        <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                                <Link to={`/admin/editadm/${agencia._id}`} className="mostrar_dados">
                                    <button type="button" className= "botao">
                                        <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                            
                                <Link to={`/Agenciadoc/${agencia._id}/${agencia.name}`} className="mostrar_dados">
                                    <button type="button" className= "botao">
                                        <BiArchive size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                                <Link to={`/uploadCaixa/${agencia._id}`} className="mostrar_dados">
                                    <button type="button" className= "botao">
                                        <BiPaperclip size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                            </span>
                        
                           
                       </div>
                       ))}                  
                </ul>
                  </div>
               
            </div>
        )   
        

};

export default AdministradoresMap;