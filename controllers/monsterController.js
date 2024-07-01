import monsterModel from '../models/monsterModel.js'
import { updateData } from '../schemas/validationData.js'
``
export class MonsterController{
  static async getAll (req,res){

    const dataResult = await monsterModel.getMonster()
    
    if(!dataResult || undefined){
      return res.status(404)
        .send({success:false, message: 'There is not items to show'})
    }

    res.status(200)
      .send({success:true, data: dataResult})

  }
  static async postOne(req,res){
    const body = req.body

    

    const result = await monsterModel.postMonster(body)

    res.status(200)
      .send({success:true, message: `Item succesfully saved` }) 
  }

  static async getTotalAmount(req,res){
    const {name} = req.params
    const result = await monsterModel.getTotalAmount(name)


    res.json(result)
  }

  static async getInfo(req,res){
    const {identifier} = req.params


    if (isNaN(identifier)) {
      const result = await monsterModel.getInfoByName(identifier)

      res.json(result)


  } else {
      req.params.id = identifier; 
      const result = await monsterModel.getInfoById(req.params.id) 
      
      res.json(result)
  }

  }



  static async updatedMonster(req,res){
    const {id} = req.params
    // const validation = updateData(res.body)
    const result = await monsterModel.patchMonster(id,req.body)

    return res.status(200)
      .send({success:true,data:result})
  }

  static async deleteMonster(req,res){
    const {id} = req.params

    const result = await monsterModel.deleteMonster(id)

    res.json({success:true, message: `item ${id} is deleted`})
  }
}