const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const nuevoUsuario = async (req, res) => {
    
    const {email, password} = req.body;

    let usuario = await Usuario.findOne({email});
    
    if (usuario) {
        return res.status(400).json({
            msg : 'Usuario ya registrado'
        })
    }
    
    usuario = await new Usuario(req.body);

    // hashera el password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    usuario.save();
    
    return res.json({
        msg : 'Usuario creado correctamente'
    })

    

}

module.exports = {
    nuevoUsuario
}