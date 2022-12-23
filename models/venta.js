const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');
const Usuario = require('./usuario');
const Operacion = require('./operacion');

const Venta = db.define('ventas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ven_fecha: {
        type: DataTypes.DATE
    },
    ven_tipcon: {
        type: DataTypes.NUMBER
    },
    ven_cliente: {
        type: DataTypes.NUMBER
    },
    ven_vende: {
        type: DataTypes.NUMBER
    },
    ven_descue: {
        type: DataTypes.NUMBER
    },
    ven_factu: {
        type: DataTypes.NUMBER
    },
    ven_tolven: {
        type: DataTypes.NUMBER
    },
    ven_obs: {
        type: DataTypes.STRING
    },
    ven_estado: {
        type: DataTypes.NUMBER
    }
});
Venta.belongsTo(Usuario,{foreignKey:'ven_vende',as:'ref_Usuvende'})
Venta.belongsTo(Operacion,{foreignKey:'ven_tipo',as:'ref_tipo'})

module.exports = Venta;