const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');

const Clientes = db.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cli_nombre: {
        type: DataTypes.STRING
    },
    cli_apelli: {
        type: DataTypes.STRING
    },
    cli_cedula: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
    },
    cli_direcc: {
        type: DataTypes.STRING,
    },
    cli_telefo: {
        type: DataTypes.DECIMAL
    },
    cli_fecnac: {
        type: DataTypes.DATE
    },
    cli_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    cli_ruc: {
        type: DataTypes.STRING
    },
    cli_razon: {
        type: DataTypes.STRING
    },
    cli_email : {
        type: DataTypes.STRING,
        unique: true
    },
    cli_limite : {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    cli_distri : {
        type: DataTypes.BOOLEAN
    }  
    
});

Clientes.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    values.cid = values.id
    delete values.id;
    return values;
  }

module.exports = Clientes;