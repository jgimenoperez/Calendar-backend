const mongoose = require('mongoose');
const mongoose2 = require('mongoose');

const dbConnection =async()=>{

    try {
       await  mongoose.connect(
            process.env.DB_CNN, 
            {   
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true
            });

        console.log('DB Online1')    

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar BD')
    }
}



const dbConnection2 =async()=>{

    try {
       await  mongoose2.connect(
            process.env.DB_CNN2, 
            {   
                useNewUrlParser: true, 
                useUnifiedTopology: true,
               // useCreateIndex: true
            });

        console.log('DB Online2')    

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar BD')
    }
}

module.exports = {
    dbConnection,
    dbConnection2
}
