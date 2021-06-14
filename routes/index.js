const express = require('express');

const router = express.Router();

//Importar express validator

const { body } = require('express-validator');

//Importación del controlador

const proyectosController = require('../controllers/proyectosController');

const tareasController = require('../controllers/tareasController');

module.exports = function () {

    // Ruta para el inicio

    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    //Listar proyecto

    router.get('/proyectos/:url', proyectosController.proyectoPorURL)

    //Actualizar el proyecto

    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);

    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    //Eliminar proyecto

    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

    //Tareas

    router.post('/proyectos/:url', tareasController.agregarTarea);

    //Update tarea 

    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea)

    return router;

}