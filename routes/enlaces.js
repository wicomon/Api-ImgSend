const express = require('express');
const { check } = require('express-validator');
const { nuevoEnlace, obtenerEnlace, todosEnlaces, verificarPassword} = require('../controllers/enlacesController');
const { eliminarArchivo } = require('../controllers/archivosController');
const auth = require('../middlewares/auth');
const tienePassword = require('../middlewares/pswrdCheck');
const { validarCampos } = require('../middlewares/validarCampos');

const router = express.Router();

router.post('/',
    [
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmpty(),
        auth,
        validarCampos
    ],
    nuevoEnlace
);

router.get('/',
    todosEnlaces
);

router.get('/:url',
    [
        tienePassword
    ],
    obtenerEnlace,
    // eliminarArchivo
);

router.post('/:url',
    verificarPassword,
    obtenerEnlace
);


module.exports = router;