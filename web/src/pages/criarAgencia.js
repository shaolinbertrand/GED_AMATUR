import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import '../styles/pages/CriarAdm.css';
import Sidebar from "../components/Sidebar";



 function CreateUser() {

  const history = useHistory()

  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const [documento, setdocumento] = useState([])
  
  
  async function handleSubmit() {


    const response = await api.post('/novaAgencia',  {
      name: name,
    })

    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Realizou Cadastro da Agencia "+name
      })
      alert('Cadastro realizado com sucesso!!')
      history.push('/admin/listarEmpresa')
    }else{
      alert(response.statusText)
    }
 
  }

  return (
    <div id="page-CreateADM">

    <Sidebar />

      <main>
        <div className="create-ADM-form" >
          <fieldset>
            <legend>Dados da Agência</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
              value={name} 
              onChange={event => setName(event.target.value)} />
            </div>

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