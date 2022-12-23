const { Router } = require('express');
const { check } = require('express-validator');
const { 
        crearDetGasto,
        detGastoPagina,
        detGastoid,
        detGasUpdate,
        BorrarDetGasto,
        buscarTipo
} = require('../constrollers/infogastos');

const { existeDetGas } = require('../helpers/dbValidators');
const { validarJWT } = require('../middlewares/validarjwt');
const { validarDatosIn, tieneRol } = require('../middlewares');


const router = Router();

// obtener todas las categorias paginados
router.get('/', detGastoPagina);

// obtener todas las categorias por id
router.get('/:id',[
    check('id').custom( existeDetGas),
    validarDatosIn
],
detGastoid);


router.get('/buscar/tipo/:termino', buscarTipo)

// crear categorias - privado por token valido
router.post('/', [ 
    validarJWT,
    check('dgas_id', 'El nombre IdGasto es obligatorio').not().isEmpty(),
    check('dgas_monto', 'El Monto del Gasto es obligatorio').not().isEmpty(),
    check('dgas_tipo', 'El Tipo del Gasto es obligatorio').not().isEmpty(),
    validarDatosIn
], crearDetGasto);

// obtener todas las categorias paginados
router.put('/:id',[
    validarJWT,
    check('xid').custom( existeDetGas),
    check('dgas_id', 'El nombre IdGasto es obligatorio').not().isEmpty(),
], detGasUpdate);

// obtener todas las categorias paginados
router.delete('/:xid',[
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', "Campo no valido!!!").isEmpty(),
    check('xid').custom( existeDetGas),
    validarDatosIn
],
BorrarDetGasto);



module.exports = router;