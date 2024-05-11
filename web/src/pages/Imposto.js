
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import {BsEye} from 'react-icons/bs'
import {BsWrench} from 'react-icons/bs'
import { BsTrash } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import { useHistory } from "react-router-dom";
import '../styles/pages/CriarUser.css';

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

    function irPraUrl(url) {
        window.location.href=url;
      }
 
function Adm(props){
         const [imposto, setList] = useState([]);
         const history = useHistory()
        //const user = api.get(`/usuario/${props.match.params.id}`)
        useEffect(()=>{
            //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
            api.get(`/imposto/${props.match.params.id}`)
            .then(todo => {
            setList(todo.data)
            const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
              acao:"visualizou dados do Imposto "+todo.data.name
            })
           }
            );
        },[])
        async function ApagarDoc(docID) {
            const response = await api.delete(`/imposto/${docID}`)
            if(response.status == 200){
              const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
                acao:"Apagou o Imposto "+props.match.params.name
              })
              alert('Arquivo deletado com sucesso!!')
              history.push("/listarImposto")
            }else{
              alert(response.statusText)
            }
          
          }
        console.log(props.id)
        return (
            
            <div id="page-CreateUser">
                  <Sidebar/>
                  <div className="create-user-form" >
                  <h2 style={text}>IMPOSTO</h2>

                  
                    <div  style={listStyle}  >
                        <h2 style={text}>Nome: {imposto.name}</h2>
                        <h2 style={text}>Periodo: {imposto.periodo}</h2>
                        <h2 style={text}>Nº de Parcelas: {imposto.NumParc}</h2>

                        <button onClick={() => irPraUrl(imposto.url)} type="button" className= "botao">
                            <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>

                        <Link to={`/editImposto/${props.match.params.id}`} className="mostrar_dados">
                            <button type="button" className= "botao">
                                <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                            </button>
                        </Link>
                        <button onClick={() => ApagarDoc(imposto._id)} type="button" className="botao">
                                <BsTrash size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>                         
                    </div>                  
                  </div>
               
            </div>
        )   
        

 //adm/cadastrados

};

export default Adm;