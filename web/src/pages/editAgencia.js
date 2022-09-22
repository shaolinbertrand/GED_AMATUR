import { useHistory } from "react-router-dom";
import api from "../services/api";
import React, {useEffect, useState} from 'react'

import '../styles/pages/CriarUser.css';
import Sidebar from "../components/Sidebar";



export default function EditAdm(props) {

  const history = useHistory()

  const [name, setName] = useState('')
  

  async function handleSubmit() {
    const response = await api.put(`/agencia/${props.match.params.id}`,  {
        name: name,
      })
    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Editou dados da Agencia"+name
      })
      alert('Edição realizada com sucesso!!')
      history.push(`/agencia/${props.match.params.id}`)
    }else{
      alert(response.statusText)
    }
  }

  useEffect(()=>{
    //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
     api.get(`/agencia/${props.match.params.id}`)
  .then( todo=> {
    setName(todo.data.name)
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

            <button onClick={handleSubmit}  className="confirm-button"  type="submit">
              Confirmar
            </button>
          </fieldset>
 
        </div>
      </main>
    </div>
  );
}

