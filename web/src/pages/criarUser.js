import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

import '../styles/pages/CriarUser.css';
import Sidebar from "../components/Sidebar";



export default function CreateUser() {

  const history = useHistory()

  const [name, setName] = useState('')
  const [cargo, setCargo] = useState('')
  const [senha, setPassword] = useState('')
  const [CPF, setCPF] = useState('')
  const [Adimin, setAdimin] = useState(false)
  const [Ativo, setAtivo] = useState(true)
  const [telefone, setTelefone] = useState('')
  

  async function handleSubmit() {
    console.log('ssdsdsd')


    const response = await api.post('/cadastro',  {
      nome: name,
      telefone: telefone,
      password:senha,
      CPF:CPF,
      cargo: cargo,
      admin: Adimin,
      ativo: Ativo
    })

    

    //user/id

    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Realizou cadastro do usuário "+name
      })
      alert('Cadastro realizado com sucesso!!')
      history.push('/admin/inicial')
    }else{
      alert(response.statusText)
    }
  }

  return (
    <div id="page-CreateUser">

    <Sidebar />

      <main>
      <div className="create-user-form" >
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
              value={name} 
              onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="senha" show='*'>Senha</label >
              <input id="senha"
              value={senha} 
              onChange={event => setPassword(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="cargo">Cargo</label >
              <input id="cargo"
              value={cargo} 
              onChange={event => setCargo(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="telefone">Telefone</label >
              <input id="telefone"
              value={telefone} 
              onChange={event => setTelefone(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="CPF">CPF</label >
              <input id="CPF"
              value={CPF} 
              onChange={event => setCPF(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="Adimin">Administrador do Sistema</label>

              <div className="button-select">
                <button type="button" 
                className={Adimin ? 'active' : ''}
                onClick={() => setAdimin(true)}
                >Sim</button>
                <button 
                type="button"
                className={!Adimin ? 'active' : ''}
                onClick={() => setAdimin(false)}
                >Não</button>
              </div>

              <label htmlFor="Adimin">Usuário Ativo</label>
              <div className="button-select">
                <button type="button" 
                className={Ativo ? 'active' : ''}
                onClick={() => setAtivo(true)}
                >Sim</button>
                <button 
                type="button"
                className={!Ativo ? 'active' : ''}
                onClick={() => setAtivo(false)}
                >Não</button>
              </div>
            </div>

          </fieldset>

          <button onClick={handleSubmit} className="confirm-button" type="submit">
            Confirmar
          </button>
          </div>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;