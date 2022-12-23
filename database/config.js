const { Sequelize }  = require('sequelize');

const db = new Sequelize(process.env.DB, process.env.USERX,process.env.PASS, {
            host: process.env.MYSQL_CNN,
            dialect: 'mysql',
            logging: false 
        });

         console.log('Base de Datos de la Corporacion en Linea');
         
module.exports = {
    db
}