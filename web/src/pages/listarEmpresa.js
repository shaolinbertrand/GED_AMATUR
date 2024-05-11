
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

    useEffect(()=>{
        const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
            acao:"Visualizou Todas as Empresas"
          })
    
        api.get("empresa/cadastradas")
      .then((todo)=> setList(todo.data));
    },[])
    const history = useHistory()
    const [busca, setBusca] = useState('');
    const [verifica,setVerifica] = useState('')
    const [empresa, setEmpresa] = useState('')
  
        const teste = api.get(`verificaP/?id=${localStorage.getItem('id_login')}`)
    .then((todo)=>setVerifica(todo.data))
   const PermissaoCriar = verifica.ListarEmpresa
   //console.log(PermissaoCriar)
   if (PermissaoCriar == false){
    
    alert("permissao negada")
    history.push('/admin/inicial')
   }
    
   
    async function handleSubmit() {


        const response = await api.get(`/buscarEmpresa?usuario=${busca}`).then((todo)=>setEmpresa(todo.data))
        alert(empresa._id)
        console.log(empresa)
        if(empresa._id !="undefined"){
          alert("Empresa não encontrada")
         
        }else{
            alert("Empresa encontrada")
            history.push(`/empresa/${empresa._id}`)
          
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
                  <h2 >Empresas</h2>

                  <ul>  
                {list.map(empresa => (
                        <div  className="lista"  >
                           
                            <span className="nome">{empresa.name}</span>
                            <span>
                                <Link to={`/empresa/${empresa._id}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="VISUALIZAR">
                                        <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                                <Link to={`/editEmpresa/${empresa._id}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="EDITAR">
                                        <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                            
                                <Link to={`/Empresadoc/${empresa._id}/${empresa.name}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="CONTRATOS">
                                        <BiArchive size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                                <Link to={`/uploadContrato/${empresa._id}/${empresa.registro}`} className="mostrar_dados">
                                    <button type="button" className= "botaolist"  title="ENVIAR CONTRATO">
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