import { connect } from '../database/connection'

class PlantController {

    async list() {
        try {
            const db = await connect()
            const result = await db.collection('plants').find({}).toArray()
            return result
        } catch (e) {
            return e
        }

    }

    static async createPlant(plant) {
        try {
            const db = await connect()
            const result = await db.collection('plants').insertOne(plant)
            return result
        } catch (e) {
            return e
        }
    }
}
    
module.exports = PlantController