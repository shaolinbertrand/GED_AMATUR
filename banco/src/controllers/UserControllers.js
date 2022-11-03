const mongoose = require ('mongoose');
const { findById } = require('../models/documento');
const User = mongoose.model('User');
const Log = mongoose.model('Log');
const userView = require('../views/UserViwers')
const logView = require('../views/LogViewers')
const logger = require("../logger");

module.exports = {
    async Verifica(req,res){
        const userlogado = await User.findById(req.query.id)
        let permissao = {}
        if (userlogado.setor=='T.I'){
            permissao = {
                'criarUser':true,
                'criarEmpresa':true,
                'criarAgencia':true,
                'criarImposto':true,
                'criarFolha':true,
                'ListarAgencia':true,
                'ListarUser':true,
                'ListarEmpresa':true,
                'ListarImposto':true,
                'ListarFolha':true,
                'Excluir':true,                                        
            }
        }
        else if(userlogado.setor=='diretoria'){
            permissao = {
                'criarUser':false,
                'criarEmpresa':false,
                'criarAgencia':false,
                'criarImposto':false,
                'criarFolha':false,
                'ListarAgencia':true,
                'ListarUser':true,
                'ListarEmpresa':true,
                'ListarImposto':true,
                'ListarFolha':true,
                'Excluir':false,  
            }
        }else if(userlogado.setor=='Financeiro'){
                permissao = {
                'criarUser':false,
                'criarEmpresa':true,
                'criarAgencia':true,
                'criarImposto':false,
                'criarFolha':false,
                'ListarAgencia':true,
                'ListarUser':false,
                'ListarEmpresa':true,
                'ListarImposto':true,
                'ListarFolha':true,
                'Excluir':false,  
                }
        }else if (userlogado.setor=='RH'){
            permissao = {
                'criarUser':false,
                'criarEmpresa':false,
                'criarAgencia':false,
                'criarImposto':true,
                'criarFolha':true,
                'ListarAgencia':false,
                'ListarUser':false,
                'ListarEmpresa':false,
                'ListarImposto':true,
                'ListarFolha':true,
                'Excluir':false,                                       
            }
        }
        return res.json(permissao)
    },

    async index(req,res){
        const userlogado = await User.findById(req.query.id)
        if (userlogado.setor=='T.I' || userlogado.setor=="diretoria"){
            const users= await User.find();
            return res.json(userView.renderMany(users));
        }
        else{
            return res.json({msg:"Permissão negada"}).status("401")
        }  
    },
    async indexAtivos(req,res){
        const userlogado = await User.findById(req.query.id)
        if (userlogado.setor=='T.I' || userlogado.setor=="diretoria"){
            const users= await User.find({"ativo":true});
            return res.json(userView.renderMany(users));
        }
        else{
            return res.json({msg:"Permissão negada"}).status("401")
        }  
    },
    async indexInativos(req,res){
        const userlogado = await User.findById(req.query.id)
        if (userlogado.setor=='T.I' || userlogado.setor=="diretoria"){
            const users= await User.find({"ativo":false});
            return res.json(userView.renderMany(users));
        }
        else{
            return res.json({msg:"Permissão negada"}).status("401")
        }  
    },

    async show(req,res){
        const user = await User.findById(req.params.id);
        return res.json(userView.render(user));
    },

    async store(req,res){
        const userlogado = await User.findById(req.query.id)
        if (userlogado.setor=='T.I'){
            const user = await User.create(req.body);
            return res.json(user);
        }
        else{
            return res.json({msg:"Permissão negada"}).status("401")
        }
    },

    async update(req,res){
        const userlogado = await User.findById(req.query.id)
        if ((userlogado.setor=='T.I') || (userlogado._id == req.params.id)){ //tratamento para que só o administrador do sistema ou o proprio usuario possa atualizar seus dados
                const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true,useFindAndModify: false});
                return res.json(user);
            }
            else {
                return res.json({msg:"Permissão negada"}).status("401")
            }
    },

    async destroy(req,res){
        const userlogado = await User.findById(req.query.id) //tratamento para que só o administrador do sistema possa deletar usuarios
            if (userlogado.setor=='T.I'){
                await User.findByIdAndRemove(req.params.id);
                return res.send({msg: "usuario deletado com sucesso"});
            }
            else {
                return res.json({msg:"Permissão negada"})
            }      
    },

    async login(req,res){
        const {usuario="x"} = req.query;//usuario
        const {senha="x"} = req.query;//senha
        let user = await User.findOne({"nome":usuario,"password":senha});
            if(!user){
                return res.status("401").json([{msg:"usuario não encontrado"}]);

            }
        logado = user;
        return res.json(user);
    },

    async log(req,res){
        data = new Date
        const user = await User.findById(req.params.id);
        const Acao = req.body.acao
        const log = await Log.create(
            {dia: `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`,
            nome: user.nome,
            idUser: user._id,
            hora: `${data.getHours()}:${data.getMinutes()}`,
            acao: Acao
            }
        );
        console.log(log)
        return res.json(log)
    },

    async ListaLog(req,res){
        const logs = await Log.find({"idUser":req.params.id});
        return res.json(logView.renderMany(logs));
    }
   
}
