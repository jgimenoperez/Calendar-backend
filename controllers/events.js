const { response } = require('express')
const Evento = require('../models/Evento')

const obtenerEventos= async ( req, res=response)=>{

    const eventos = await Evento.find()
                                .populate('user',"name")


    return res.status(200).json({
        ok: true,
        msg:eventos
     } )

}

const añadirEvento= async ( req, res=response)=>{


    const evento = new Evento(req.body);
    try {
        uid=req.uid
        nombre=req.name

        evento.user=req.uid
        console.log(req.uid)
        const eventoDB=await evento.save()

        return res.status(200).json({
            ok: true,
            evento:eventoDB
         } )
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg:'Hable con el administrador....'
         } )
    }

}


const actualizarEvento= async ( req, res=response)=>{

    const eventoId = req.params.id

    try {

       // const evento = await Evento.findById(eventoId)
        const evento = await Evento.findById( eventoId )
        const uid=req.uid

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg:"Evento no existe"
             } )   
        }

 
        if (evento.user.toString()!==uid) {

            return res.status(401).json({
                ok: false,
                msg:"No tiene privilegio de editar este evento"
             } )              
        }

        const nuevoEvento= {
                     ...req.body,
                     user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(

            eventoId,
            nuevoEvento,
            {new:true}

        )

        return res.status(200).json({
            ok: true,
            msg:"Evento actualizado"
         } )   

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg:"Hable con el administrador"
         } )        
    }
   
}

const borrarEventos= async ( req, res=response)=>{

    const eventoId = req.params.id

    try {
        const evento = await Evento.findById( eventoId )
        const uid=req.uid

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg:"Evento no existe"
             } )   
        }
    

         if (evento.user.toString()!==uid) {

            return res.status(401).json({
                ok: false,
                msg:"No tiene privilegio de eliminar este evento"
             } )              
        }

        //const eventoBorrado = await Evento.
        const eventoActualizado = await Evento.deleteOne()
        console.log(eventoActualizado)

        return res.status(200).json({
            ok: true,
            msg:'Evento borrado'
         } )

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg:"Hable con el administrador"
         } )       
    }







}


module.exports={
    obtenerEventos,
    añadirEvento,
    actualizarEvento,
    borrarEventos
}