const { DataTypes }  = require('sequelize');
const { db } = require('../database/config');
const Usuario = require('./usuario');

const Categoria = db.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cat_descri: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cat_estado: {
        type: DataTypes.BOOLEAN
    },
    cat_user: {
        type: DataTypes.STRING
    }
});
Categoria.belongsTo(Usuario,{foreignKey:'cat_user',as:'ref_Usuario'})

module.exports = Categoria;