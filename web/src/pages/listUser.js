
import api from "../services/api";
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { BsWrench } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import Sidebar from '../components/Sidebar'
import '../styles/pages/listarUser.css';
import { Link } from 'react-router-dom';
import admin from './login'

var conf = "a";
function User() {
    const [list, setList] = useState([]);
    const history = useHistory()

    useEffect(async () => {
            //api.get("usuarios?id=60ac05f9498fd53d8c5514ec")
            const log = api.post(`/log/user/${localStorage.getItem('id_login')}`, {
                acao: "Listou todos os usuários "
            })
            console.log('inseriu dados no log')
           const resposta = await api.get(`usuarios?id=${localStorage.getItem('id_login')}`)
                .then((todo) => setList(todo.data));
        try{console.log(resposta)}
        catch(e){
            console.log(e)
        }

    }, [])

    try{return (

        <div id="page-listUser">
            <Sidebar />
            <main>
                <div className="list-user-form" >
                    <h2 >USUÁRIOS</h2>
                    <div className="tipos">
                        <Link to='/inativos'>
                            <button type="button" className="botaouser">
                                Inativos
                            </button>
                        </Link>
                        <Link to='/ativos'>
                            <button type="button" className="botaouser">
                                Ativos
                            </button>
                        </Link>
                    </div>
                    <ul>
                        {list.map(user => (
                            <div className="lista"  >
                                <span className="nome">{user.nome}</span>

                                <Link to={`/TI/edituser/${user._id}`} className="atualizar_dados">
                                    <button type="button" className="botaolist" title="EDITAR">
                                        <BsWrench size={26} color="gray" />
                                    </button>
                                </Link>
                                <Link to={`/TI/user/${user._id}`} className="mostrar_dados">
                                    <button type="button" className="botaolist" title="VIZUALIZAR DADOS">
                                        <BsEye size={26} color="rgba(0, 0, 0, 0.6)" />
                                    </button>
                                </Link>
                                <button type="button" className="botaolist" title="EXCLUIR">
                                    <BsTrash size={26} color="rgba(0, 0, 0, 0.6)" />
                                </button>

                            </div>
                        ))
                        }
                    </ul>
                </div>
            </main>
        </div>
    )}catch(e){
        history.push('/admin/inicial')
        if(conf=="a"){
            conf="b"; 
        alert("Permissão negada")
    }
        return(null)
      
    }



};

export default User;