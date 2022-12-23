
const express = require('express');
const cors = require('cors');
const { db } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT;
       
       this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
            productos:  '/api/productos',
            clientes:   '/api/clientes',
            infocobro:  '/api/infocobros',
            infogastos: '/api/infogastos',
            infotipo:   '/api/tipo',
            uploads:   '/api/uploads',
            venta:   '/api/venta'
        }
       
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

        //cargar de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/usaurioauth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios , require('../routes/UsuariosRutas'));
        this.app.use(this.paths.productos , require('../routes/productos'));
        this.app.use(this.paths.clientes , require('../routes/clientes'));
        this.app.use(this.paths.infocobro , require('../routes/infocaja'));
        this.app.use(this.paths.infogastos , require('../routes/infogastos'));
        this.app.use(this.paths.infotipo , require('../routes/infogastos'));
        this.app.use(this.paths.uploads , require('../routes/subirArchi'));
        this.app.use(this.paths.venta , require('../routes/venta'));

    }
    lsitem() {
        this.app.listen(this.port, () => {
            console.log('Servidor de la Coporación ISG Corriendo en puerto', this.port);
        });
    }
}





module.exports = Server;