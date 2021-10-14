import { connect } from '../database/connection'

class AlertsController {

    async list() {
        try {
            const db = await connect()
            const result = await db.collection('alerts').find({}).toArray()
            return result
        } catch (e) {
            return e
        }

    }

    static async createAlert(alert) {
        try {
            const db = await connect()
            const result = await db.collection('alerts').insertOne(alert)
            return result
        } catch (e) {
            return e
        }
    }
}

module.exports = AlertsController