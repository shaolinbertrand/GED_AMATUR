
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import '../styles/pages/listarFP.css';
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
            acao:"Visualizou Folhas de Pagamento "
          })
    
        api.get("folhas/cadastradas")
      .then((todo)=> setList(todo.data));
    },[])
    const history = useHistory()
    const [busca, setBusca] = useState('');
    async function handleSubmit() {


        const response = await api.get(`/buscarADM?usuario=${busca}`)
    
        if(response.status == 200){
          alert('Folha de Pagamento encontrada')
          history.push(`/adm/${response.data._id}`)
        }else{
          alert(response.statusText)
        }
     
      }
    
        return (
            
            <div id="page-FP">
                <Sidebar/>
                <div className="FP-form" >
                <div>
                    
                        <div className="input-block">
                            <h2 style={text}>Qual Mês Deseja? </h2>
                            <select id="busca" name="busca"  onChange={event => setBusca(event.target.value)}>
		                        <option value='1'>Janeiro</option>
		                        <option value='2'>Fevereiro</option>
		                        <option value='3'>Março</option>
                                <option value='4'>Abril</option>
                                <option value='5'>Maio</option>
                                <option value='6'>Junho</option>
                                <option value='7'>Julho</option>
                                <option value='8'>Agosto</option>
                                <option value='9'>Setembro</option>
                                <option value='10'>Outubro</option>
                                <option value='11'>Novembro</option>
                                <option value='12'>Dezembro</option>
	                        </select>
                        
                        
                    
                    <button onClick={handleSubmit}  type="submit" className= "botaoBuscar">
                        Buscar
                    </button>
                    </div>
                </div>
                  <h2 style={text}>Folha de Pagamento</h2>

                  <ul>  
                {list.map(folha => (
                        <div  style={listStyle}  >
                           
                            
                            <span style={text}>{folha.mes}</span>
                            <span style={text}>{folha.ano}</span>
                            <span>
                                <Link to={`/Folhadoc/${folha._id}/${folha.mes}`} className="mostrar_dados">
                                    <button type="button" className= "botao">
                                        <BiArchive size={26} color="rgba(0, 0, 0, 0.6)"/>
                                    </button>
                                </Link>
                                <Link to={`/uploadDocumento/${folha._id}`} className="mostrar_dados">
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
        

 //adm/cadastrados

};

export default AdministradoresMap;