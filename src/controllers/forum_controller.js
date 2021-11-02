/**
 * Controlador encargado de validar las peticiones a la base de datos
 * para la gestión de información en topics de cuidados naturales
 */

 import { connect } from '../database/connection'
 const ObjectId = require('mongodb').ObjectID 
 
 /**
  * @description Consulta toda la información de topics en la base de datos
  * @returns
  */
 const listInfo = async () => {
         const db = await connect()
         const result = await db.collection('topics').find({}).toArray()
         return result
 } 
 
 /**
  * @description Consulta información de topics mediante id
  * @param {ObjectId} id 
  * @returns 
  */
 const findById = async (id) => {
         const db = await connect()
         const result = await db.collection('topics').find({_id: new ObjectId(id)}).toArray()
         return result
 }
 
 /**
  * @description Consulta información de topics mediante título
  * @param {String} title 
  * @returns 
  */
 const findByTitle = async (title) => {
         const db = await connect()
         const topic = await db.collection('topics').find({"title": {'$regex': title }}).toArray()
         return topic
 }
 
 /**
  * @description Guarda una nueva información en la base de datos de topics
  * @param {Object} topic 
  * @returns 
  */
 const saveInfo = async (info) => {
             const db = await connect()
             const result = await db.collection('topics').insertOne(info)
             return result
     }
 
 /**
  * @description Actualiza información de topics mediante id
  * @param {ObjectId} id 
  * @param String newTitle, newBody, newDate
  * @returns 
  */
  const updateById = async (id, newTitle, newBody, newDate) => {
     const db = await connect()
     const result = await db.collection('topics').updateOne({_id: new ObjectId(id)},{
     $set: {
         title: newTitle,
         body: newBody,
         date: newDate
     }
 },{upsert: false})
     return result
 }
 
 /**
  * @description Elimina información de topics mediante id
  * @param {ObjectId} id 
  * @returns 
  */
  const deleteById = async (id) => {
     const db = await connect()
     const result = await db.collection('topics').deleteOne({_id: new ObjectId(id)})
     return result
 }
 
 module.exports = {listInfo, findById, findByTitle, saveInfo, updateById, deleteById}