
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import {BsWrench} from 'react-icons/bs';
import {BsEye} from 'react-icons/bs';
import {BsTrash} from 'react-icons/bs';
import Sidebar from '../components/Sidebar'
import '../styles/pages/listarUser.css';
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

     
 
function User(){
    const [list, setList] = useState([]);

    useEffect(()=>{
        const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
            acao:"Visualizou Usuários Inativos "
          })
        api.get(`usuariosinativos?id=${localStorage.getItem('id_login')}`)
      .then((todo)=> setList(todo.data));
    },[])
    
        return (
            
            <div id="page-CreateUser">
                  <Sidebar/>
                  <div className="create-user-form" >
                  <h2 style={text}>USUÁRIOS</h2>
                    <Link to='/admin/users'>
                        <button type="button" className= "botao">
                            Ativos
                        </button>
                    </Link>
                    <Link to='/admin/users'>
                        <button type="button" className= "botao">
                            Todos
                        </button>
                    </Link>
                  <ul>  
                {list.map(user => (
                        <div  style={listStyle}  >
                           <span style={text}>{user.nome}</span>
                            <Link to='user' className="atualizar_dados">
                                <button type="button" className= "botao">
                                    <BsWrench size={26} color="gray"/>
                                </button>
                            </Link>
                            <Link to={`/admin/user/${user._id}`} className="mostrar_dados">
                                <button type="button" className= "botao">
                                    <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                                </button>
                            </Link>
                                <button type="button" className= "botao">
                                    <BsTrash size={26} color="rgba(0, 0, 0, 0.6)"/>
                                </button>
                           
                       </div>
                       ))}                  
                </ul>
                  </div>
               
            </div>
        )   
        

 

};

export default User;