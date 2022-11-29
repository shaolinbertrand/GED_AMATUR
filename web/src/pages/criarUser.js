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
  const [Ativo, setAtivo] = useState(true)
  const [setor, setSetor] = useState('')
  const [verifica,setVerifica] = useState('')

   const teste = api.get(`verificaP/?id=${localStorage.getItem('id_login')}`)
    .then((todo)=>setVerifica(todo.data))
   const PermissaoCriar = verifica.criarUser
   console.log(PermissaoCriar)
   if (PermissaoCriar == false){
    
    alert("permissao negada")
    history.push('/admin/inicial')
   }

  async function handleSubmit() {

    const response = await api.post('/cadastro',  {
      nome: name,
      setor: setor,
      password:senha,
      CPF:CPF,
      cargo: cargo,
      ativo: Ativo
    })

  

    if(response.status == 200){
      const log = api.post(`/log/user/${localStorage.getItem('id_login')}`,{
        acao:"Realizou cadastro do usuário "+name
      })
      alert('Cadastro realizado com sucesso!!')
      history.push('admin/inicial')
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
            <legend>Dados de Usuário</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
              value={name} 
              onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="senha" show='*'>Senha</label >
              <input type='password' id="senha"
              value={senha} 
              onChange={event => setPassword(event.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="CPF">CPF</label >
              <input id="CPF"
              value={CPF} 
              onChange={event => setCPF(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="cargo">Cargo</label >
              <input id="cargo"
              value={cargo} 
              onChange={event => setCargo(event.target.value)} />
            </div>
          </fieldset>
            <div className="input-block-setor">
              <label htmlFor="setor">Setor</label > 
              <div className="radium" >
               <span>Diretoria</span> <input type="radio" name="setor" value="diretoria" onChange={event => setSetor(event.target.value)}/>
               <span>T.I.</span><input  type="radio" name="setor" value="ti" onChange={event => setSetor(event.target.value)}/>
               <span>R.H</span><input  type="radio" name="setor" value="rh" onChange={event => setSetor(event.target.value)}/>
               <span>Financeiro</span><input  type="radio" name="setor" value="financeiro" onChange={event => setSetor(event.target.value)}/>
               </div>
              </div>
          <fieldset>   
              
              
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
