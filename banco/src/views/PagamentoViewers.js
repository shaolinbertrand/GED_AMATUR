
module.exports = {
    render(Pagamento){
        return{
                ano:Pagamento.ano,
                mes: Pagamento.mes,
                documentos:Pagamento.documentos
        };
    },
    renderMany(pagamentos){
        return pagamentos.map(Pagamento=>this.render(Pagamento))
    }
}