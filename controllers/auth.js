const { response } = require('express')
const {generarJWT} = require('../helpers/jwt')
const bcrypt  = require('bcryptjs')
const Usuario = require('../models/Usuario')
//global.globalstring='hola mundo'

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body
    
    try {

        let usuario = await Usuario.findOne({ email })

         if (usuario) {
            res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe con ese correo',
            })

        }
        else {

            const usuario = new Usuario(req.body);
            //console.log(usuario)

            //encriptar contraseña    
            const salt = bcrypt.genSaltSync();
            usuario.password= bcrypt.hashSync(password,salt)
            await usuario.save()

            const token=await generarJWT(usuario.id,usuario.name)
            res.status(201).json({
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            })
                    

        }

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: error,
        })
    }
}

const loginUsuario = async (req, res = response) => {
    
            const { email, password } = req.body
            let usuario = await Usuario.findOne({ email })

            if (usuario){

                let logado=bcrypt.compareSync(password, usuario.password); 

                if (!logado) {
                    
                    return res.status(400).json({
                        ok: false,
                        msg: 'Autenticacion ha fallado',
                    })
            
                }

              const token=await generarJWT(usuario.id,usuario.name)
                return res.status(200).json({
                    ok: true,
                    uid: usuario.id,
                    name: usuario.name,
                    token
                 } 
                    )

            }else{

                return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe',
            })

            }

    try {
        
    } catch (error) {
        
    }


}

const revalidarToken = async(req, res = response) => {
    
    uid=req.uid
    nombre=req.name

    const token=await generarJWT(uid,nombre)

    res.json({
        ok: true,
        token,
        uid,
        nombre
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}