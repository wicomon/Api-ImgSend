const jwt = require('jsonwebtoken');

const auth = (req, res = response, next) => {

    const authHeader = req.get('Authorization');
    if (authHeader) {
        // console.log(authHeader);
        const token = authHeader.split(' ')[1];

        try {
            //comprobar el jwt
            const usuario = jwt.verify(token, process.env.SECRETA);
            // console.log(usuario);
            req.usuario = usuario;
            
        } catch (error) {
            console.log(error);
            console.log('jwt no valido 1');
        }
    }else{
        console.log('jwt no valido 2    ');
    }

    next();
}

module.exports = auth;
