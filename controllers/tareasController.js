const { request, response } = require('express');
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const { default: tareas } = require('../public/js/modulos/tareas');

exports.agregarTarea = async (request, response) => {

    //Traemos el proyecto "padre" o donde vamos a pararnos.
    const proyecto = await Proyectos.findOne({

        where: {
            url: request.params.url}});

    //Leer el input/recibido

    const {tarea} = request.body;

    //Estado default = incompleto. ID del proyecto

    const estado = 0;

    const proyectoId = proyecto.id;

    //Inserción a DB

    const resultado = await Tareas.create({tarea, estado, proyectoId});

    if(!resultado) {

        return next();
    }
    
    //Redireccionar

    response.redirect(`/proyectos/${request.params.url}`);

}

exports.cambiarEstadoTarea = async (request, response) => {

    const {id} = request.params;

    const tarea = await Tareas.findOne({where: {id: id}});

    //Cambiar estado

    let estado = 0;

    if(tarea.estado === estado){

        estado = 1;

    }

    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    response.status(200).send('Everything good');
    
}