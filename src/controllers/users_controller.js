/**
 * Controlador encargado de validar las peticiones a la base de datos
 * para la gestión de usuarios de cuidados naturales
 */

 import { connect } from '../database/connection'
 const ObjectId = require('mongodb').ObjectID 
 
 /**
  * @description Consulta toda la información de todos los usuarios en la base de datos
  * @returns
  */
 const listInfo = async () => {
         const db = await connect()
         const result = await db.collection('users').find({}).toArray()
         return result
 } 
 
 /**
  * @description Consulta información de usuarios mediante id
  * @param {ObjectId} id 
  * @returns 
  */
 const findById = async (id) => {
         const db = await connect()
         const result = await db.collection('users').find({_id: new ObjectId(id)}).toArray()
         return result
 }
 
 /**
  * @description Consulta información de usuarios mediante nickname
  * @param {String} nickname 
  * @returns 
  */
 const findByNick = async (nickname) => {
         const db = await connect()
         const user = await db.collection('users').find({"nickname": {'$regex': nickname }}).toArray()
         return user
 }
 
 /**
  * @description Guarda una nueva información en la base de datos de usuarios
  * @param {Object} user 
  * @returns 
  */
 const saveInfo = async (info) => {
             const db = await connect()
             const result = await db.collection('users').insertOne(info)
             return result
     }
 
 /**
  * @description Actualiza información de usuarios mediante id
  * @param {ObjectId} id 
  * @param String newNickName, newFirstName, newLastName, newCountry, newEmail, newPassword, newRank
  * @returns 
  */
  const updateById = async (id, newNickName, newFirstName, newLastName, newCountry, newEmail, newPassword, newRank) => {
     const db = await connect()
     const result = await db.collection('users').updateOne({_id: new ObjectId(id)},{
     $set: {
         nickname: newNickName,
         firstName: newFirstName,
         lastName: newLastName,
         country: newCountry,
         email: newEmail,
         password: newPassword,
         rank: newRank
     }
 })
     return result
 }
 
 /**
  * @description Eliminar usuario mediante id
  * @param {ObjectId} id 
  * @returns 
  */
  const deleteById = async (id) => {
     const db = await connect()
     const result = await db.collection('users').deleteOne({_id: new ObjectId(id)})
     return result
 }
 
 module.exports = {listInfo, findById, findByNick, saveInfo, updateById, deleteById}