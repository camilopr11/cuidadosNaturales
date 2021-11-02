const express = require('express')
const router = express.Router()
const _controller = require('../controllers/forum_controller')


/**
 * Petición: Traer toda la información de topics
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/topics/', async (req, res) => {

    _controller
        .listInfo()
        .then((topics) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.status(200).json(topics)
        })
        .catch(error => {
            res.send(error);
        })
})

/**
 * Petición: Buscar información de topics mediante id
 * Parámetros: id
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/topics/:topicId', async (req, res) => {
    let id = req.params.topicId
    _controller
        .findById(id)
        .then((topic) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.json(topic)
        })
        .catch(error => {
            res.send(error)
        })
})

/**
 * Petición: Buscar información de topics mediante título
 * Parámetros: title
 * Cuerpo: Vacío
 * Respuesta: Información consultada o mensaje de error
 */
router.get('/topics/title/:title', async (req, res) => {
    let title = req.params.title
    _controller
        .findByTitle(title)
        .then((topic) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.json(topic)
        })
        .catch(error => {
            res.send(error)
        })
})

/**
 * Petición: Agregar nueva información a topics
 * Parámetros: Vacío
 * Cuerpo: title, description, content, category, date
 * Respuesta: mensaje de éxito o error
 */
router.post('/topics/', async (req, res) => {
    const topic = {
        user: req.body.user,
        title: req.body.title,
        body: req.body.body,
        date: req.body.date
    }
    if (topic.user && topic.user != '' && topic.title && topic.title != '' && topic.body && topic.body != '' && topic.date && topic.date != '') {
        _controller
            .saveInfo(topic)
            .then((response) => {
                res.setHeader("Content-Type", "application/json")
                res.status(201).json({
                    success: true,
                    "data": response
                })
            })
            .catch(error => {
                res.send(error)
            })
    } else {
        res.status(400).json("topic not created")
    }
})

/**
 * Petición: Actualizar la información de topics mediante id
 * Parámetros: id
 * Cuerpo: title, description, content, category, date
 * Respuesta: Información actualizada o mensaje de error
 */
router.patch('/topics/:topicId', async (req, res) => {

    let title = req.body.title
    let body = req.body.body
    let date = new Date()
    let id = req.params.topicId
    if (title && title != '' && body && body != '' && date && date != '') {
        _controller
            .updateById(id, title, body, date)
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
    } else {
        res.status(400).json("topic not updated")
    }
})

/**
 * Petición: Eliminar información de topics mediante id
 * Parámetros: id
 * Cuerpo: Vacío
 * Respuesta: mensaje de éxito o error
 */
router.delete('/topics/:topicId', async (req, res) => {
    let id = req.params.topicId
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