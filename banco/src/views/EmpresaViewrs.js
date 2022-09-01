
module.exports = {
    render(Empresa){
        return{
                _id:Empresa._id,
                name: Empresa.name,
                area: Empresa.area,
                contrato: Empresa.contrato,
        };
    },
    renderMany(empresas){
        return empresas.map(Empresa=>this.render(Empresa))
    }
}