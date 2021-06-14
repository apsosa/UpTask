const express = require('express');
const routes = require('./routes');
const path  = require('path');
//crear una app de express
const app = express();

//Donde cargar los archivos estaticos (css)
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine','pug');

//Añadimos la carpeta de las vistas
app.set('views',path.join(__dirname,'./views'));

app.use('/',routes());

//le decis que puerto queremos que escuche o se conecte
app.listen(3000);
