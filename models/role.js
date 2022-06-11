const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');

const Roles = db.define('rols', {

    rol_descri: {
        type: DataTypes.STRING,
        unique: true,
    }

});

module.exports = Roles;