const express = require('express');
const routes = express.Router();
const upload = require('./config/multer');

const UserControllers = require ('./controllers/UserControllers');
const EmpresaControllers = require ('./controllers/EmpresaControllers');
const { Router } = require('express');
routes.get("/usuariosAtivos", UserControllers.indexAtivos); //lista todos os usuarios ativos
routes.get("/usuariosInativos", UserControllers.indexInativos); //lista todos os usuarios inativos
routes.get("/usuarios", UserControllers.index); //lista todos os usuarios
routes.get("/usuario/:id",UserControllers.show);// mostra um usuario especifico pelo ID
routes.post("/cadastro", UserControllers.store);// cadastra um novo usuario no banco
routes.put("/usuario/:id",UserControllers.update);// atualiza dados de um unico usuario 
routes.delete("/usuario/:id",UserControllers.destroy);//deleta um usuario
routes.get("/login",UserControllers.login);//login no sistema
routes.post("/novaEmpresa",upload.single('contrato'),EmpresaControllers.store);//cadastra nova empresa no banco
routes.get("/empresa/cadastradas",EmpresaControllers.index);//lista todas as empresas no banco
routes.delete("/empresa/:id",EmpresaControllers.destroy);//deleta um adm do banco
routes.put("/empresa/doc/:id",upload.single('contrato'),EmpresaControllers.CriaContrato);//envia um documento associando a uma empresa
routes.put("/empresa/:id",EmpresaControllers.update);//atualiza dados dos adm registrados
routes.get("/empresa/:id",EmpresaControllers.show);//mostra um unico adm
routes.get("/buscarEmpresa",EmpresaControllers.buscar);//busca um adm pelo n° de registro, nome, CPF, telefone ou email
routes.get("/empresa/doc/:id",EmpresaControllers.doc)//lista todos os documentos associados ao mesmo adm
routes.post("/log/user/:id", UserControllers.log)//cria um log para tal usuario
routes.get("/listaLog/:id",UserControllers.ListaLog)//mostra todos os logs do usuario

module.exports = routes;