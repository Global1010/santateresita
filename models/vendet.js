
const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');
const Venta = require('./venta');

const Ventadet = db.define('ventadets', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vdt_nro: {
        type: DataTypes.NUMBER
    },
    vdt_produc: {
        type: DataTypes.NUMBER
    },
    vdt_canti: {
        type: DataTypes.NUMBER
    },
    vdt_precio: {
        type: DataTypes.NUMBER
    },
    vdt_tiva: {
        type: DataTypes.STRING
    },
    vdt_ival: {
        type: DataTypes.NUMBER
    },
    vdt_costo: {
        type: DataTypes.NUMBER
    }
});
Ventadet.belongsTo(Venta,{foreignKey:'vdt_nro',as:'ref_Venta'})


module.exports = Ventadet;




