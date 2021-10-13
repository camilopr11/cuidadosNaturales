const express = require('express')
const router = express.Router()
const _controller = require('../controllers/enciclopedia_controller')


/**
 * Petición: Traer toda la información de enciclopedias
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/enciclopedias/', async (req, res) => {
    
    _controller
    .listInfo()
        .then((enciclopedia) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.json(enciclopedia)
        })
        .catch(error => {
            res.send(error);
        })
})

/**
 * Petición: Buscar información de enciclopedias mediante id
 * Parámetros: id
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/enciclopedias/:enciclopediaId', async (req, res) => {
    let id = req.params.enciclopediaId
    _controller
    .findById(id)
        .then((enciclopedia) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.json(enciclopedia)
        })
        .catch(error => {
            res.send(error)
        })
})

/**
 * Petición: Buscar información de enciclopedias mediante título
 * Parámetros: title
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/enciclopedias/title/:title', async (req, res) => {
    let title = req.params.title
    _controller
    .findByTitle(title)
        .then((enciclopedia) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.json(enciclopedia)
        })
        .catch(error => {
            res.send(error)
        })
})

/**
 * Petición: Agregar nueva información a enciclopedias
 * Parámetros: Vacío
 * Cuerpo: title, description, content, category, date
 * Respuesta: mensaje de éxito o error
 */
router.post('/enciclopedias/', async (req, res) => {
    const info = {
        title: req.body.title, 
        description: req.body.description, 
        content: req.body.content, 
        category: req.body.category,
        date: req.body.date
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
 * Petición: Actualizar la información de enciclopedias mediante id
 * Parámetros: id
 * Cuerpo: title, description, content, category, date
 * Respuesta: Información actualizada o mensaje de error
 */
router.put('/enciclopedias/:enciclopediaId', async (req, res) => {
    let id = req.params.enciclopediaId
    let title = req.body.title
    let description = req.body.description
    let content = req.body.content
    let category = req.body.category
    let date = req.body.date
    _controller
    .updateById(id, title, description, content, category, date)
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
 * Petición: Eliminar información de enciclopedias mediante id
 * Parámetros: id
 * Cuerpo: Vacío
 * Respuesta: mensaje de éxito o error
 */
router.delete('/enciclopedias/:enciclopediaId', async (req, res) => {
    let id = req.params.enciclopediaId
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

module.exports = router;