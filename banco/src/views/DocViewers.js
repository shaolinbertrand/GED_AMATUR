
module.exports = {
    render(Documento){
        return{
                name: Documento.name,
                DataUpload: Documento.DataUpload,
                url:Documento.url
        };
    },
    renderMany(documentos){
        return documentos.map(Documento=>this.render(Documento))
    }
}