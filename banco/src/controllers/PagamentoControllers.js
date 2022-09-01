const mongoose = require ('mongoose');
const doc = require('../models/documento');
const Pagamento = mongoose.model('Pagamento');
const Documento = mongoose.model('Doc');
const pagamentoView = require('../views/PagamentoViewers');
const docView = require('../views/DocViewers');
const user = require('./UserControllers');
const logger = require("../logger");

logado = user.logado

module.exports ={
    async index(req,res){
        const {page = 1} = req.query;
        const pagamentos = await Pagamento.find(/*{}, {page,limit:10}*/).sort({"name":1});

        return res.json(pagamentoView.renderMany(pagamentos));
    },
    //mostrando uma unica agencia
    async show(req,res){
        const pagamento = await Pagamento.findById(req.params.id);
        return res.json(pagamentoView.render(pagamento));
    },
    //buscando uma agencia
    async buscar(req,res){
        const {usuario="x"} = req.query;
        console.log(usuario)
    let pagamento = await Pagamento.findOne({"name":{$regex: usuario}});
         if(!pagamento){
             return res.json("Agência não encontrada").status("200");
            }
        return res.json(pagamentoView.render(pagamento));
    },
    //mostrando todos os documentos associados a mesma folha de pagamento
    async doc(req,res){
        const documentos = await Documento.find({"IdPagamento":req.params.id});
        return res.json(docView.renderMany(documentos))

    },

    //Inserindo nova Agencia no banco de dados
    async store(req,res){
        let pagamento = await Pagamento.create({
            mes:req.body.mes,
            ano:req.body.ano
            });
        return res.json(pagamento)
    },
    //Inserindo novo caixa (PDF) no banco de dados
    async CriaDoc(req,res){
        data = new Date
        const documento = await Documento.create({
            name: req.file.originalname,
            namebanco: req.file.filename,
            url: req.file.path,
            IdPagamento:req.params.id,
            DataUpload: `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
            })
        const pagamento = await Pagamento.findByIdAndUpdate(
                documento.IdPagamento,
                {
                    $push: {
                        documento: {
                            url: documento.url,
                            name: documento.name
                        }
                    }
                },
                {new: true, useFindAndModify: false}
            )
        return res.json(pagamento)
    },
    //Atualizando os dados da agencia (exeto documentos)
    async update(req,res){
        const pagamento = await Pagamento.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(pagamento);
    },

    async destroy(req,res){
        await Pagamento.findByIdAndRemove(req.params.id);
        await Documento.find({"IdFolha":req.params.id}).remove()
        return res.send({msg:"Folha de Pagamento excluida com sucesso"});
    },

}
