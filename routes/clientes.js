const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearCliente,
    clientePaginado,
    clienteid,
    ActualizaClie,
    BorrarCliente
} = require('../constrollers/clientes');

const { existeProducto, existeClie } = require('../helpers/dbValidators');
const { validarJWT } = require('../middlewares/validarjwt');
const { validarDatosIn, tieneRol } = require('../middlewares');


const router = Router();

// crear Clientes - privado por token valido
router.post('/', [ 
    validarJWT,
    check('cli_nombre', 'El nombre del cliente es obligatorio').not().isEmpty(),
    check('cli_apelli', 'El Apellido del cliente es obligatorio').not().isEmpty(),
    check('cli_direcc', 'El Telefono del cliente es obligatorio').not().isEmpty(),
    validarDatosIn
], crearCliente);




// obtener todas las categorias paginados
router.get('/', clientePaginado);

// obtener todas las categorias por id
router.get('/:id',[
    check('id').custom( existeClie),
    validarDatosIn
],
clienteid);


// obtener todas las categorias paginados
router.put('/:xid',[
    validarJWT,
    check('id').custom( existeClie),
    validarDatosIn
], ActualizaClie);

// obtener todas las categorias paginados
router.delete('/:xid',[
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', "Campo no valido!!!").isEmpty(),
    check('xid').custom( existeClie),
    validarDatosIn
],
BorrarCliente);



module.exports = router;