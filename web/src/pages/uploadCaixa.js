import { useHistory } from "react-router-dom";
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'
import '../styles/pages/CriarUser.css';
import Sidebar from "../components/Sidebar";

const text = {
  fontWeight: "bold",
   cursor: "pointer",
   textAlign:"center",
   fontSize: "0.7em",
   color: "#000000",
   flexDirection: "row",
   marginLeft:'17px',
   marginRight:'17px',
   marginTop:'10px' 
  }  

export default function UploadFile(props) {

  const history = useHistory()

  const [file, setFile] = useState('')
  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')
  const [name, setName] = useState('')

  useEffect(()=>{
    //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
     api.get(`/agencia/${props.match.params.id}`)
  .then( todo=> {
    setName(todo.data.name)
  }
  );
  },[])

  async function handleSubmit() {

    console.log(file)
    let formData = new FormData();
      formData.append('caixa', file);
      formData.append('dia',dia);
      formData.append('mes',mes);
      formData.append('ano',ano);
    const response = await api.put(`/agencia/doc/${props.match.params.id}`,
        formData, { 
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        } 
      )
    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Enviou um novo arquivo para a agencia "+props.match.params.id
      })
      alert('Upload realizada com sucesso!!')
      history.push(`/agencia/doc/${props.match.params.id}/${name}/${props.match.params.registro}`)
    }else{
      alert(response.statusText)
    }
  }

  return (
    <div id="page-CreateUser">

    <Sidebar />

      <main>
      <div className="create-ADM-form" >
          <fieldset>
  <legend>Novo Caixa -{'>'} {name}</legend>
            
            <div className="input-block"> 
              <label htmlFor="tipoValidade">Dia</label>
              <input id="tipoValidade" 
              value={dia} 
              onChange={event => setDia(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="numeroC">Mês</label >
              <input id="senha"
              value={mes} 
              onChange={event => setMes(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="numeroC">Ano</label >
              <input id="senha"
              value={ano} 
              onChange={event => setAno(event.target.value)} />
            </div>

            <StyledDropZone
            onDrop={(file, text) => setFile(file)}
            >
            <div>
            {
             !file ?
              'Adicione o caixa aqui' :
             <h2 style={text}> {file.name}</h2>
            }
           </div>
              </StyledDropZone>

            <button onClick={handleSubmit}  className="confirm-button"  type="submit">
            Confirmar
          </button>
          </fieldset>

          
        </div>
      </main>
    </div>
  );
}
