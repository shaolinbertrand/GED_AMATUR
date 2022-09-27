import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import '../styles/pages/CriarAdm.css';
import Sidebar from "../components/Sidebar";



 function CreateUser() {

  const history = useHistory()

  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')
  const [documento, setdocumento] = useState([])
  
  
  async function handleSubmit() {


    const response = await api.post('/novaFolha',  {
      mes: mes,
      ano: ano,
    })

    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Realizou Cadastro da Agencia "+mes
      })
      alert('Cadastro realizado com sucesso!!')
      history.push('/listarFolhaPagamentos')
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
            <legend>Dados da Folha</legend>

            <div className="input-block">
              <label htmlFor="name">Mês</label>
              <input id="mes" 
              value={mes} 
              onChange={event => setMes(event.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="name">Ano</label>
              <input id="ano" 
              value={ano} 
              onChange={event => setAno(event.target.value)} />
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