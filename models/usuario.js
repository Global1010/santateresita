const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');

const Usuario = db.define('Usuarios', {
    id: {
        type: DataTypes.INET,
        primaryKey: true
    },
    usu_nombre: {
        type: DataTypes.STRING
    },
    usu_ci: {
        type: DataTypes.NUMBER,
        unique: true
    },
    usu_password: {
        type: DataTypes.STRING
    },
    usu_cargo: {
        type: DataTypes.STRING,
        defaultValue: 'USER_ROL'
    },
    usu_telefo: {
        type: DataTypes.STRING
    },
    usu_email: {
        type: DataTypes.STRING
    },
    usu_fecnac: {
        type: DataTypes.DATE
    },
    usu_estado: {
        type: DataTypes.BOOLEAN
    }
    
});

Usuario.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    values.uid = values.id
    delete values.usu_password;
    delete values.id;
    return values;
  }

module.exports = Usuario;