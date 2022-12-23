const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../constrollers/subirArchivo');
const { tablasPermitidas } = require('../helpers');

const { validarDatosIn, validarArchivoSubir } = require('../middlewares');



const router = Router();


router.post('/',validarArchivoSubir,cargarArchivo);


router.put('/:tabla/:id',[
    validarArchivoSubir,
    check('tabla').custom(c => tablasPermitidas( c, ['usuarios', 'GASTOS', 'productos'])),
    validarDatosIn
], actualizarImagen)

router.get('/:tabla/:id',[
    check('tabla').custom(c => tablasPermitidas( c, ['usuarios', 'GASTOS', 'productos'])),
    validarDatosIn
], mostrarImagen)


module.exports = router