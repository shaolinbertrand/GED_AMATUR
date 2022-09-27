
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import {BiSelectMultiple} from  'react-icons/bi';
import {BsTrash} from 'react-icons/bs';
import {BsWrench} from 'react-icons/bs';
import Sidebar from '../components/Sidebar'
import '../styles/pages/listarUser.css';
import { Link } from "react-router-dom";

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

     
 
function User(props){
         const [user, setList] = useState([]);
        //const user = api.get(`/usuario/${props.match.params.id}`)
        useEffect(()=>{
          
            //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
            api.get(`/usuario/${props.match.params.id}`)
          .then(todo => {
            setList(todo.data)
            const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
              acao:"visualizou dados do Usuário "+todo.data.nome
            })
          }
            );
        },[])
        console.log(props.id)
        return (
            
            <div id="page-listUser">
                  <Sidebar/>
                  <div className="list-user-form" >
                  <h2 style={text}>USUÁRIO</h2>

                  
                    <div  style={listStyle}  >
                        <h2 style={text}>Nome: {user.nome}</h2>
                        <h2 style={text}>CPF: {user.CPF}</h2>
                        <h2 style={text}>Cargo: {user.cargo}</h2>
                        <h2 style={text}>Setor: {user.setor}</h2>

                        <Link to={`/log/${user._id}`} className="mostrar_dados">
                          <button type="button" className= "botaolist" title="MOSTRAR LOG">
                            <BiSelectMultiple size={26} color="rgba(0, 0, 0, 0.6)"/>
                          </button>
                        </Link>

                        <Link to={`/TI/edituser/${user._id}`} className="atualizar_dados">
                          <button type="button" className= "botaolist" title="ALTERAR DADOS">
                            <BsWrench size={26} color="gray"/>
                          </button>
                        </Link>

                        <button type="button" className= "botaolist" title="EXCLUIR">
                          <BsTrash size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                                    
                    </div>                  
                  </div>
               
            </div>
        )   
        

 //adm/cadastrados

};

export default User;