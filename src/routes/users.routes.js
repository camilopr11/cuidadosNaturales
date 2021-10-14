const express = require('express')
const router = express.Router()
const _controller = require('../controllers/users_controller')


/**
 * Petición: Traer toda la información de usuarios
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/users/', async (req, res) => {
    
    _controller
    .listInfo()
        .then((user) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.json(user)
        })
        .catch(error => {
            res.send(error);
        })
})

/**
 * Petición: Buscar información de usuarios mediante id
 * Parámetros: id
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/users/:userId', async (req, res) => {
    let id = req.params.userId
    _controller
    .findById(id)
        .then((user) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.json(user)
        })
        .catch(error => {
            res.send(error)
        })
})

/**
 * Petición: Buscar información de usuarios mediante nickname
 * Parámetros: nickname
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/users/nickname/:nickname', async (req, res) => {
    let nickname = req.params.nickname
    _controller
    .findByNick(nickname)
        .then((user) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.json(user)
        })
        .catch(error => {
            res.send(error)
        })
})

/**
 * Petición: Agregar nuevo usuario
 * Parámetros: Vacío
 * Cuerpo: nickname, firstName, lastName, country, email, password, rank
 * Respuesta: mensaje de éxito o error
 */
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

/**
 * Petición: Actualizar la información de usuario mediante id
 * Parámetros: id
 * Cuerpo: nickname, firstName, lastName, country, email, password, rank
 * Respuesta: Información actualizada o mensaje de error
 */
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

/**
 * Petición: Eliminar usuario mediante id
 * Parámetros: id
 * Cuerpo: Vacío
 * Respuesta: mensaje de éxito o error
 */
router.delete('/users/:userId', async (req, res) => {
    let id = req.params.userId
    _controller
    .deleteById(id)
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

module.exports = router