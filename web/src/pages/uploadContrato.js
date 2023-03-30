import { useHistory } from "react-router-dom";
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'
import '../styles/pages/CriarUser.css';
import Sidebar from "../components/Sidebar";
import {CircularProgressbar} from "react-circular-progressbar";

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
  const [tipoValidade, setTipoV] = useState('')
  const [numero, setNumero] = useState('')
  const [name, setName] = useState('')
  const [progress,setProgress] = useState(0)

  useEffect(()=>{
     api.get(`/empresa/${props.match.params.id}`)
  .then( todo=> {
    setName(todo.data.name)
  }
  );
  },[])

  async function handleSubmit() {

    console.log(file)
    let formData = new FormData();
      formData.append('contrato', file);
      formData.append('tipoValidade',tipoValidade);
      formData.append('numero',numero);
    const response = await api.put(`/empresa/doc/${props.match.params.id}`,
        formData, { 
          onUploadProgress: e => {
            const progress = parseInt(Math.round((e.loaded * 100) / e.total));
            setProgress(progress)
          },
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        } 
      )
    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Enviou um novo arquivo para o Contrato "+props.match.params.id
      })
      alert('Upload realizada com sucesso!!')
      history.push(`/Empresadoc/${props.match.params.id}/${name}/${props.match.params.registro}`)
    }else{
      alert(response.statusText)
    }
  }

  return (
    <div id="page-CreateUser">

    <Sidebar />

      <main>
      <div className="create-form" >
          <fieldset>
  <legend>Novo Contrato {name}</legend>
            
            <div className="input-block"> 
              <label htmlFor="tipoValidade">Tipo de Validade</label>
              <input id="tipoValidade" 
              value={tipoValidade} 
              onChange={event => setTipoV(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="numeroC">Numero de Contrato</label >
              <input id="senha"
              value={numero} 
              onChange={event => setNumero(event.target.value)} />
            </div>

            <StyledDropZone
            onDrop={(file, text) => setFile(file)}
            >
            <div>
            {
             !file ?
              'Adicione o contrato aqui' :
             <h2 style={text}> {file.name}</h2>
            }  
           </div>
              </StyledDropZone>
<<<<<<< Updated upstream
              <div style={{ width: 200, height: 200}} className="barra-de-progresso">
                <CircularProgressbar
                      styles={{
                        root: { width: 300 },
                        path: { stroke: "#7159c1" }
                      }}
                      value={progress}
                      strokeWidth={10}
                      text={`${progress}%`}
                  />
          </div>
            <button onClick={handleSubmit}  className="confirm-button"  type="submit">
              Confirmar
            </button>
=======
          <div style={{ width: 200, height: 200}} className="barra-de-progresso">
            <CircularProgressbar
                  styles={{
                    root: { width: 300 },
                    path: { stroke: "#7159c1" }
                  }}
                  value={progress}
                  strokeWidth={10}
                  text={`${progress}%`}
            />
          </div>
          <button onClick={handleSubmit}  className="confirm-button"  type="submit">
            Confirmar
          </button>
>>>>>>> Stashed changes
          </fieldset>
        </div>
      </main>
    </div>
  );
}
