'use strict'

var Animal = require("../models/animals.model");
var Employee = require("../models/employee.model");

/* ------------------ Login ----------------------------------*/
function login(req, res){
    let empleyee = new Employee();
    let params = req.body

    Employee.findOne({username: params.username, password: params.password}, (err, success) =>{
        if(err){
            res.status(500).send({err: "Error general"});
        }else if(success){
            res.send({message: "Bienvenido !"});
        }else{
            res.status(404).send({message:"No se pudo ingresar"})
        }
    });
}
/* ------------------ Funciones de animal ---------------------*/
function SaveAnimal(req, res){
    var animal = new Animal();
    var params = req.body;
    
    if(params.name && params.types && params.age && params.number && params.scientific_name){
        Animal.findOne({number: params.number},(err, numberFind)=>{
            if(err){
                res.status(500).send({err: 'Error General'});
            }else if(numberFind){
                res.send({message: 'Un animal ya ocupa este numero'});
            }else{
                    animal.name = params.name;
                    animal.types = params.types;
                    animal.age = params.age;
                    animal.number = params.number;
                    animal.scientific_name = params.scientific_name;
                    
                animal.save((err, animalsave) =>{
                    
                    if(err){
                        res.status(500).send({err:"Error General"});
                    }else if(animalsave){
                        res.status(200).send({animalsave: animalsave});
                    }else{
                        res.status(404).send({message: "No se pudo guardar el animal"});
                    }
                });
            }
        })
        
    }else{
        res.status(200).send({message: "Ingrese todos los campos"});
    }
}

function getAnimal(req, res) {
    Animal.find({}).exec((err, animals) =>{
        if(err){
            res.status(500).send({err:"Error General"});
        }else if(animals){
            res.send({animals: animals});
        }else{
            res.status(404).send({message: 'No hay usuarios'});
        }
    });
} 

function searchAnimal(req, res) {
    var animalname = req.params.name;
    var animalTypes = req.params.types;
    var animalScientific = req.params.scientific_name;

    if(animalname != null && animalTypes != null && animalScientific !=null){
        Animal.findById(animalname, animalTypes, animalScientific).exec((err, animal) =>{
            if(err){
                res.status(500).send({err: "Error general"});
            }else if(animal){
                res.send({animal: animal});
            }else{
                res.status(404).send({message: "Usuario no encontrado"});
            }
        });
    }

    if(animalname == null && animalTypes != null && animalScientific != null){
        if(animalTypes != null && animalScientific != null){
            Animal.findById(animalTypes,animalScientific).exec((err, animal) =>{
                if(err){
                    res.status(500).send({err: "Error general"});
                }else if(animal){
                    res.send({animal: animal});
                }else{
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            })
        }
        if(animalTypes == null){
            Animal.findById(animalScientific).exec((err, animal) =>{
                if(err){
                    res.status(500).send({err: "Error general"});
                }else if(animal){
                    res.send({animal: animal});
                }else{
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            })
        }
    }

    if(animalTypes == null){
        if(animalname != null ){
            Animal.findById(animalname,animalScientific).exec((err, animal) =>{
                if(err){
                    res.status(500).send({err: "Error general"});
                }else if(animal){
                    res.send({animal: animal});
                }else{
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            })
        }
        if(animalname == null){
            Animal.findById(animalScientific).exec((err, animal) =>{
                if(err){
                    res.status(500).send({err: "Error general"});
                }else if(animal){
                    res.send({animal: animal});
                }else{
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            })
        }
    }

    if(animalScientific == null){
        if(animalname != null){
            Animal.findById(animalname,animalTypes).exec((err, animal) =>{
                if(err){
                    res.status(500).send({err: "Error general"});
                }else if(animal){
                    res.send({animal: animal});
                }else{
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            })
        }
        if(animalname == null){
            Animal.findById(animalTypes).exec((err, animal) =>{
                if(err){
                    res.status(500).send({err: "Error general"});
                }else if(animal){
                    res.send({animal: animal});
                }else{
                    res.status(404).send({message: "Usuario no encontrado"});
                }
            })
        }
    }
}
/*---------------------------- ---- FUNCIONES DE EMPLEADO -------------------------------*/

function saveEmployee (req, res){
    var employee = new Employee();
    var params = req.body;

    if(params.idemployee && params.name && params.position && params.username && params.password){
        
        Employee.findOne({idemployee: params.idemployee},{username: params.username}, (err,usernameFind)=>{     
            if(err){
                res.status(500).send({err: 'Error general' });
            }else if(usernameFind){
                res.send({message: "Usuario Existente"});
            }else{
                employee.idemployee = params.idemployee;
                employee.name = params.name;
                employee.position = params.position;
                employee.username = params.username;
                employee.password = params.password;
                
                employee.save((err, saveemployee) =>{
                    if(err){
                        res.status(500).send({err: "Error General"});
                        console.log(params)
                    }else if(saveemployee){
                        res.send({saveemployee: saveemployee});
                    }else{
                        res.status(404).send({message: "Error al guardar"});
                    }
                })
            }
        })
    }else{
        res.send({message: "Ingrese todos los campos"});
    }
}

function getEmployees(req,res) {
    Employee.find({}).exec((err, employees) =>{
        if(err){
            res.status(500).send({err: 'Error general'});
        }else if(employees){
            res.send({employees: employees})
        }else{
            res.status(404).send({message: "No hay usuarios"});
        }
    })
}

function searchEmployee(req,res){
    var idNombre = req.body.name;
    var idCargo = req.body.position;
   
    if(idNombre != null && idCargo != null){
        Employee.findById(idNombre, idCargo).exec((err, search) =>{
            if(err){
                res.status(500).send({err: "Error general"});
            }else if(search){
                res.send({search: search});
                console.log({simon});
            }else{
                res.status(404).send({message: "No se encontro usuario"});
            }
        });
    }   

    if({name: idNombre == null}){
        Employee.findById(idCargo).exec((err, search) =>{
            if(err){
                res.status(500).send({err: "Error general"});
            }else if(search){
                res.send({search: search});
            }else{
                res.status(404).send({message: "No se encontro usuario"});
            }
        });

    }if(idCargo == null){
        Employee.findById(idNombre).exec((err, search) =>{
            if(err){
                res.status(500).send({err: "Error general"});
            }else if(search){
                res.send({search: search});
            }else{
                res.status(404).send({message: "No se encontro usuario"});
            }
        })
    }       
}

// Documentos envedios de empleados

function MeterAnimal(req, res){
    let employeeId = req.params.id;    
    let paramsAnimal = req.body;  
    let animal = new Animal(); 

    Employee.findById(employeeId, (err, userOk) =>{
        if(err){
            res.status(500).send({err: "Error general"});
        }else if(userOk){
            if(paramsAnimal.name && paramsAnimal.types && paramsAnimal.age && paramsAnimal.number &&  paramsAnimal.scientific_name){
                animal.name = paramsAnimal.name;
                animal.types = paramsAnimal.types;
                animal.age = paramsAnimal.age;
                animal.number = paramsAnimal.number;
                animal.scientific_name = paramsAnimal.scientific_name;
                
                Employee.findByIdAndUpdate(employeeId, {$push:{animals: animal}},{new: true}, (err, animalUpdate) =>{
                    if(err){
                        res.status(500).send({err: "Error del servidor"});
                    }else if(animalUpdate){
                        res.status(200).send({animalUpdate: animalUpdate});
                    }else{
                        res.status(404).send({message: "No se a podido actualizar"});
                    }
                })
            }else{
                res.status(200).send({message: "Ingrese los parametros necesarios"})
            }

        }else{
            res.status(404).send({message: "animal Inexistente"})
        }
    })
}
module.exports = {
    SaveAnimal,
    getAnimal,
    saveEmployee,
    getEmployees,
    searchEmployee,
    MeterAnimal,
    login
}