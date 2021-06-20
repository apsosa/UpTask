const passport = require('passport');
exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});


//Funcion para revisar si el usuario esta logueado o no
exports.usuarioAuntenticado = (req,res,next) => {
    //si el usuario esta autenticado, adelante
    if (req.isAuthenticated()) {
        return next();
    }
    //sino esta autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
}


//funcion para cerrar sesion
exports.cerrarSesion = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion'); //al cerrar sesion nos lleva al login
    })
}