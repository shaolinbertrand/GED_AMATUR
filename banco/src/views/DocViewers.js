
module.exports = {
    render(Documento){
        return{
                name: Documento.name,
                DataUpload: Documento.DataUpload,
                url:Documento.url,
                id:Documento._id
        };
    },
    renderMany(documentos){
        return documentos.map(Documento=>this.render(Documento))
    }
}