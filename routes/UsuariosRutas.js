const { Router } = require('express');
const { check } = require('express-validator');
const { validarDatosIn } = require('../middlewares/validarCampos');

const { usuariosGet,
  usuariosPut,
  usuarioPatch,
  usuarioDelete,
  usuarioPost } = require('../constrollers/UsuariosControl');
  const { rolValido, Exci, Exmail, ExUSerID } = require('../helpers/dbValidators');
  
const router = Router();

router.get('/', usuariosGet);

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
  check('usu_email', 'el correo no es válido').isEmail(),
  check('usu_ci').custom( Exci ),
  check('usu_email').custom( Exmail ),
  check('usu_cargo').custom( rolValido),
  validarDatosIn
], usuarioPost);

router.delete('/:xid',[
  check('id', "Campo no valido!!!").isEmpty(),
  check('xid').custom(ExUSerID),
  validarDatosIn
], usuarioDelete);

router.patch('/', usuarioPatch);


  module.exports = router;