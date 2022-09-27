import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Inicial from './pages/inicial';
import Login from './pages/login';
import User from './pages/user';
import ListUser from './pages/listUser'
import ListUserAtivos from './pages/listUserAtivos'
import ListUserInativos from './pages/ListUserInativos'
import CriarUser from './pages/criarUser';
import InicialUser from './pages/inicialUser';
import InicialAdm from './pages/inicialAdm';
import criarEmpresa from './pages/criarEmpresa';
import CriarFolha from './pages/criarFolha';
import ListarEmpresa from './pages/listarEmpresa';
import ListarAgencia from './pages/listarAgencia';
import CriaAgencia from './pages/criarAgencia';
import CriarImposto from './pages/criarImposto';
import ListarImposto from './pages/listarImposto';
import ListarFP from './pages/listarFolhaPagamento';
import Empresa from './pages/Empresa';
import Agencia from './pages/Agencia';
import Imposto from './pages/Imposto';
import DocAgencia from './pages/listarDocAgencia';
import DocEmpresa from './pages/listarDocEmpresa';
import EditUser from './pages/editUser';
import EditEmpresa from './pages/editEmpresa';
import EditAgencia from './pages/editAgencia';
import EditImposto from './pages/editImposto';
import UploadContrato from './pages/uploadContrato';
import UploadCaixa from './pages/uploadCaixa';
import UploadDoc from './pages/uploadDocumentos';
import Log from './pages/log';


function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component ={Inicial}/>
                <Route path="/login" component={Login}/>
                <Route path="/TI/users" component={ListUser}/>
                <Route path="/ativos" component={ListUserAtivos}/>
                <Route path="/inativos" component={ListUserInativos}/>
                <Route path="/TI/user/:id" component={User}/>
                <Route path="/TI/edituser/:id" component={EditUser}/>
                <Route path="/editEmpresa/:id" component={EditEmpresa}/>
                <Route path="/editAgencia/:id" component={EditAgencia}/>
                <Route path="/editImposto/:id" component={EditImposto}/>
                <Route path="/usuario/create" component={CriarUser}/>
                <Route path="/folha/create" component={CriarFolha}/>
                <Route path="/admin/inicial" component={InicialAdm}/>
                <Route path="/user/inicial" component={InicialUser}/>
                <Route path="/empresa/create" component={criarEmpresa}/>
                <Route path='/listarEmpresa' component={ListarEmpresa}/>
                <Route path='/TI/listarAgencia' component={ListarAgencia}/>
                <Route path='/TI/agenciaCreate' component={CriaAgencia}/>
                <Route path='/impostoCreate' component={CriarImposto}/>
                <Route path='/listarImposto' component={ListarImposto}/>
                <Route path='/listarFolhaPagamentos' component={ListarFP}/>
                <Route path='/empresa/:id' component={Empresa}/>
                <Route path='/agencia/:id' component={Agencia}/>
                <Route path='/imposto/:id'component={Imposto}/>
                <Route path='/Agenciadoc/:id/:name/' component={DocAgencia}/>
                <Route path='/Empresadoc/:id/:name/' component={DocEmpresa}/>
                <Route path='/uploadContrato/:id/' component={UploadContrato}/>
                <Route path='/uploadCaixa/:id/' component={UploadCaixa}/>
                <Route path='/uploadDocumento/:id/' component={UploadDoc}/>
                <Route path='/log/:id/' component={Log}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;