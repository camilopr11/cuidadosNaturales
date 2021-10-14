import { connect } from '../database/connection'
const ObjectId = require('mongodb').ObjectID 

/* Consulta todo la información de todos los usuarios */
 const listInfo = async () => {
    const db = await connect()
    const result = await db.collection('plants').find({}).toArray()
    return result
}

 /* Guarda la información de las plantas */
  const saveInfo = async (info) => {
    const db = await connect()
    const result = await db.collection('plants').insertOne(info)
    return result
}

/* Consulta la informacion mediante el Id de la planta */
const findById = async (id) => {
    const db = await connect()
    const result = await db.collection('plants').find({_id: new ObjectId(id)}).toArray()
    return result
}

/* Consulta la informacion mediante el nombre de la planta */
const findByName = async (name) => {
    const db = await connect()
    const user = await db.collection('plants').find({"name": {'$regex': name }}).toArray()
    return user
}

/* Consulta la informacion mediante el tipo de la planta */
const findByType = async (type) => {
    const db = await connect()
    const user = await db.collection('plants').find({"type": {'$regex': type }}).toArray()
    return user
}

/* Consulta la infromación mediante el tipo de la planta */
const findByScientificName = async (scientific_name) => {
    const db = await connect()
    const user = await db.collection('plants').find({"scientific_name": {'$regex': scientific_name }}).toArray()
    return user
}

/*Actualiza la información mediante el Id de la planta */
const updateById = async (id, name, type, scientific_name, order, img_url) => {
    const db = await connect()
    const result = await db.collection('plants').updateOne({_id: new ObjectId(id)},{
    $set: {
        name : name,
        type : type,
        scientific_name: scientific_name,
        order : order,
        img_url : img_url
    }
})
    return result
}

/*Elimina la información mediante el Id de la planta */
const deleteById = async (id) => {
    const db = await connect()
    const result = await db.collection('plants').deleteOne({_id: new ObjectId(id)})
    return result
}

module.exports = {listInfo, saveInfo, findById, findByType, findByName,findByScientificName, updateById, deleteById} 