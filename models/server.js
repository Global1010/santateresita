
const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'
        //middlewares
        this.middlewares();


        // Rutas de mi Aplicacion
        this.routes();
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