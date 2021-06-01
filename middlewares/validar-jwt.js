var jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    // const result = validationResult(req);
    // const hasErrors = !result.isEmpty();

    const token = req.header('x-token')

    if (!token) {
        return (
            res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            }))
    }
 
     try {
         var payload = jwt.verify(token, process.env.SECRET_JWT_SEE)
         req.uid=payload.uid
         req.name=payload.name

     } catch (error) {
         console.log(error)
        return (
            res.status(401).json({
                ok: false,
                msg: 'Token no valido',
            }))
     }

    next()
}


module.exports = {
    validarJWT
}