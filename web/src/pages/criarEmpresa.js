import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import '../styles/pages/FormCriar.css';
import Sidebar from "../components/Sidebar";



 function CreateUser() {

  const history = useHistory()

  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const [documento, setdocumento] = useState([])
  
  
  async function handleSubmit() {


    const response = await api.post('/novaEmpresa',  {
      name: name,
      area: area,
    })

    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Realizou Cadastro da Empresa "+name
      })
      alert('Cadastro realizado com sucesso!!')
      history.push('/admin/listarEmpresa')
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
            <legend>Dados da Empresa</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
              value={name} 
              onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="area">Área</label >
              <input id="area"
              value={area} 
              onChange={event => setArea(event.target.value)} />
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