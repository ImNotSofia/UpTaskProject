const { request, response } = require('express');
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (request, response) => {

    const proyectos = await Proyectos.findAll();

    response.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });

}

exports.formularioProyecto = async (request, response) => {

    const proyectos = await Proyectos.findAll();

    response.render('nuevoProyecto', { 
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });

}

exports.nuevoProyecto = async (request, response) => {

    const proyectos = await Proyectos.findAll();

    //Enviar a la consola lo que el usuario escriba.

    //Validar que tengamos algo en el input

    const nombre = request.body.nombre;

    let errores = [];

    if (!nombre) {
        errores.push({'texto': 'Agregue un nombre al proyecto'})
    }

    //Si hay errores

    if (errores.length > 0){
        response.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores, 
            proyectos
        })

    } else {

        //No hay errores
        //Insertar en la Data Base

        await Proyectos.create({ nombre });
        response.redirect('/');
        
    }
}

exports.proyectoPorURL = async (request, response, next) => {
    
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        
        where: {
            url: request.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Tareas del proyecto actual

    const tareas = await Tareas.findAll({
        
        where: {
            proyectoId : proyecto.id
        }
    });

    

    if(!proyecto) return next();

    response.render('tareas', {

        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async (request, response) => {

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
            where: {
                id: request.params.id
            }

    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Render a la vista

    response.render('nuevoProyecto', {
        nombrePagina : 'Editar proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (request, response) => {

    //Side bar

    const proyectos = await Proyectos.findAll(); 

    //Enviar a la consola lo que el usuario escriba.

    //Validar que tengamos algo en el input

    const nombre = request.body.nombre;

    let errores = [];

    if (!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    //Si hay errores

    if (errores.length > 0){
        response.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores, 
            proyectos
        })

    } else {

        //No hay errores
        //Insertar en la Data Base

        await Proyectos.update(
            { nombre : nombre },
            { where : {id: request.params.id}}
            );
        response.redirect('/');
        
    }
}


exports.eliminarProyecto = async (request, response, next) => {

    //Request = query or params

    const {urlProyecto} = request.query;

    const resultado = await Proyectos.destroy({where: { url : urlProyecto}});

    if(!resultado) {

        return next();

    }

    response.status(200).send('Proyecto eliminado correctamente');

}