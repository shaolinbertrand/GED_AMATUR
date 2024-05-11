const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const AgenciaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    caixa:{
        type: Array,
        required: false,
    },
    createdAt:{
        type: Date,
        defaut: Date.now,
    }
});

AgenciaSchema.plugin(mongoosePaginate);

mongoose.model('AGENCIA', AgenciaSchema);