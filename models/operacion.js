const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');

const Operacion = db.define('operacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tip_descri: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tip_tipo: {
        type: DataTypes.STRING
    },
    tip_estado: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = Operacion;