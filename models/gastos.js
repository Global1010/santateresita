const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');
const Usuario = require('./usuario');

const Gastos = db.define('gastos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    gas_descri: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gas_estado: {
        type: DataTypes.BOOLEAN
    },
    gas_user: {
        type: DataTypes.STRING
    }
});
Gastos.belongsTo(Usuario,{foreignKey:'gas_user',as:'ref_Usuario'})

module.exports = Gastos;