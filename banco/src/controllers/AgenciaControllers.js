const mongoose = require ('mongoose');
const caixa = require('../models/caixa');
const Agencia = mongoose.model('AGENCIA');
const Caixa = mongoose.model('CAIXA');
const agenciaView = require('../views/AgenciaViewers');
const user = require('./UserControllers');
const logger = require("../logger");

logado = user.logado

module.exports ={
    async index(req,res){
        const {page = 1} = req.query;
        const agencias = await Agencia.find(/*{}, {page,limit:10}*/).sort({"name":1});

        return res.json(agenciaView.renderMany(agencias));
    },
    //mostrando uma unica agencia
    async show(req,res){
        const agencia = await Agencia.findById(req.params.id);
        return res.json(agenciaView.render(agencia));
    },
    //buscando uma agencia
    async buscar(req,res){
        const {usuario="x"} = req.query;
        console.log(usuario)
    let agencia = await Agencia.findOne({"name":{$regex: usuario}});
         if(!agencia){
             return res.json("Agência não encontrada").status("200");
            }
        return res.json(agenciaView.render(agencia));
    },
    //mostrando todos os caixas associados a mesma agencia
    async doc(req,res){
        const caixas = await Caixa.find({"IdAgencia":req.params.id});
        const adm = await Agencia.findById(req.params.id);
        return res.json(caixas)

    },

    //Inserindo nova Agencia no banco de dados
    async store(req,res){
        let agencia = await Agencia.create({
            name: req.body.name,
            });
        return res.json(agencia)
    },
    //Inserindo novo caixa (PDF) no banco de dados
    async CriaCaixa(req,res){
        const caixa = await Caixa.create({
            name: req.file.originalname,
            namebanco: req.file.filename,
            url: req.file.path,
            IdAgencia:req.params.id,
            dia: req.body.dia,
            mes: req.body.mes,
            ano:req.body.ano
            })
        const agencia = await Agencia.findByIdAndUpdate(
                caixa.IdAgencia,
                {
                    $push: {
                        caixa: {
                            url: caixa.url,
                            name: caixa.name
                        }
                    }
                },
                {new: true, useFindAndModify: false}
            )
        return res.json(agencia)
    },
    //Atualizando os dados da agencia (exeto documentos)
    async update(req,res){
        const agencia = await Agencia.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(agencia);
    },

    async destroy(req,res){
        await Agencia.findByIdAndRemove(req.params.id);

        return res.send({msg:"Agencia excluida com sucesso"});
    },

}
