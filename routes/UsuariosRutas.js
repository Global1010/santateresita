const { Router } = require('express');
const { check } = require('express-validator');

const {
  validarDatosIn,
  tieneRol
} = require('../middlewares');

const { usuariosGet,
  usuariosPut,
  usuarioDelete,
  usuarioPost } = require('../constrollers/UsuariosControl');
  const { rolValido, Exci, Exmail, ExUSerID } = require('../helpers/dbValidators');
const { validarJWT } = require('../middlewares/validarjwt');
  
const router = Router();

router.get('/', usuariosGet);

// actualizar usaurio
router.put('/:idu',[
  check('id', "Campo no valido!!!").isEmpty(),
  check('idu').custom(ExUSerID),
  validarDatosIn
], usuariosPut);


router.post('/',
[
  check('usu_nombre', 'El Nombre es Necesario').not().isEmpty(),
  check('usu_ci', 'El Nro. de la Cedula es Necesario').not().isEmpty(),
  check('usu_password', 'La Contraseña es necesario y debe de ser mas de 6 letras').isLength({ min: 6 }),
  check('usu_ci').custom( Exci ),
  check('usu_cargo').custom( rolValido),
  validarDatosIn
], usuarioPost);

// rutas de borrado
router.delete('/:xid',[ 
  validarJWT,
  //esAdmin,
  tieneRol('ADMIN_ROL','VENTAS_ROL'),
  check('id', "Campo no valido!!!").isEmpty(),
  check('xid').custom(ExUSerID),
  validarDatosIn
], usuarioDelete);

  module.exports = router;