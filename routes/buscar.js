const { Router } = require('express');
const { buscar } = require('../constrollers/buscar');




const router = Router();


router.get('/:coleccion/:termino', buscar)


module.exports = router;