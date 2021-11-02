const express = require('express')
const _controller = require('/controllers/users_controller')
const router = express.Router()
var {Given, When, Then} = require('cucumber');  

/**
  * @description Como usuario puedo actualizar mis datos de perfil
  * @param String password, username
*/
Given(/^que el usuario esta registrado en la aplicacion$/, function () { 
    //Se muestra la página principal 
    return console.log('Bienvenido a la página principal');  
  });  
  
  When(/^se modifique la información del usuario$/,
    router.put('/users/:userId', async (req, res) => {
        let id = req.params.userId
        let nickname = req.body.nickname
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        let country = req.body.country
        let email = req.body.email
        let password = req.body.password
        let rank = req.body.rank
        _controller
        .updateById(id, nickname, firstName, lastName, country, email, password, rank)
            .then((response) => {
                res.statusCode = 200
                res.setHeader("Content_type", "application/json")
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
  
  Then(/^la información del usuario debe haberse guardado$/, function () { 
    //Se muestra un mensaje de que se ha inciado correctemente 
    return console.log("La información se ha guardado correctamente");  
  }); s