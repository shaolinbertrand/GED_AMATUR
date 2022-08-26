
module.exports = {
    render(log){
        return{
            nome: log.nome,
            dia: log.dia,
            hora: log.hora,
            acao:log.acao,
        };
    },
    renderMany(logs){
        return logs.map(log=>this.render(log))
    }
}