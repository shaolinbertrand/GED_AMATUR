const mongoose = require('mongoose');


const contratoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    numero: {
        type: Number,
        required: true,
    },
    tipoValidade:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        reuired: true,
    },
    namebanco:{
        type:String,
        required: true,
    },
    IdEmpresa:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        defaut: Date.now,
    }

});
contratoSchema.pre('save',function(){
    if (this.url){
        this.url = `http://192.168.0.23:3001/files/${this.namebanco}`;
    }
});


module.exports = mongoose.model('Contrato', contratoSchema);