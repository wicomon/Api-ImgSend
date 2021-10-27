const Enlace = require("../models/Enlace");

const tienePassword = async(req, res = response, next) => {

    const {url} = req.params;
    // console.log(req.params);

    const enlace = await Enlace.findOne({url});

    if (!enlace) {
        return res.status(404).json({msg: 'Ese enlace no existe'});
    }

    if (enlace.password) {
        return res.json({password: true, enlace: enlace.url})
    }

    next();
}

module.exports = tienePassword;
