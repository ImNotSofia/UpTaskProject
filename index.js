const express = require('express'); 

const routes = require('./routes');

const path = require('path');

const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

//Conexión a helpers con algunas funciones

const helpers = require('./helpers');

//Crear la conexión a la Data Base

const db = require('./config/db');

//Importación modelos:

require('./models/Proyectos');

require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

//Crear una aplicación de exspress.

const app = express();

//Donde cargar los archivos... ¿estaticos?

app.use(express.static ('public'));

//Habilitar Pug

app.set('view engine', 'pug');

//Añadir carpeta de vistas

app.set('views', path.join(__dirname, './views'));

//Pasar var dump a la aplicación

app.use((request, response, next) => {
    response.locals.vardump = helpers.vardump;   
    next(); 
});

//Habilitar bodyParser para leer los datos del formulario

app.use(express.urlencoded({extended: true}));

//Agregamos express validator a toda la aplicación

app.use(express.json());

//Ruta enviada a routes

app.use('/', routes() );

app.listen(3000); //Puerto. Investigar.