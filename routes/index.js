const express = require('express');
const router = express.Router();

//importar express validator
const {body} = require('express-validator');

//importamos el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

 
module.exports = function(){
    //ruta para el home
    router.get('/',
        authController.usuarioAuntenticado,
        proyectosController.proyectosHome
    );
    router.get('/nuevo-proyecto',
        authController.usuarioAuntenticado,
        proyectosController.formularioProyecto
    );
    router.post('/nuevo-proyecto',
        authController.usuarioAuntenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);
    //listar proyectos
    router.get('/proyectos/:url',
        authController.usuarioAuntenticado,
        proyectosController.proyectosPorUrl
    );

    //Actualizar Proyecto
    router.get('/proyecto/editar/:id',
        authController.usuarioAuntenticado,
        proyectosController.formularioEditar
    );

    router.post('/nuevo-proyecto/:id',
        authController.usuarioAuntenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);

    //Eliminar Proyecto
    router.delete('/proyectos/:url',
        authController.usuarioAuntenticado,
        proyectosController.eliminarProyecto
    );

    //Tareas
    router.post('/proyectos/:url',
        authController.usuarioAuntenticado,
        tareasController.agregarTarea
    ); 
    
    //Actualizar tarea
    router.patch('/tareas/:id',
        authController.usuarioAuntenticado,
        tareasController.cambiarEstadoTarea
    );

    //Eliminar Tarea
    router.delete('/tareas/:id',
        authController.usuarioAuntenticado,
        tareasController.eliminarTarea
    );

    //crear nueva cuenta
    router.get('/crear-cuenta',usuariosController.formCrearCuenta);
    router.post('/crear-cuenta',usuariosController.crearCuenta);
    
    //Iniciar sesion
    router.get('/iniciar-sesion',usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion',authController.autenticarUsuario);

    //cerrar sesion
    router.get('/cerrar-sesion',authController.cerrarSesion);

    return router;
}