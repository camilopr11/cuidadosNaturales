const express = require('express')
const _controller = require('/controllers/users_controller')
const router = express.Router()
var {Given, When, Then} = require('cucumber'); 

/**
  * @description Como usuario puedo iniciar sesión
  * @param String password, username
*/
Given(/^que el usuario esta en la pagina de inicio de sesion$/, function () { 
    //Se muestra la página principal 
    return console.log('Bienvenido a la página principal');  
  });  
  
  When(/^el usuario ingresa el nombre de usuario y contrasena valida$/, function (username, password) {
    //Verifica que el nombre y el usuario este en la BD
    function Login(){ 
      if (username == {string} && password == {string}) {
        //Se ha iniciado correctamente
        return console.log("Haz ingresado correctamente");  
      } 
      if (username =="" && password=="") { 
        //Se solicita ingresar un usuario y contraseña
        return console.log("Ingresa tú usuario y contraseña");
      }
    }
  });  
  
  Then(/^el usuario debe haber iniciado sesion correctamente en la aplicacion$/, function () { 
    //Se muestra un mensaje de que se ha inciado correctemente 
    return console.log("Se ha iniciado sesión correctamente");  
  }); 