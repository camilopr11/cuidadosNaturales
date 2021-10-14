import { connect } from '../database/connection'
const ObjectId = require('mongodb').ObjectID 

/* Consulta todo la información de todos los usuarios */
const listInfo = async () => {
    const db = await connect()
    const result = await db.collection('alerts').find({}).toArray()
    return result
}

 /* Guarda la información */
 const saveInfo = async (info) => {
    const db = await connect()
    const result = await db.collection('alerts').insertOne(info)
    return result
}

/*Actualiza la información mediante el Id */
const updateById = async (id, plant, type, date, img_url) => {
    const db = await connect()
    const result = await db.collection('alerts').updateOne({_id: new ObjectId(id)},{
    $set: {
        plant: plant,
        type: type,
        date: date,
        img_url: img_url
    }
})
    return result
}

/*Elimina la información mediante el Id */
const deleteById = async (id) => {
    const db = await connect()
    const result = await db.collection('alerts').deleteOne({_id: new ObjectId(id)})
    return result
}

module.exports = {listInfo, saveInfo, updateById, deleteById} 