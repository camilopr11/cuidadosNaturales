import { Router } from 'express'
import { connect } from '../database/connection'
import enciclopediaController from '../controllers/enciclopedia_controller'
const router = Router()

//Ruta para listar
router.get('/enciclopedia/listInfo', async (req, res) => {
    const enciclopedia = await new enciclopediaController().listInfo()
    res.json(enciclopedia)
})


//Rutas para agregar 

router.post('/enciclopedia/new-info', async (req, res) => {
    const info = {
        title: req.body.title, 
        description: req.body.description, 
        content: req.body.content, 
        category: req.body.category 
    } 
    const result = await new enciclopediaController.createInfo(info)

    res.status(200).json({
        success: true,
        "data": result
    })
   
    
    
})

module.exports = router;