
module.exports = {
    render(adm){
        return{
                documento: adm.documento,
                _id:adm._id,
                name: adm.name,
                telefone: adm.telefone,
                CPF: adm.CPF,
                registro: adm.registro,
                email: adm.email,
        };
    },
    renderMany(adms){
        return adms.map(adm=>this.render(adm))
    }
}