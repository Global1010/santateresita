const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');

const Productos = db.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pro_descri: {
        type: DataTypes.STRING
    },
    pro_barra: {
        type: DataTypes.STRING
    },
    pro_aplica: {
        type: DataTypes.STRING
    },
    pro_cantidad: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    pro_precos: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    pro_premin: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    pro_preven: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    pro_distri: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    pro_estado: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    pro_tipiva : {
        type: DataTypes.NUMBER,
        defaultValue: "I"
    },
    pro_tipval : {
        type: DataTypes.NUMBER,
        defaultValue: 10
    },
    pro_posic : {
        type: DataTypes.STRING
    },
    pro_marca: {
        type: DataTypes.NUMBER,
        defaultValue: 1
    },
    pro_agrupa: {
        type: DataTypes.NUMBER,
        defaultValue: 1
    },
    pro_unimet: {
        type: DataTypes.NUMBER,
        defaultValue: 1
    },
    pro_envlis:{
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    usu_fotos:{
        type: DataTypes.STRING,
        defaultValue: "logo1.png"
    }
    
    
});

Productos.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    values.pid = values.id
    delete values.id;
    return values;
  }

module.exports = Productos;