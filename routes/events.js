const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { obtenerEventos,añadirEvento,actualizarEvento,borrarEventos } = require('../controllers/events')
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


const router = Router()
router.use( validarJWT )
//Obtener eventos calendarios
router.get(
    '/',
    obtenerEventos
)

router.post(
    '/add',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','El fecha de inicio es obligatoria').custom(isDate),
        check('end','El fecha de fin es obligatoria').not().isEmpty(),
        //check('end','El fecha de fin es obligatoria').not().isEmpty(),
        validarCampos
    ],
    añadirEvento
)

router.put(
   // '/update',
   '/update/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','El fecha de inicio es obligatoria').custom(isDate),
        check('end','El fecha de fin es obligatoria').not().isEmpty(),
        //check('end','El fecha de fin es obligatoria').not().isEmpty(),
        validarCampos
    ],    
    actualizarEvento
)

router.delete(
    '/delete/:id',
    borrarEventos
)


module.exports = router
