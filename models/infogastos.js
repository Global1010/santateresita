const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');
const Gastos = require('./gastos');
const Usuario = require('./usuario');

const Detagastos = db.define('detagastos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dgas_id: {
        type: DataTypes.STRING
    },
    dgas_fecha: {
        type: DataTypes.DATE
    },
    dgas_monto: {
        type: DataTypes.NUMBER
    },
    dgas_obs: {
        type: DataTypes.STRING
    },
    dgas_user: {
        type: DataTypes.STRING
    },
    dgas_estado: {
        type: DataTypes.NUMBER,
        default: 0
    },
    dgas_tipo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fotos: {
        type: DataTypes.STRING,
        defaultValue: "logo1.png"
    }

});
Detagastos.belongsTo(Gastos,{foreignKey:'dgas_id',as:'ref_gastos'})
Detagastos.belongsTo(Usuario,{foreignKey:'dgas_user',as:'ref_Usuario'})
module.exports = Detagastos;