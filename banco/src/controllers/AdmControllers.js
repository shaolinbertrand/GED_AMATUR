const mongoose = require ('mongoose');
const doc = require('../models/doc');
const ADM = mongoose.model('ADM');
const Doc = mongoose.model('Doc');
const admView = require('../views/AdmViewrs');
const user = require('./UserControllers');
const logger = require("../logger");

logado = user.logado

module.exports ={
    async index(req,res){
        const {page = 1} = req.query;
        const adms = await ADM.find(/*{}, {page,limit:10}*/).sort({"registro":1});

        return res.json(admView.renderMany(adms));
    },
    async show(req,res){
        const adm = await ADM.findById(req.params.id);
        return res.json(admView.render(adm));
    },
    async buscar(req,res){
        const {usuario="x"} = req.query;
        console.log(usuario)
    let adm = await ADM.findOne({"name":{$regex: usuario}});
        if(!adm){
            adm= await ADM.findOne({"registro":{$regex: usuario}});
            if(!adm){
                adm= await ADM.findOne({"CPF":{$regex: usuario}})
                if(!adm){
                    adm= await ADM.findOne({"email":{$regex: usuario}})
                    if(!adm){
                        adm= await ADM.findOne({"telefone":{$regex: usuario}})
                        if(!adm){
                            return res.json("Registrado não encontrado").status("200");
                        }
                    }
                }
            }
        }
        return res.json(admView.render(adm));
    },
    //mostrando todos os documentos associados ao mesmo adm
    async doc(req,res){
        const docs = await Doc.find({"IdAdm":req.params.id});
        const adm = await ADM.findById(req.params.id);
        return res.json(docs)

    },

    //Inserindo novo Administrador no banco de dados
    async store(req,res){
        let adm = await ADM.create({
            name: req.body.name,
            telefone: req.body.telefone,
            CPF: req.body.cpf,
            registro: req.body.registro,
            email: req.body.email,
            });
        return res.json(adm)
    },
    //Inserindo novo documento (PDF) no banco de dados
    async CriaDoc(req,res){
        const doc = await Doc.create({
            name: req.file.originalname,
            namebanco: req.file.filename,
            url: req.file.path,
            IdAdm:req.params.id
            })
        const adm = await ADM.findByIdAndUpdate(
                doc.IdAdm,
                {
                    $push: {
                        documento: {
                            url: doc.url,
                            name: doc.name
                        }
                    }
                },
                {new: true, useFindAndModify: false}
            )
        return res.json(adm)
    },
    //Atualizando os dados do administrador (exeto documentos)
    async update(req,res){
        const adm = await ADM.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(adm);
    },

    async destroy(req,res){
        await ADM.findByIdAndRemove(req.params.id);

        return res.send({msg:"Usuario excluido com sucesso"});
    },

}
