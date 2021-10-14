const express = require('express')
const _controller = require('../controllers/alerts_controller')
const router = express.Router()

/**
 * @author Camilo
 * @author Edna
 * @version 1.0
 */

/*Función que permite obtener toda la información*/
router.get('/alerts/', async (req, res) => {
    
    _controller
    .listInfo()
    .then((alerts) => {
        res.statusCode = 200
        res.setHeader("Content_type", "application/json")
        res.status(200).json(alerts)
    })
    /*Si existe algún error, se muestra*/
    .catch(err => {
        res.send(err)
    })
})

/*Función que permite enviar datos generados en el router*/
router.post('/alerts', async (req, res) => {
    var datetime = new Date(req.body.date)
    const info = {
        plant: req.body.plant,
        type: req.body.type,
        date: datetime,
        img_url: req.body.img_url
    }

    _controller
    .saveInfo(info)
    /*Si existe respuesta, ls consulta de la planta fue exitoso */
        .then((response) => {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json({
                success: true,
                "data": response
            })
        })
        /*Si existe algún error, se muestra*/
        .catch(err => {
            res.send(err)
        })
})

/*Función que permite actualizar los datos generados en el router*/
router.put('/alerts/:alertsId', async (req, res) => {
    let id = req.params.alertsId
    let plant = req.body.plant
    let type = req.body.type
    let date = req.body.datetime
    let img_url = req.body.img_url

    _controller
    /*Se hace la actualización por medio del Id de la planta*/
    .updateById(id, plant, type, date, img_url)
    /*Si existe respuesta, la actualización de la planta fue exitoso */
    .then((response) => {
        res.statusCode = 200
        res.setHeader("Content_type", "application/json")
        res.status(200).json({
            success: true,
            "data": response
        })
    })
    /*Si existe algún error, se muestra*/
    .catch(err => {
        res.send(err)
    })
})

/*Función que permite eliminar los datos */
router.delete('/alerts/:alertsId', async (req, res) => {
    let id = req.params.alertsId;

    /*Se elimina el registro por medio del id de la planta*/
    _controller
    .deleteById(id)
    /*Si existe respuesta, el eliminado de la planta fue exitoso */
    .then((response) => {
        res.statusCode = 200
        res.setHeader("Content_type", "application/json")
        res.status(200).json({
            success: true,
            "data": response
        })
    })

    /*Si existe algún error, se muestra*/
    .catch(err => {
        res.send(err)
    })
})

/*Retorna un objeto del módulo actual cuando es requerido por otro módulo*/
module.exports = router;