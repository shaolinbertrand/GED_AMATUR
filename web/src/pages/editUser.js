import { useHistory } from "react-router-dom";
import api from "../services/api";
import React, {useEffect, useState} from 'react'

import '../styles/pages/CriarUser.css';
import Sidebar from "../components/Sidebar";



export default function EditUser(props) {

  const history = useHistory()

  const [name, setName] = useState('')
  const [cargo, setCargo] = useState('')
  const [senha, setPassword] = useState('')
  const [CPF, setCPF] = useState('')
  const [Ativo, setAtivo] = useState(true)
  const [setor, setSetor] = useState('')
  

  async function handleSubmit() {
    console.log('ssdsdsd')
    const response = await api.put(`/usuario/${props.match.params.id}?id=607b5fcfc740aa2cc8057a89`,  {
      nome: name,
      setor: setor,
      password:senha,
      CPF:CPF,
      cargo: cargo,
      ativo: Ativo
      })
    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Editou dados do usuário "+name
      })
      alert('Edição realizada com sucesso!!')
      history.push(`/TI/user/${props.match.params.id}`)
    }else{
      alert(response.statusText)
    }
  }

  useEffect(()=>{
    //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
     api.get(`/usuario/${props.match.params.id}`)
  .then( todo=> {
    setName(todo.data.nome)
    setCargo(todo.data.cargo)
    setSetor(todo.data.setor)
    setCPF(todo.data.CPF)
    setPassword(todo.data.senha)
    setAtivo(todo.data.ativo)
  }
  );
  },[])

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
              <label htmlFor="senha">Senha</label >
              <input type='password' id="senha"
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
              <label htmlFor="setor">Setor</label >
              <input id="setor"
              value={setor} 
              onChange={event => setSetor(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="CPF">CPF</label >
              <input id="CPF"
              value={CPF} 
              onChange={event => setCPF(event.target.value)} />
            </div>

            <div className="input-block">
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