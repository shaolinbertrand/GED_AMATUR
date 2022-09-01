
module.exports = {
    render(Contrato){
        return{
                numero:Contrato.numero,
                name: Contrato.name,
                tipoValidade: Contrato.tipoValidade,
                url:Contrato.url
        };
    },
    renderMany(contratos){
        return contratos.map(Contrato=>this.render(Contrato))
    }
}