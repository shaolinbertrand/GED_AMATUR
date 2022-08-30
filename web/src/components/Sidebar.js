import React from 'react';
import {BiLogOut} from  'react-icons/bi'
import { useHistory } from 'react-router-dom';
import '../styles/components/Sidebar.css';
import logoImg from '../images/logo.png';
import { Link } from 'react-router-dom';
import {BiUserPin} from 'react-icons/bi'
import {BsFillPersonPlusFill} from 'react-icons/bs'; 
import {CgUserList} from 'react-icons/cg';
import {BsCardList} from 'react-icons/bs';
import {FaCashRegister} from 'react-icons/fa';
import {FaFileContract} from 'react-icons/fa';
import {FaMoneyCheckAlt} from "react-icons/fa";
import {FaWallet} from "react-icons/fa";






export default function Sidebar(){
    const {logOut} = useHistory();
    return (
        <aside>
                <header>
                    <img src={logoImg}  className="CRA-RR"/>

                    <h2>Escolha a opção desejada:</h2>
                </header>

                <div className="corpo" >
                <br></br>
                    <div>Novo Usuario</div>
                    <Link to="/admin/usuario/create" className="enter-app">
                        <button type="button" className= "botao">

                            <BiUserPin size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Listar Usuários</div>
                    <Link to="/ativos" className="enter-app">
                        <button type="button" className= "botao">
                            <CgUserList size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Cadastrar Contrato</div>
                    <Link to="/user/adms/create" className="enter-app">
                        <button type="button" className= "botao">
                            <FaFileContract size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Listar Contratos</div>
                    <Link to="/admin/listADM" className="enter-app">
                        <button type="button" className= "botao">
                            <FaFileContract size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Cadastrar Caixa</div>
                    <Link to="/user/adms/create" className="enter-app">
                        <button type="button" className= "botao">
                            <FaCashRegister size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Listar Caixas</div>
                    <Link to="/admin/listADM" className="enter-app">
                        <button type="button" className= "botao">
                            <FaCashRegister size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Cadastrar Imposto</div>
                    <Link to="/user/adms/create" className="enter-app">
                        <button type="button" className= "botao">
                            <FaMoneyCheckAlt size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Listar Impostos</div>
                    <Link to="/admin/listADM" className="enter-app">
                        <button type="button" className= "botao">
                            <FaMoneyCheckAlt size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Cadastrar Folha de Pagamento</div>
                    <Link to="/user/adms/create" className="enter-app">
                        <button type="button" className= "botao">
                            <FaWallet size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                    <br></br>
                    <div>Listar Folhas de Pagamento</div>
                    <Link to="/admin/listADM" className="enter-app">
                        <button type="button" className= "botao">
                            <FaWallet size={26} color="rgba(0, 0, 0, 0.6)"/>
                        </button>
                    </Link>
                </div>
                <div className='espaco'></div>
                <div className='espaco'></div>
                <footer>
                    Sair do Sistema
                    <Link to="/login" className="enter-app">
                        <button type="button"  className= "botao">
                            < BiLogOut size={26}/>
                        </button>
                    </Link>
                    <div className='espaco'></div>
                    <strong>Boa Vista</strong>
                    <span>Roraima</span>
                </footer>
            </aside>
    )
}