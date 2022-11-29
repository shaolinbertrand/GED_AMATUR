
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

   

     
function AdministradoresMap(){
    const [list, setList] = useState([]);
 const history = useHistory()
 const [verifica,setVerifica] = useState('')

   const teste = api.get(`verificaP/?id=${localStorage.getItem('id_login')}`)
    .then((todo)=>setVerifica(todo.data))
   const PermissaoCriar = verifica.ListarAgencia
   console.log(PermissaoCriar)
   if (PermissaoCriar == false){
    
    alert("permissao negada")
    history.push('/admin/inicial')
   }
    useEffect(()=>{
        const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
            acao:"Visualizou Todas as Agencias "
          })
    
        api.get("agencia/cadastradas")
      .then((todo)=> setList(todo.data));
    },[])
   
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
                  <h2 >Agências</h2>

                  <ul>  
                {list.map(agencia => (
                        <div  className="lista"  >
                           
                            <span className="nome">{agencia.name}</span>
                            <span>
                                <Link to={`/agencia/${agencia._id}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="VISUALIZAR">
                                        <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                                <Link to={`/editAgencia/${agencia._id}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="EDITAR">
                                        <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                            
                                <Link to={`/Agenciadoc/${agencia._id}/${agencia.name}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="CAIXAS">
                                        <BiArchive size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                                <Link to={`/uploadCaixa/${agencia._id}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="ENVIAR CAIXA">
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