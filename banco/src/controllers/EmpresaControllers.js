const mongoose = require ('mongoose');
const contrato = require('../models/contrato');
const Empresa = mongoose.model('EMPRESA');
const Contrato = mongoose.model('Contrato');
const empresaView = require('../views/EmpresaViewrs');
const contratoView = require('../views/ContratoViewers')
const user = require('./UserControllers');
const logger = require("../logger");

logado = user.logado

module.exports ={
    async index(req,res){
        const {page = 1} = req.query;
        const empresas = await Empresa.find(/*{}, {page,limit:10}*/).sort({"registro":1});

        return res.json(empresaView.renderMany(empresas));
    },
    async show(req,res){
        const empresa = await Empresa.findById(req.params.id);
        return res.json(empresaView.render(empresa));
    },
    async buscar(req,res){
        const {usuario="x"} = req.query;
        console.log(usuario)
    let empresa = await Empresa.findOne({"name":{$regex: usuario}});
        if(!empresa){
            empresa= await Empresa.findOne({"area":{$regex: usuario}});
            if(!empresa){
                return res.json("Empresa não encontrada").status("200");
            }
        }
        return res.json(empresaView.render(empresa));
    },
    //mostrando todos os contratos associados a mesma empresa
    async doc(req,res){
        const contratos = await Contrato.find({"IdEmpresa":req.params.id});
        const empresa = await Empresa.findById(req.params.id);
        return res.json(contratoView.renderMany(contratos))

    },

    //Inserindo nova Empresa no banco de dados
    async store(req,res){
        let empresa = await Empresa.create({
            name: req.body.name,
            area: req.body.area,
            });
        return res.json(empresa)
    },
    //Inserindo novo contrato (PDF) no banco de dados
    async CriaContrato(req,res){
        const contrato = await Contrato.create({
            name: req.file.originalname,
            namebanco: req.file.filename,
            url: req.file.path,
            IdEmpresa:req.params.id,
            numero: req.body.numero,
            tipoValidade: req.body.tipoValidade
            })
        const empresa = await Empresa.findByIdAndUpdate(
                contrato.IdEmpresa,
                {
                    $push: {
                        contrato: {
                            url: contrato.url,
                            name: contrato.name
                        }
                    }
                },
                {new: true, useFindAndModify: false}
            )
        return res.json(empresa)
    },
    //Atualizando os dados da Empresa (exeto documentos)
    async update(req,res){
        const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(empresa);
    },

    async destroy(req,res){
        await Empresa.findByIdAndRemove(req.params.id);
        await Contrato.find({"IdEmpresa":req.params.id}).remove()
        return res.send({msg:"Empresa excluida com sucesso"});
    },
    async destroyContrato(req,res){
        const documento = await Contrato.findById(req.params.id)
        await Empresa.findByIdAndUpdate(documento.IdEmpresa,{$pull:{"contrato": {"name":documento.name}}},{new:false,useFindAndModify:true})
        await Contrato.findByIdAndRemove(req.params.id)
        return res.send({msg:"Contrato excluido com sucesso"});
    },

}
