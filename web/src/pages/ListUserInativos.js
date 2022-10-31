
import api from "../services/api";
import React, { useEffect, useState } from 'react'
import { BsWrench } from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import { BsEye } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import Sidebar from '../components/Sidebar'
import '../styles/pages/listarUser.css';
import { Link } from 'react-router-dom';

var conf = "a";

function User() {
    const [list, setList] = useState([]);
    const history = useHistory()
    useEffect(() => {
        const log = api.post(`/log/user/${localStorage.getItem('id_login')}`, {
            acao: "Visualizou Usuários Inativos "
        })
        api.get(`usuariosinativos?id=${localStorage.getItem('id_login')}`)
            .then((todo) => setList(todo.data));
    }, [])

    try{ return (

        <div id="page-listUser">
            <Sidebar />
            <div className="list-user-form" >
                <h2 >USUÁRIOS</h2>
                <div className="tipos">
                    <Link to='/ativos'>
                        <button type="button" className="botaouser">
                            Ativos
                        </button>
                    </Link>
                    <Link to='/TI/users'>
                        <button type="button" className="botaouser">
                            Todos
                        </button>
                    </Link>
                </div>
                <ul>
                    {list.map(user => (
                        <div className="lista" >
                            <span className="nome" >{user.nome}</span>
                            <Link to={`/TI/edituser/${user._id}`} className="atualizar_dados">
                                <button type="button" className="botaolist" title="EDITAR">
                                    <BsWrench size={26} color="gray" />
                                </button>
                            </Link>
                            <Link to={`/TI/user/${user._id}`} className="mostrar_dados">
                                <button type="button" className="botaolist" title="VISUALIZAR DADOS">
                                    <BsEye size={26} color="rgba(0, 0, 0, 0.6)" />
                                </button>
                            </Link>
                            <button type="button" className="botaolist" title="EXCLUIR">
                                <BsTrash size={26} color="rgba(0, 0, 0, 0.6)" />
                            </button>

                        </div>
                    ))}
                </ul>
            </div>

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