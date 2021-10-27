const Enlace = require('../models/Enlace');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');


const nuevoEnlace = async (req, res) => {


    // almacenar en la BD
    const {nombre_original, nombre } = req.body;

    const enlace = new Enlace();
    enlace.url = shortid.generate();
    enlace.nombre= nombre;
    enlace.nombre_original = nombre_original;

    // usuario autenticado
    if(req.usuario){
        const { password, descargas } = req.body;
        
        if (descargas) {
            enlace.descargas = descargas;
        }
        if (password) {
            const salt = bcrypt.genSaltSync();
            enlace.password = bcrypt.hashSync(password, salt);
        }
        enlace.autor = req.usuario.id;
    }

    try {
        await enlace.save();
        return res.json({ msg: `${enlace.url}`});        
    } catch (error) {
        console.log(error);
        return res.json({
            error
        })
    }
}


const obtenerEnlace = async (req, res,next) => {
    const {url} =  req.params;

    const enlace = await Enlace.findOne({url})

    if (!enlace) {
        res.status(400).json({
            msg: 'No existe el enlace'
        })
    }
    // si el archivo existe
    res.json({archivo : enlace.nombre, password: false})
    next();

}

const todosEnlaces = async(req, res) =>{
    try {
        const enlaces = await Enlace.find({}).select('url -_id');
        res.json({enlaces})
    } catch (error) {
        console.log(error);
    }
}

const verificarPassword = async(req, res, next) =>{
    const {url} = req.params;
    const {password} = req.body;

    const enlace = await Enlace.findOne({url})

    if (bcrypt.compareSync(password, enlace.password)) {
        // permitirle al usuario descargar el archivo
        next();
    }else{
        return res.status(401).json({
            msg: 'password incorrecto 1'
        })
    }
}

module.exports = {
    nuevoEnlace,
    obtenerEnlace,
    todosEnlaces,
    verificarPassword
}