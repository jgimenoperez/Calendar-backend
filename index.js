/*
    Rutas de usuarios /auth
    host + /api/auth
*/

const { response } = require('express');

//CORS SIRVE PARA RESTRINGIR ACCESOS 
var cors = require('cors')
require('dotenv').config()

const express = require('express');
const { dbConnection,dbConnection2 } = require('./database/config');

// //base de datos
 dbConnection()
//  dbConnection2()

const app = express();


//
app.use(cors())

//directorio publico
app.use( express.static('public'))

//Lectura y parseo del body
app.use(express.json())

//TODO: CRUD: EVENTOS
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


app.listen( process.env.PORT , () =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})

