const express = require('express');
const routes = require('./routes');
const path  = require('path');
// const bodyparser = require(body-parser);
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');


//helpers con algunas funciones
const helpers = require('./helpers');

//Crear la conexion a la BD
const db = require('./config/db');


//importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then(()=> console.log('Conectado al Servidor'))
    .catch(error => console.log(error));
//crear una app de express
const app = express();
//Donde cargar los archivos estaticos (css)
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine','pug');


//habilitar bodyparser para leer datos del formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());



//Añadimos la carpeta de las vistas
app.set('views',path.join(__dirname,'./views'));

//agregar flash messages
app.use(flash());

app.use(cookieParser());

//sessiones nos permite navegar entre istintas paginas sin volvernos a autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}))
//Pasar var dump
app.use((req,res,next)=>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});



app.use('/',routes());

//le decis que puerto queremos que escuche o se conecte
app.listen(3000);
