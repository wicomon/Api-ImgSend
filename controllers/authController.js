const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    
    const {email, password} = req.body;

    
    const usuario = await Usuario.findOne({email});
    
    if (!usuario) {
        return res.status(400).json({
            msg : 'no existe el email '
        })
    }
    
    // verificar la contraseña
    const validarPassword = bcrypt.compareSync(password, usuario.password);

    if (!validarPassword) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password 2',
        })
    }

    // crear JWT
    const token = jwt. sign({
        nombre : usuario.nombre,
        id: usuario._id,
        email: usuario.email    
    }, process.env.SECRETA, {
        expiresIn : '8h'
    });
    
    res.json({
        msg : token
    })
}

const usuarioAutenticado = (req, res) => {
    return res.json({usuario : req.usuario});
}

module.exports = {
    login,
    usuarioAutenticado
}