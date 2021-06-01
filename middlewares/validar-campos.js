const {response} = require('express')
const { validationResult } = require('express-validator');

const validarCampos = (req,res=response,next)=>{

    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    //Validacion de errores
    if (hasErrors){
        return (
        res.status(400).json({
            ok: false,
            msg: result.mapped()
        }))
    }

    next()
}

module.exports = {
    validarCampos
}