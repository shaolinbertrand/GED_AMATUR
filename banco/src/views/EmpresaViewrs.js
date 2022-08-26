
module.exports = {
    render(Empresa){
        return{
                contrato: Empresa.contrato,
                _id:Empresa._id,
                name: Empresa.name,
                area: Empresa.area,
        };
    },
    renderMany(empresas){
        return empresas.map(Empresa=>this.render(Empresa))
    }
}