
module.exports = {
    render(user){
        return{
            _id: user._id,
            nome: user.nome,
            senha: user.password,
            telefone: user.telefone,
            CPF: user.CPF,
            cargo:user.cargo,
        };
    },
    renderMany(users){
        return users.map(user=>this.render(user))
    }
}