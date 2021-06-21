const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const enviarEmail = require('../handlers/email');

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


//genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    //verificar que un usuario existe
    const {email} = req.body
    const usuario = await Usuarios.findOne({where: {email}});

    //sino existe el usuario
    if (!usuario) {
        req.flash('error','No existe esa cuenta');
        res.redirect('/restablecer');
    }
    //el usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;
    await usuario.save(); //guardo en la bd token y expiracion

    //url de reset
    const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

    //Enviar el correo con el token
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo : 'restablecer-password'
    });

    //terminar ejecucion
    req.flash('correcto','Se envio un mensaje a tu correo');
    res.redirect('/iniciar-sesion');
}

exports.validarToken = async (req,res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });
    //suno encuentra el usuario
    if(!usuario){
        req.flash('error', 'No Válido');
        res.redirect('/restablecer');
    }

    //formulario para generar el password
    res.render('resetPassword',{
        nombrePagina: 'Resablecer Contraseña'
    })
}

//cambia el password  por uno nuevo
exports.actualizarPassword = async (req,res) => {
    //verifica token valido y fecha de expiracion
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });
    //verificamos si el usuario existe
    if(!usuario){
        req.flash('error', 'No Válido');
        res.redirect('/restablecer');
    }
    //hashear el nuevo password
    usuario.token = null;
    usuario.expiracion = null;
    usuario.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));

    //guardamos el nuevo password
    await usuario.save();
    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
}