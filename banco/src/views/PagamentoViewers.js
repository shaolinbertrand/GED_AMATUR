
module.exports = {
    render(Pagamento){
        return{
                ano:Pagamento.ano,
                mes: Pagamento.mes,
                _id:Pagamento._id,
                documento:Pagamento.documento
        };
    },
    renderMany(pagamentos){
        return pagamentos.map(Pagamento=>this.render(Pagamento))
    }
}