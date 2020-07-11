'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/DBZoologico',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{

        console.log('Conexion a la base de datos exitosa');

        app.listen(port,()=>{
            console.log('El servidor de express esta corriendo en el puerto', port);
        })
    })
    .catch(err=> {

    });