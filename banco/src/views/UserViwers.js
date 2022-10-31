
module.exports = {
    render(user){
        return{
            _id: user._id,
            nome: user.nome,
            senha: user.password,
            setor: user.setor,
            CPF: user.CPF,
            cargo:user.cargo,
            ativo:user.ativo
        };
    },
    renderMany(users){
        return users.map(user=>this.render(user))
    }
}