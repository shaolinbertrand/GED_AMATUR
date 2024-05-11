const mongoose = require('mongoose');


const caixaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dia: {
        type: Number,
        required: true,
    },
    mes:{
        type: Number,
        required: true,
    },
    ano:{
        type: Number,
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
    IdAgencia:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        defaut: Date.now,
    }

});
caixaSchema.pre('save',function(){
    if (this.url){
        this.url = `http://192.168.10.119:3001/files/${this.namebanco}`;
    }
});


module.exports = mongoose.model('CAIXA', caixaSchema);