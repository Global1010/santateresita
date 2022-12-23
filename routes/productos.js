const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearProducto,
    productoPaginado,
    productoid,
    ActualizaProdu,
    BorrarProducto
} = require('../constrollers/productos');

const { existeCategoria, existeProducto } = require('../helpers/dbValidators');
const { validarJWT } = require('../middlewares/validarjwt');
const { validarDatosIn, tieneRol } = require('../middlewares');


const router = Router();

// crear categorias - privado por token valido
router.post('/', [ 
    validarJWT,
    check('pro_descri', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarDatosIn
], crearProducto);




// obtener todas las categorias paginados
router.get('/', productoPaginado);

// obtener todas las categorias por id
router.get('/:id',[
    check('id').custom( existeProducto),
    validarDatosIn
],
productoid);


// obtener todas las categorias paginados
router.put('/:id',[
    validarJWT,
    check('id').custom( existeProducto),
    check('pro_descri', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarDatosIn
], ActualizaProdu);

// obtener todas las categorias paginados
router.delete('/:xid',[
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', "Campo no valido!!!").isEmpty(),
    check('xid').custom( existeProducto),
    validarDatosIn
],
BorrarProducto);



module.exports = router;