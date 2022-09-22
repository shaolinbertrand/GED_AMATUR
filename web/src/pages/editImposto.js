import { useHistory } from "react-router-dom";
import api from "../services/api";
import React, {useEffect, useState} from 'react'

import '../styles/pages/CriarUser.css';
import Sidebar from "../components/Sidebar";



export default function EditAdm(props) {

  const history = useHistory()

  const [name, setName] = useState('')
  const [periodo, setPeriodo] = useState('')
  const [NumParc, setNumParc] = useState('')
  

  async function handleSubmit() {
    const response = await api.put(`/imposto/${props.match.params.id}`,  {
        name: name,
        periodo: periodo,
        NumParc: NumParc,
      })
    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Editou dados do imposto "+name
      })
      alert('Edição realizada com sucesso!!')
      history.push(`/imposto/${props.match.params.id}`)
    }else{
      alert(response.statusText)
    }
  }

  useEffect(()=>{
    //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
     api.get(`/imposto/${props.match.params.id}`)
  .then( todo=> {
    setName(todo.data.name)
    setPeriodo(todo.data.periodo)
    setNumParc(todo.data.NumParc)
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
              <label htmlFor="area">Periodo</label >
              <input id="periodo"
              value={periodo} 
              onChange={event => setPeriodo(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="area">Nº Parcelamentos</label >
              <input id="NumParc"
              value={NumParc} 
              onChange={event => setNumParc(event.target.value)} />
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

