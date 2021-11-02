const express = require('express')
const router = express.Router()
const _controller = require('../controllers/plants_controller')


/**
 * @author Camilo
 * @author Edna
 * @version 1.0
 */

/*Función que permite obtener toda la información de la planta*/
router.get('/plants/', async (req, res) => {

    _controller
        .listInfo()
        .then((plants) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.status(200).json(plants)
        })
        /*Si existe algún error, se muestra*/
        .catch(err => {
            res.send(err)
        })
})

/*Función que permite obtener la información de la planta por su id*/
router.get('/plants/:plantsId', async (req, res) => {
    let id = req.params.plantsId

    _controller
    .findById(id)
    /*Si existe respuesta, ls consulta de la planta fue exitoso */
    .then((plants) => {
        res.statusCode = 200
        res.setHeader("Content_type", "application/json")
        res.status(200).json(plants)
    })
    /*Si existe algún error, se muestra*/
    .catch(err => {
        res.send(err)
    })
})

/*Función que permite obtener la información de la planta por su nombre*/
router.get('/plants/name/:name', async (req, res) => {
    let name = req.params.name

    _controller
        .findByName(name)
        /*Si existe respuesta, ls consulta de la planta fue exitoso */
        .then((plants) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.status(200).json(plants)
        })
        /*Si existe algún error, se muestra*/
        .catch(err => {
            res.send(err)
        })
})

/*Función que permite obtener la información de la planta por su tipo*/
router.get('/plants/type/:type', async (req, res) => {
    let type = req.params.type

    _controller
        .findByType(type)
        /*Si existe respuesta, ls consulta de la planta fue exitoso */
        .then((plants) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.status(200).json(plants)
        })
        /*Si existe algún error, se muestra*/
        .catch(err => {
            res.send(err)
        })
})

/*Función que permite obtener la información de la planta por su nombre cientifico*/
router.get('/plants/scientific_name/:scientific_name', async (req, res) => {
    let scientific_name = req.params.scientific_name

    _controller
        .findByScientificName(scientific_name)
        /*Si existe respuesta, ls consulta de la planta fue exitoso */
        .then((plants) => {
            res.statusCode = 200
            res.setHeader("Content_type", "application/json")
            res.status(200).json(plants)
        })
        /*Si existe algún error, se muestra*/
        .catch(err => {
            res.send(err)
        })
})

/*Función que permite enviar datos sobre las plantas*/
router.post('/plants/', async (req, res) => {
    const plant = {
        name: req.body.name,
        type: req.body.type,
        scientific_name: req.body.scientific_name,
        order: req.body.order,
        img_url: req.body.img_url
    }

    if (plant.name && plant.type && plant.scientific_name && plant.order && plant.img_url) {
        _controller
            .saveInfo(plant)
            /*Si existe respuesta, ls consulta de la planta fue exitoso */
            .then((response) => {
                res.setHeader("Content-Type", "application/json")
                res.status(201).json({
                    success: true,
                    "data": response
                })
            })
            /*Si existe algún error, se muestra*/
            .catch(err => {
                res.send(err)
            })
    }else{
        res.status(400).json("plant not created")
    }
})

/*Función que permite actualizar los datos sobre una planta */
router.put('/plants/:plantsId', async (req, res) => {
    let id = req.params.plantsId
    let name = req.body.name
    let type = req.body.type
    let scientific_name = req.body.scientific_name
    let order = req.body.order
    let img_url = req.body.img_url

    _controller
        /*Se hace la actualización por medio del Id de la planta*/
        .updateById(id, name, type, scientific_name, order, img_url)
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

/*Función que permite eliminar los datos sobre una planta */
router.delete('/plants/:plantsId', async (req, res) => {
    let id = req.params.plantsId;

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
