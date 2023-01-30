
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import { useHistory } from "react-router-dom";
import '../styles/pages/CriarUser.css';
import {BsWrench} from 'react-icons/bs';
import {BsEye} from 'react-icons/bs'
import {BiPaperclip} from  'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
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

     
 
function DocumentosMap(props){
    const [list, setList] = useState([]);
    console.log(props.match.params.id)
    useEffect(()=>{
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Visualizou Contratos da Empresa "+props.match.params.name
      })
        api.get(`empresa/doc/${props.match.params.id}`)
      .then((todo)=> setList(todo.data));
    },[])

    function irPraUrl(url) {
        window.location.href=url;
      }
    async function ApagarDoc(docID) {
      const [verifica,setVerifica] = useState('')
      const history = useHistory()

      const teste = api.get(`verificaP/?id=${localStorage.getItem('id_login')}`)
       .then((todo)=>setVerifica(todo.data))
      const PermissaoCriar = verifica.Excluir
      console.log(PermissaoCriar)
      if (PermissaoCriar == false){
       
       alert("permissao negada")
       history.push('/admin/inicial')
      }else{
        const response = await api.delete(`/empresa/doc/${docID}`)
        if(response.status == 200){
          const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
            acao:"Apagou Caixa da Agencia "+props.match.params.name
          })
          alert('Arquivo deletado com sucesso!!')
          window.location.reload(true)
        }else{
          alert(response.statusText)
        }
      }
      }   

        return (
          
            
            <div id="page-CreateUser">
                  <Sidebar/>
                  <div className="create-user-form" >
                  <h2 style={text} >{props.match.params.name}</h2>

                  <ul>  
                {list.map(doc => (
                        <div className="lista"  > 
                         <span className="numeracao">{doc.numero}</span> 
                         <span className="nomedoc">{doc.name}</span>
                         <span className="descricao">{doc.tipoValidade}</span>
                         <button onClick={() => ApagarDoc(doc.id)} type="button" className="botao-list" title= "EXCLUIR DOC">
                                <BsTrash size={26} color="rgba(0, 0, 0, 0.6)"/>
                          </button>
                          <button onClick={() => irPraUrl(doc.url)} type="button" className="botao-list" title= "VISUALIZAR DOC">
                                <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                          </button>
                       </div>
                       ))}                  
                </ul>

                    <Link to={`/empresa/${props.match.params.id}`} className="mostrar_dados">
                      <button type="button" className= "botao" title= "VISUALIZAR EMPRESA">
                        <BsEye size={26} color="rgba(0, 0, 0, 0.6)"/>
                      </button>
                    </Link>
                    <Link to={`/editEmpresa/${props.match.params.id}`} className="mostrar_dados" title= "EDITAR EMPRESA">
                      <button type="button" className= "botao">
                        <BsWrench size={26} color="rgba(0, 0, 0, 0.6)"/>
                      </button>
                    </Link>
                    <Link to={`/uploadContrato/${props.match.params.id}`} className="mostrar_dados" title= "ENVIAR CONTRATO">
                      <button type="button" className= "botao">
                        <BiPaperclip size={26} color="rgba(0, 0, 0, 0.6)"/>
                      </button>
                    </Link>
                </div>
                  </div>
        )   

};

export default DocumentosMap;