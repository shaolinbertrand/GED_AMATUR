import React from 'react';
import {BiLogOut} from  'react-icons/bi'
import { useHistory } from 'react-router-dom';
import '../styles/components/Sidebar.css'
import logoImg from '../images/logo.png';
import { Link } from 'react-router-dom';
import {BiUserPin} from 'react-icons/bi'
import {BsFillPersonPlusFill} from 'react-icons/bs';
import {CgUserList} from 'react-icons/cg'
import {BsCardList} from 'react-icons/bs'


export default function Sidebar(){
    const {logOut} = useHistory();
    return (
        <aside>
                <header>
                    <img src={logoImg} className="CRA-RR"/>

                    <h2>Escolha a opção desejada</h2>
                </header>


                <div className="corpo" >
                    Novo user
                    <Link to="/admin/usuario/create" className="enter-app">
                        <button type="button" className= "botao">
                            <BiUserPin size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <div>Novo Admininstrador</div>
                    <Link to="/user/adms/create" className="enter-app">
                        <button type="button" className= "botao">
                            <BsFillPersonPlusFill size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <div>Listar Usuários</div>
                    <Link to="/ativos" className="enter-app">
                        <button type="button" className= "botao">
                            <CgUserList size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <div>Listar Admininstradores</div>
                    <Link to="/admin/listADM" className="enter-app">
                        <button type="button" className= "botao">
                            <BsCardList size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                </div>
                
                <footer>
                    Sair do Sistema
                    <Link to="/login" className="enter-app">
                        <button type="button"  className= "botao">
                            < BiLogOut size={24} color="FFF"/>
                        </button>
                    </Link>
                    <strong>Boa Vista</strong>
                    <span>Roraima</span>
                </footer>
            </aside>
    )
}