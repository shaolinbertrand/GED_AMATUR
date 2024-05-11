const mongoose = require ('mongoose');
const Imposto = mongoose.model('Imposto');
const ImpostoView = require('../views/ImpostoViewers');
const user = require('./UserControllers');
const logger = require("../logger");

logado = user.logado

module.exports ={
    async index(req,res){
        const {page = 1} = req.query;
        const impostos = await Imposto.find(/*{}, {page,limit:10}*/).sort({"name":1});

        return res.json(ImpostoView.renderMany(impostos));
    },
    //mostrando um unico imposto
    async show(req,res){
        const imposto = await Imposto.findById(req.params.id);
        return res.json(ImpostoView.render(imposto));
    },
    //buscando um imposto
    async buscar(req,res){
        const {usuario="x"} = req.query;
        console.log(usuario)
    let imposto = await Imposto.findOne({"name":{$regex: usuario}});
         if(!imposto){
             return res.json("Imposto não encontrada").status("200");
            }
        return res.json(ImpostoView.render(imposto));
    },

    //Inserindo nova Agencia no banco de dados
    async store(req,res){
        let imposto = await Imposto.create({
            name: req.file.originalname,
            namebanco: req.file.filename,
            url: req.file.path,
            periodo: req.body.periodo,
            NumParc: req.body.NumParc,
            });
        return res.json(imposto)
    },
    //Atualizando os dados do imposto (exceto documentos)
    async update(req,res){
        const pagamento = await Imposto.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(pagamento);
    },

    async destroy(req,res){
        await Imposto.findByIdAndRemove(req.params.id);
        return res.send({msg:"Folha de Pagamento excluida com sucesso"});
    },

}
