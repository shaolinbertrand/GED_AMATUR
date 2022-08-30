import { useHistory } from "react-router-dom";
import api from "../services/api";
import React, {useEffect, useState} from 'react'

import '../styles/pages/CriarUser.css';
import Sidebar from "../components/Sidebar";



export default function EditAdm(props) {

  const history = useHistory()

  const [name, setName] = useState('')
  const [cpf, setCPF] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [registro, setRegistro] = useState('')

  async function handleSubmit() {
    console.log('ssdsdsd')
    const response = await api.put(`/adm/${props.match.params.id}`,  {
        name: name,
        telefone: telefone,
        CPF:cpf,
        registro: registro,
        email: email,
      })
    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Editou dados do Registrado "+name
      })
      alert('Edição realizada com sucesso!!')
      history.push(`/adm/${props.match.params.id}`)
    }else{
      alert(response.statusText)
    }
  }

  useEffect(()=>{
    //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
     api.get(`/adm/${props.match.params.id}`)
  .then( todo=> {
    setName(todo.data.name)
    setTelefone(todo.data.telefone)
    setCPF(todo.data.CPF)
    setRegistro(todo.data.registro)
    setEmail(todo.data.email)
  }
  );
  },[])

  return (
    <div id="page-CreateUser">

    <Sidebar />

      <main>
      <div className="create-ADM-form" >
          <fieldset>
            <legend>Dados</legend>

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
              onChange={event => setRegistro(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="email">email</label >
              <input id="email"
              value={email} 
              onChange={event => setEmail(event.target.value)} />
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

