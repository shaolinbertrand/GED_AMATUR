require("dotenv").config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const requireDir = require("require-dir");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const logger = require("./src/logger");
const pinoHttp = require("pino-http")({ logger });

//iniciando o App
const app = express();
//app.use(pinoHttp);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname,'src','upload')))


// Iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi',
 {useNewUrlParser: true,useUnifiedTopology: true}
 );
 requireDir("./src/models");


//primeira rota
app.use('/api',require("./src/routes"));
logger.debug('Calling res.send');


app.listen(3001,()=>{
    logger.info('Servidor esta disponivel na porta 3001');
});
