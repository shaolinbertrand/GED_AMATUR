const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const LogSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    idUser:{
        type: String,
        required: true,
    },
    dia:{
        type: String,
        required: true,
    },
    hora:{
        type: String,
        required: true
    },
    acao:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        defaut: Date.now,
    },
});

LogSchema.plugin(mongoosePaginate);

mongoose.model('Log', LogSchema);