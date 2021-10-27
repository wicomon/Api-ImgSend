const express = require('express');
const { check } = require('express-validator');
const { nuevoUsuario } = require('../controllers/usuarioController');
const { validarCampos } = require('../middlewares/validarCampos');

const router = express.Router();

router.post('/',
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'Email no valido').isEmail(),
        check('password', 'El nombre es Obligatorio').isLength({min: 6}),
        validarCampos
    ],
    nuevoUsuario
);


module.exports = router;