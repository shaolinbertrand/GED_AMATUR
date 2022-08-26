const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    telefone:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    CPF: {
        type: String,
        required: true,
    },
    cargo:{
        type: String,
        required: true,
    },
    admin:{
        type: Boolean,
        required: true
    },
    ativo:{
        type: Boolean,
        required: true
    },
    createdAt:{
        type: Date,
        defaut: Date.now,
    },
});

UserSchema.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);