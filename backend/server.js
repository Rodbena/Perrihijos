const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis')


//Rutas que utiliza nuestro programa
const userRoutes = require('./routes/autenticarRoute');
const adminRoutes = require('./routes/routesAdmin/autenticarRoute');
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/pructosR');
const carritoRoutes = require('./routes/carritoR');
const datosInitRoutes = require('./routes/routesAdmin/datosInit');
const path = require('path');
const client = require('./models/client');

//***PARA SESIOn */
const dosH = 1000*60*60;

env.config();


//Connect to our data base with our username, password, and the database we want to use
const CONNECTION_URL = "mongodb+srv://Rodbena:admin@cluster0.vvack.mongodb.net/Perrihijos?retryWrites=true&w=majority";//mongo al cual nos conectamos
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log('Database was connected');//Nos confirma que la conexión se logró
})
//********* */

//¨********************Nos conectamos a redis*********************************
    const clienteR = redis.createClient({
        host: 'redis-13715.c232.us-east-1-2.ec2.cloud.redislabs.com',
        port: 13715,
        password: 'FGt4yB5AyIDNf3CJCOL8MyLkvWPvqvOP'
    });

//************************************************************************ */

clienteR.set('Welcome', 'Hola de REDIS', function(err){
    if(err){
        throw err;
    }
    clienteR.get('Welcome', function(error, message){
        if(error){
            throw error;
        }
        console.log(message);
        clienteR.quit();
    })
})

app.use(cors())
app.use(express.json());
app.use('/public/', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoutes);//asignamos rutas
app.use('/api', adminRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', productosRoutes);
app.use('/api', carritoRoutes);
app.use('/api', datosInitRoutes);


app.listen(process.env.PORT, () =>{//Servidor comienza a escuchar en el puerto especificado
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = { client }