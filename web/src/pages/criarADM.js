import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import '../styles/pages/CriarAdm.css';
import Sidebar from "../components/Sidebar";



 function CreateUser() {

  const history = useHistory()

  const [name, setName] = useState('')
  const [registro, setregistro] = useState('')
  const [cpf, setCPF] = useState('')
  const [email, setemail] = useState('não possui')
  const [telefone, setTelefone] = useState('não possui')
  const [documento, setdocumento] = useState([])
  
  
  async function handleSubmit() {


    const response = await api.post('/novoadm',  {
      name: name,
      telefone: telefone,
      registro:registro,
      email:email,
      cpf:cpf
    })

    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Realizou Cadastro do Registrado "+name
      })
      alert('Cadastro realizado com sucesso!!')
      history.push('/admin/listADM')
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
            <legend>Dados do Contrato</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
              value={name} 
              onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="CPF">CPF</label >
              <input id="CPF"
              value={cpf} 
              onChange={event => setCPF(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="registro">N° Registro</label >
              <input id="registro"
              value={registro} 
              onChange={event => setregistro(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="email">email</label >
              <input id="email"
              value={email} 
              onChange={event => setemail(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="telefone">Telefone</label >
              <input id="telefone"
              value={telefone} 
              onChange={event => setTelefone(event.target.value)} />
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
// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;