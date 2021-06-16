const Proyectos = require('../models/Proyectos');
const slug = require('slug');


exports.proyectosHome = async(req,res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('index',{
        nombrePagina : 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async(req,res) =>{
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async(req,res) =>{
    const proyectos = await Proyectos.findAll();
    //Enviar a la consolda lo que el usuario escriba
    // console.log(req.body);

    //validar que tengamos algo en el input
    const {nombre} = req.body;
    let errores = [];
    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'});
    }
    //si hay errores
    try {
        
        const proyecto = await Proyectos.create({nombre});    
        res.rediret('/');
    } catch (error) {
        res.render('nuevoProyecto',{
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }
}

exports.proyectosPorUrl = async(req,res,next) => {
    const proyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where:{
            url : req.params.url
        }
    });

    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

    if (!proyecto) return next();
    
    //render a la vista
    res.render('tareas',{
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async(req,res)=>{
    //render a la vista
    const proyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where:{
            id : req.params.id
        }
    });

    const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);

    res.render('nuevoProyecto',{
        nombrePagina : 'Editar Proyecto',
        proyectos,
        proyecto
    })
}


exports.actualizarProyecto = async(req,res) =>{
    const proyectos = await Proyectos.findAll();
    //Enviar a la consolda lo que el usuario escriba
    // console.log(req.body);

    //validar que tengamos algo en el input
    const {nombre} = req.body;
    let errores = [];
    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'});
    }
    //si hay errores
    try {
        
        await Proyectos.update(
            {nombre},
            {where: {id: req.params.id}}
            );    
        res.rediret('/');
    } catch (error) {
        res.render('nuevoProyecto',{
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }
}
