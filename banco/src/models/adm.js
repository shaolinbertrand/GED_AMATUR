const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const AdmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    telefone:{
        type: String,
        required: false,
    },
    CPF: {
        type: String,
        required: true,
    },
    registro:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: false
    },
    documento:{
        type: Array,
        required: false,
    },
    createdAt:{
        type: Date,
        defaut: Date.now,
    },
});

AdmSchema.plugin(mongoosePaginate);

mongoose.model('ADM', AdmSchema);