const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const EmpresaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    area:{
        type: String,
        required: false,
    },
    contrato:{
        type: Array,
        required: false,
    },
    createdAt:{
        type: Date,
        defaut: Date.now,
    }
});

EmpresaSchema.plugin(mongoosePaginate);

mongoose.model('EMPRESA', EmpresaSchema);