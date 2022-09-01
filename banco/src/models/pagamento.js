const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PagamentoSchema = new mongoose.Schema({
    mes: {
        type: String,
        required: true,
    },
    ano:{
        type: Number,
        required: true,
    },
    documentos:{
        type: Array,
        required: false,
    },
    createdAt:{
        type: Date,
        defaut: Date.now,
    }
});

PagamentoSchema.plugin(mongoosePaginate);

mongoose.model('Pagamento', PagamentoSchema);