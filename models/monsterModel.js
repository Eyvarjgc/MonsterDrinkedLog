import mysql from 'mysql2/promise'

import {
  DB_HOST,
  DB_NAME ,
  DB_PASSWORD ,
  DB_PORT ,
  DB_USER 

} from '../config.js'

const GLOBAL_CONFIG = mysql.createPool( 
  {
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port:DB_PORT,
    user: DB_USER
  }
)  

// const connection = await mysql.createConnection(GLOBAL_CONFIG)

export default class monsterModel{
  static async getMonster() {
    try{
      
      const [result] = await GLOBAL_CONFIG.query(
        `SELECT 
          MIN(id) as id, 
          name, 
          MIN(image_url) as image_url, 
          MIN(color) as color 
          FROM 
          monster 
          GROUP BY 
          name;`) 


      return result.length == null || 0 ? false :  result

      
      
    }catch(e){
      console.log(e);
    }

  }

  static async getTotalAmount(name){
    try{
      const [result] = await GLOBAL_CONFIG.query(`
      select count(id) as amount 
      from monster 
      where name = ?`, [name])
      
      return result
    }
    catch(e){
      console.log(e);
    }
  }

  static async getInfoByName(name){
    try {
      const [result] = await GLOBAL_CONFIG.query(`
      select * from monster where name = ? `, [name])

      return result
    } catch (error) {
      console.log(error);
    }
  }

  static async getInfoById(id){
    try {
      const [result] = await GLOBAL_CONFIG.query('select * from monster where id = ?', [id])
        
      return result

      
    } catch (error) {
      console.log(error);
    }
  }


  static async postMonster(body){
    try{
      const {name,image_url,  color,date_drinked,description} = body
      
      console.log(name);
      console.log(image_url);
      console.log(color);
 
      
      await GLOBAL_CONFIG.query(
        'INSERT INTO monster(name, image_url, color, date_drinked,description) VALUES (?,?,?,?,?);',
        [name,image_url,color,date_drinked,description])


    }
    catch(e){
      console.log(e);
    }
  }
  static async patchMonster(id, data){
    try{
        const {rate, date_drinked,description} = data

        await GLOBAL_CONFIG.query(`
          update monster set rate= ? ,date_drinked = ? , description = ? where id = ?`,
        [rate,date_drinked,description, id])

        const [comprobation] = await GLOBAL_CONFIG.query(`
          select * from monster where id = ?`,
        [ id])


          return comprobation
    }catch(e){
      console.log(e);
    }
  }

  static async deleteMonster(id){
    try {
      await GLOBAL_CONFIG.query('delete from monster where id = ?', [id])
      

    } catch (error) {
      console.log(error);
    }
  }
}
