const express = require('express');
const routes = express.Router();
const upload = require('./config/multer');

const UserControllers = require ('./controllers/UserControllers');
const EmpresaControllers = require ('./controllers/EmpresaControllers');
const AgenciaControllers = require ('./controllers/AgenciaControllers');
const PagamentoControllers = require('./controllers/PagamentoControllers')
const { Router } = require('express');
routes.get("/usuariosAtivos", UserControllers.indexAtivos); //lista todos os usuarios ativos
routes.get("/usuariosInativos", UserControllers.indexInativos); //lista todos os usuarios inativos
routes.get("/usuarios", UserControllers.index); //lista todos os usuarios
routes.get("/usuario/:id",UserControllers.show);// mostra um usuario especifico pelo ID
routes.post("/cadastro", UserControllers.store);// cadastra um novo usuario no banco
routes.put("/usuario/:id",UserControllers.update);// atualiza dados de um unico usuario 
routes.delete("/usuario/:id",UserControllers.destroy);//deleta um usuario
routes.get("/login",UserControllers.login);//login no sistema
routes.post("/log/user/:id", UserControllers.log)//cria um log para tal usuario
routes.get("/listaLog/:id",UserControllers.ListaLog)//mostra todos os logs do usuario
//Empresas
routes.post("/novaEmpresa",upload.single('contrato'),EmpresaControllers.store);//cadastra nova empresa no banco
routes.get("/empresa/cadastradas",EmpresaControllers.index);//lista todas as empresas no banco
routes.delete("/empresa/:id",EmpresaControllers.destroy);//deleta uma empresa do banco
routes.put("/empresa/doc/:id",upload.single('contrato'),EmpresaControllers.CriaContrato);//envia um documento associando a uma empresa
routes.put("/empresa/:id",EmpresaControllers.update);//atualiza dados de uma empresa
routes.get("/empresa/:id",EmpresaControllers.show);//mostra uma unica empresa
routes.get("/buscarEmpresa",EmpresaControllers.buscar);//busca uma empresa pelo nome ou area
routes.get("/empresa/doc/:id",EmpresaControllers.doc)//lista todos os contratos associados a mesma empresa
//Agencias
routes.post("/novaAgencia",upload.single('caixa'),AgenciaControllers.store);//cadastra nova agencia no banco
routes.get("/agencia/cadastradas",AgenciaControllers.index);//lista todas as agencias no banco
routes.delete("/agencia/:id",AgenciaControllers.destroy);//deleta uma agencia do banco
routes.put("/agencia/doc/:id",upload.single('caixa'),AgenciaControllers.CriaCaixa);//envia um caixa associando a uma agencia
routes.get("/agencia/doc/:id",AgenciaControllers.doc)//lista todos os caixas associados a mesma agencia
routes.put("/agencia/:id",AgenciaControllers.update);//atualiza dados de uma agencia
routes.get("/agencia/:id",AgenciaControllers.show);//mostra uma unica agencia
//Folha de Pagamento
routes.post("/novaFolha",upload.single('documento'),PagamentoControllers.store);//cadastra nova folha de pagamento no banco
routes.get("/folhas/cadastradas",PagamentoControllers.index);//lista todas as folhas de pagamento no banco
routes.delete("/folha/:id",PagamentoControllers.destroy);//deleta uma folha de pagamento do banco
routes.put("/folha/doc/:id",upload.single('documento'),PagamentoControllers.CriaDoc);//envia um documento associando a uma folha de pagamento
routes.get("/folha/doc/:id",PagamentoControllers.doc)//lista todos os documneots associados a mesma folha de pagamento
routes.put("/folha/:id",PagamentoControllers.update);//atualiza dados de uma folha
routes.get("/folha/:id",PagamentoControllers.show);//mostra uma unica folha
module.exports = routes;