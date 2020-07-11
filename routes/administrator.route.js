'use strict'

var express = require('express');
var animalController = require('../controllers/administrator.controller');
var employeeController = require('../controllers/administrator.controller');

var api = express.Router();

/* rutas de animal */
api.post('/saveAnimal', animalController.SaveAnimal);
api.get('/getAnimals', animalController.getAnimal);

/* Rutas de administrador */
api.post('/saveEmployee', employeeController.saveEmployee);
api.get('/getEmployees', employeeController.getEmployees);
api.get('/getEmployee/:name/:position', employeeController.getEmployees);

/*Ruta envedida*/
api.put('/meterAnimal/:id', employeeController.MeterAnimal);

/* Login*/
api.get('/login', employeeController.login);
module.exports = api;