const express = require('express')
const _controller = require('/controllers/users_controller')
const router = express.Router()
var {Given, When, Then} = require('cucumber');

/**
  * @description Como usuario puedo crear una nueva cuenta
  * @param String nickname, firstName, lastName, country, email, password
*/

Given(/^que el usuario esta en la pagina de inicio de sesion$/, function () { 
    //Se muestra la página principal 
    return console.log('Bienvenido al login');  
  });  
  
  /**
 * Petición: Agregar nuevo usuario
 * Parámetros: Vacío
 * Cuerpo: nickname, firstName, lastName, country, email, password, rank
 * Respuesta: mensaje de éxito o error
 */
  When(/^ingrese su correo, nombre, apellidos, nickname, pais, contrasena$/,
    router.post('/users/', async (req, res) => {
        const info = {
            nickname: req.body.nickname, 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            country: req.body.country,
            email: req.body.email,
            password: req.body.password,
            rank: 'new member'
        } 
        _controller
        .saveInfo(info)
            .then((response) => {
                res.setHeader("Content-Type", "application/json")
                res.status(200).json({
                    success: true,
                    "data": response
                })
            })
            .catch(error => {
                res.send(error)
            })
        })
    );
  
  Then(/^el usuario debe haber iniciado sesion correctamente en la aplicacion$/, function () { 
    //Se muestra un mensaje de que se ha inciado correctemente 
    return console.log("Se ha iniciado sesión correctamente");  
  }); 