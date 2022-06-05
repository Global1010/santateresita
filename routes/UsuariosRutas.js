const { Router } = require('express');
const { usuariosGet,
        usuariosPut,
        usuarioPatch,
        usuarioDelete,
        usuarioPost } = require('../constrollers/UsuariosControl');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuarioPost);

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);


  module.exports = router;