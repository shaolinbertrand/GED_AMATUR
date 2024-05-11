
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import '../styles/pages/CriarUser.css';


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

     
 
function LogsMap(props){
    const [list, setList] = useState([]);

    useEffect(()=>{
        api.get(`listaLog/${props.match.params.id}`)
      .then((todo)=> setList(todo.data));
    },[])
    
        return (
            
            <div id="page-CreateUser">
                  <Sidebar/>
                  <div className="create-user-form" >

                  <ul>  
                {list.map(log => (
                    <div>
                        <h2 style={text}>User {log.nome}</h2>
                        <h3 style={text}>No dia {log.dia}</h3>
                        <h3 style={text}>Ás {log.hora}</h3>
                        <h3 style={text}>{log.acao}</h3>
                        <hr/>
                    </div>
                         
                       ))}                  
                </ul>
                  </div>
               
            </div>
        )   
        

 //adm/cadastrados

};

export default LogsMap;