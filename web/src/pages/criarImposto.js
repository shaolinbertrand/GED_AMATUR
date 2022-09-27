import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import { StyledDropZone } from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'
import '../styles/pages/FormCriar.css';
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

 function CreateUser() {

  const history = useHistory()

  const [periodo, setPeriodo] = useState('')
  const [NumParc, setNumParc] = useState('')
  const [file, setFile] = useState('')
  
  
  async function handleSubmit() {

    let formData = new FormData();
      formData.append('imposto', file);
      formData.append('periodo',periodo);
      formData.append('NumParc',NumParc);

    const response = await api.post('/novoImposto', 
        formData, { 
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } 
    )

    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Realizou Cadastro do Imposto"+periodo
      })
      alert('Cadastro realizado com sucesso!!')
      history.push('/listarImposto')
    }else{
      alert(response.statusText)
    }
 
  }

  return (
    <div id="page-Create">

    <Sidebar />

      <main>
        <div className="create-form" >
          <fieldset>
            <legend>Dados do Imposto</legend>

            <div className="input-block">
              <label htmlFor="periodo">Periodo</label>
              <input id="periodo" 
              value={periodo} 
              onChange={event => setPeriodo(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="NumParc">Numero de Parcelamentos</label >
              <input id="NumParc"
              value={NumParc} 
              onChange={event => setNumParc(event.target.value)} />
            </div>

            <StyledDropZone
            onDrop={(file, text) => setFile(file)}
            >
                <div>
                    {
                        !file ?
                        'Adicione o Imposto aqui' :
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

export default CreateUser;