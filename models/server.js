
const express = require('express');
const cors = require('cors');
const { db } = require('../database/config');

class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'

        // conectar a la Base de Datos
        this,this.dbConnection();

        //middlewares
        this.middlewares();

        // Rutas de mi Aplicacion
        this.routes();
    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database onLine');

        } catch (err) {
            console.error('Error en la Conexion de la DB:');
        }
    }

    middlewares() {

        
        //proteccion de peticiones - CORS
        this.app.use( cors() );
        
        // lectura y paseo del body
        this.app.use( express.json() );
        
        // directorio publico
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.usuarioPath , require('../routes/UsuariosRutas'));
     //   this.app.use(this.usuarioPath , require('../routes/UsuariosRutas'));
     //   this.app.use(this.usuarioPath , require('../routes/UsuariosRutas'));
     //   this.app.use(this.usuarioPath , require('../routes/UsuariosRutas'));
     //   this.app.use(this.usuarioPath , require('../routes/UsuariosRutas'));
    }
    lsitem() {
        this.app.listen(this.port, () => {
            console.log('Servidor de App Corriendo en pierto', this.port);
        });
    }
}





module.exports = Server;