const express = require('express');
const { subirArchivo, descargarArchivo, eliminarArchivo} = require('../controllers/archivosController');
const auth = require('../middlewares/auth');
const { validarCampos } = require('../middlewares/validarCampos');



const router = express.Router();

router.post('/',
    [
        auth
    ],
    subirArchivo
);

router.get('/:archivo',
    descargarArchivo,
    eliminarArchivo
);

module.exports = router;