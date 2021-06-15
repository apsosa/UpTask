exports.proyectosHome = (req,res) =>{
    res.render('index',{
        nombrePagina : 'Proyectos'
    });
}

exports.formularioProyecto = (req,res) =>{
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyecto = (req,res) =>{
    //Enviar a la consolda lo que el usuario escriba
    // console.log(req.body);

    //validar que tengamos algo en el input
    const {nombre} = req.body;
    let errores = [];
    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'});
    }
    //si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto',{
            nombrePagina : 'Nuevo Proyecto',
            errores
        })
    }
}