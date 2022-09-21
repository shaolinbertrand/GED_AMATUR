
module.exports = {
    render(Imposto){
        return{
                name: Imposto.name,
                periodo: Imposto.periodo,
                NumParc: Imposto.NumParc,
                url:Imposto.url,
                _id: Imposto._id
        };
    },
    renderMany(impostos){
        return impostos.map(Imposto=>this.render(Imposto))
    }
}