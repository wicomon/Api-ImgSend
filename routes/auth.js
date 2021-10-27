const express = require('express');
const { check } = require('express-validator');
const { usuarioAutenticado, login } = require('../controllers/authController');
const auth = require('../middlewares/auth');
const { validarCampos } = require('../middlewares/validarCampos');


const router = express.Router();

// router.use(auth);

router.get('/',
    [
        auth
    ],
    usuarioAutenticado
)

router.post('/',
    [
        check('email', 'Email no valido').isEmail(),
        check('password', 'El nombre es Obligatorio').isLength({min: 6}),
        validarCampos
    ],
    login
);


module.exports = router;