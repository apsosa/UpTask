const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt');

const Usuarios = db.define('usuarios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull : false,
        validate: {
            isEmail: {
                msg : 'Agrega una direccion de Email Valida'
            },
            notEmpty: {
                msg : 'El e-mail no puede ser vacio'
            }
        },
        unique: {
            msg: 'Usuario ya registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull : false,
        validate:{
            notEmpty: {
                msg: 'El password no puede ir vacio'
            }
        }
    }
},{
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

//Metodos personalizados
Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
}

// Usuarios.hasMany(Proyectos);
module.exports = Usuarios;