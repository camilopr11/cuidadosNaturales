import { Router } from 'express'
import { connect } from '../database/connection'
import AlertsController from '../controllers/alerts_controller'
const router = Router()


router.get('/listAlerts', async (req, res) => {
    const result = await new AlertsController().list()
    res.json(result)
})

router.post('/createAlert', async (req, res) => {
    var datetime = new Date(req.body.date)
    const alert = {
        plant: req.body.plant,
        type: req.body.type,
        date: datetime,
        img_url: req.body.img_url
    }
    const result = await new AlertsController.createAlert(alert)

    res.status(200).json({
        success: true,
        "data": result
    })

})
export default router