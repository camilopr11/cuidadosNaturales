/**
 * Controlador encargado de validar las peticiones a la base de datos
 * para la gestión de información en enciclopedias de cuidados naturales
 */

 import { connect } from '../database/connection'
 const ObjectId = require('mongodb').ObjectID 
 
 /**
  * @description Consulta toda la información de enciclopedias en la base de datos
  * @returns
  */
 const listInfo = async () => {
         const db = await connect()
         const result = await db.collection('enciclopedias').find({}).toArray()
         return result
 } 
 
 /**
  * @description Consulta información de enciclopedias mediante id
  * @param {ObjectId} id 
  * @returns 
  */
 const findById = async (id) => {
         const db = await connect()
         const result = await db.collection('enciclopedias').find({_id: new ObjectId(id)}).toArray()
         return result
 }
 
 /**
  * @description Consulta información de enciclopedias mediante título
  * @param {String} title 
  * @returns 
  */
 const findByTitle = async (title) => {
         const db = await connect()
         const enciclopedia = await db.collection('enciclopedias').find({"title": {'$regex': title }}).toArray()
         return enciclopedia
 }
 
 /**
  * @description Guarda una nueva información en la base de datos de enciclopedias
  * @param {Object} enciclopedia 
  * @returns 
  */
 const saveInfo = async (info) => {
             const db = await connect()
             const result = await db.collection('enciclopedias').insertOne(info)
             return result
     }
 
 /**
  * @description Actualiza información de enciclopedias mediante id
  * @param {ObjectId} id 
  * @param String newTitle, newDesc, newContent, newCat, newDate
  * @returns 
  */
  const updateById = async (id, newTitle, newDesc, newContent, newCat, newDate) => {
     const db = await connect()
     const result = await db.collection('enciclopedias').updateOne({_id: new ObjectId(id)},{
     $set: {
         title: newTitle,
         description: newDesc,
         content: newContent,
         category: newCat,
         date: newDate
     }
 })
     return result
 }
 
 /**
  * @description Elimina información de enciclopedias mediante id
  * @param {ObjectId} id 
  * @returns 
  */
  const deleteById = async (id) => {
     const db = await connect()
     const result = await db.collection('enciclopedias').deleteOne({_id: new ObjectId(id)})
     return result
 }
 
 module.exports = {listInfo, findById, findByTitle, saveInfo, updateById, deleteById}