const global = (req, res = response, next) => {
    console.log('el midelguer global');

    next();
}

module.exports = global;
