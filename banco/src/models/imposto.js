const mongoose = require('mongoose');


const impostoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    periodo: {
        type: String,
        required: true,
    },
    NumParc:{
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
impostoSchema.pre('save',function(){
    if (this.url){
        this.url = `http://192.168.10.146:3001/files/${this.namebanco}`;
    }
});


module.exports = mongoose.model('Imposto', impostoSchema);