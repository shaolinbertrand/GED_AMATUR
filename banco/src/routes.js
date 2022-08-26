const express = require('express');
const routes = express.Router();
const upload = require('./config/multer');

const UserControllers = require ('./controllers/UserControllers');
const AdmControllers = require ('./controllers/AdmControllers');
const { Router } = require('express');
routes.get("/usuariosAtivos", UserControllers.indexAtivos); //lista todos os usuarios ativos
routes.get("/usuariosInativos", UserControllers.indexInativos); //lista todos os usuarios inativos
routes.get("/usuarios", UserControllers.index); //lista todos os usuarios
routes.get("/usuario/:id",UserControllers.show);// mostra um usuario especifico pelo ID
routes.post("/cadastro", UserControllers.store);// cadastra um novo usuario no banco
routes.put("/usuario/:id",UserControllers.update);// atualiza dados de um unico usuario
routes.delete("/usuario/:id",UserControllers.destroy);//deleta um usuario
routes.get("/login",UserControllers.login);//login no sistema
routes.post("/novoadm",upload.single('documento'),AdmControllers.store);//cadastra novo adm no banco
routes.get("/adm/cadastrados",AdmControllers.index);//lista todos os administradores no banco
routes.delete("/adm/:id",AdmControllers.destroy);//deleta um adm do banco
routes.put("/adm/doc/:id",upload.single('documento'),AdmControllers.CriaDoc);//envia um documento associando a um adm
routes.put("/adm/:id",AdmControllers.update);//atualiza dados dos adm registrados
routes.get("/adm/:id",AdmControllers.show);//mostra um unico adm
routes.get("/buscarADM",AdmControllers.buscar);//busca um adm pelo n° de registro, nome, CPF, telefone ou email
routes.get("/adm/doc/:id",AdmControllers.doc)//lista todos os documentos associados ao mesmo adm
routes.post("/log/user/:id", UserControllers.log)//cria um log para tal usuario
routes.get("/listaLog/:id",UserControllers.ListaLog)//mostra todos os logs do usuario

module.exports = routes;