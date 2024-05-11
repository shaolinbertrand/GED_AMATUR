
module.exports = {
    render(Agencia){
        return{
                caixa: Agencia.caixa,
                _id:Agencia._id,
                name: Agencia.name,
        };
    },
    renderMany(agencias){
        return agencias.map(Agencia=>this.render(Agencia))
    }
}