const { Router } = require('express');
const { check } = require('express-validator');
const { 
        crearCategoria,
        categoriaPaginado,
        categoriaid,
        ActualizaCate,
        BorrarCategoria
} = require('../constrollers/categorias');

const { existeCategoria } = require('../helpers/dbValidators');
const { validarJWT } = require('../middlewares/validarjwt');
const { validarDatosIn, tieneRol } = require('../middlewares');


const router = Router();

// obtener todas las categorias paginados
router.get('/', categoriaPaginado);

// obtener todas las categorias por id
router.get('/:id',[
    check('id').custom( existeCategoria),
    validarDatosIn
],
 categoriaid);

// crear categorias - privado por token valido
router.post('/', [ 
    validarJWT,
    check('cat_descri', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarDatosIn
], crearCategoria);

// obtener todas las categorias paginados
router.put('/:id',[
    validarJWT,
    check('cat_descri', 'El nombre de la categoria es obligatorio').not().isEmpty(),

], ActualizaCate);

// obtener todas las categorias paginados
router.delete('/:xid',[
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', "Campo no valido!!!").isEmpty(),
    check('xid').custom( existeCategoria),
    validarDatosIn
],
 BorrarCategoria);



module.exports = router;