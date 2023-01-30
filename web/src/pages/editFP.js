import { useHistory } from "react-router-dom";
import api from "../services/api";
import React, {useEffect, useState} from 'react'

import '../styles/pages/CriarUser.css';
import Sidebar from "../components/Sidebar";



export default function EditAdm(props) {

  const history = useHistory()

  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')
  

  async function handleSubmit() {
    const response = await api.put(`/folha/${props.match.params.id}`,  {
        mes: mes,
        ano: ano,
      })
    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Editou dados da Folha de pagamento "+mes+" / "+ano
      })
      alert('Edição realizada com sucesso!!')
      history.push(`/folha/${props.match.params.id}`)
    }else{
      alert(response.statusText)
    }
  }

  useEffect(()=>{
    //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
     api.get(`/Empresa/${props.match.params.id}`)
  .then( todo=> {
    setMes(todo.data.mes)
    setAno(todo.data.ano)
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
              <label htmlFor="mes">MÊS</label>
              <input id="mes" 
              value={name} 
              onChange={event => setMes(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="ano">ANO</label >
              <input id="ano"
              value={area} 
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

