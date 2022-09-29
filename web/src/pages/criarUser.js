import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import { FaEye }  from 'react-icons/fa';
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
   
  const cpf1 = document.querySelector("#CPF");

  if (cpf1){
    cpf1.addEventListener("keyup", () => {
    let value = cpf1.value.replace(/[^0-9]/g, "").replace(/^([\d]{3})([\d]{3})?([\d]{3})?([\d]{2})?/, "$1.$2.$3-$4");
    
    cpf1.value = value;
    });
  }

   function mostraSenha(){
  const senha1 = document.getElementById("senha");
    if (senha1.type=="password"){
        senha1.type="text";
    }else{
      senha1.type="password";
    }
  
}




  async function handleSubmit() {
    console.log('ssdsdsd')


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
      history.push('/ativos')
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

            <div className="input-block-senha">
              <label htmlFor="senha">Senha</label >
              <input type='password' id="senha"
              value={senha} 
              onChange={event => setPassword(event.target.value)} />
               <button onClick={mostraSenha}  className="Check" title="MOSTRAR SENHA">
               <FaEye size={20} color="rgba(0, 0, 0, 0.6)"/>
              </button>
             
            </div>
            <div className="input-block">
              <label htmlFor="CPF">CPF</label >
              <input id="CPF" maxlength="14"
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
               <span>Diretoria</span> <input type="radio" name="setor" value="Diretoria" onChange={event => setSetor(event.target.value)} />
               <span>T.I.</span><input  type="radio" name="setor" value="T.I" onChange={event => setSetor(event.target.value)}/>
               <span>R.H</span><input  type="radio" name="setor" value="RH" onChange={event => setSetor(event.target.value)}/>
               <span>Financeiro</span><input  type="radio" name="setor" value="Financeiro" onChange={event => setSetor(event.target.value)}/>
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
