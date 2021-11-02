require('dotenv').config()
const {MongoClient} = require('mongodb');

// Connection parameters for the database
// TODO: Move this sensitive info to a dotenv file
const uri = process.env.DB_HOST
const dbName = process.env.DB_NAME

/**
 * Creates a asyncronous connection to Mongo database
 * Assigns a name to the database
 * @returns The estabilished connection to the database 
 */

 export async function connect(){
  
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const db = client.db(dbName)
        if(db){
            return db
        }
    } catch (e) {
        console.error(e);
    } 
}


