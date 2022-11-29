import api from "../services/api";
import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import '../styles/pages/listar.css';
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
        const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
            acao:"Visualizou Todos os Impostos "
          })
    
        api.get("impostos/cadastrados")
      .then((todo)=> setList(todo.data));
    },[])
    const history = useHistory()
    const [busca, setBusca] = useState('');
    const [verifica,setVerifica] = useState('')

    const teste = api.get(`verificaP/?id=${localStorage.getItem('id_login')}`)
     .then((todo)=>setVerifica(todo.data))
    const PermissaoCriar = verifica.ListarImposto
    console.log(PermissaoCriar)
    if (PermissaoCriar == false){
     
     alert("permissao negada")
     history.push('/admin/inicial')
    }

    async function handleSubmit() {


        const response = await api.get(`/buscarADM?usuario=${busca}`)
    
        if(response.status == 200){
          alert('Imposto encontrado')
          history.push(`/adm/${response.data._id}`)
        }else{
          alert(response.statusText)
        }
     
      }
    
        return (
            
            <div id="page-list">
                <Sidebar/>
                <div className="list-form" >
                <div>
                    <fieldset>
                        <div className="input-block">
                            <h2 >Busca</h2>
                            <input id="busca" 
                                value={busca} 
                                onChange={event => setBusca(event.target.value)} />
                        </div>
                    </fieldset>
                    <button onClick={handleSubmit}  type="submit" className= "botaoBuscar">
                        Buscar
                    </button>
                </div>
                  <h2>IMPOSTOS</h2>

                  <ul>  
                {list.map(imposto => (
                        <div  className="lista"  >
                           
                            <span className="nome">{imposto.name}</span>
                            <span>
                                <Link to={`/imposto/${imposto._id}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="VISUALIZAR">
                                        <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                                <Link to={`/editImposto/${imposto._id}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="EDITAR">
                                        <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                            
                            </span>
                        
                           
                       </div>
                       ))}                  
                </ul>
                  </div>
               
            </div>
        )   
        

 //adm/cadastrados

};

export default AdministradoresMap;