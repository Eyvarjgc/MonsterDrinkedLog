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

  static async getAllInfo(req,res){
    const {name} = req.params

    const result = await monsterModel.getAllInfo(name)

    res.json(result)

  }

  static async updatedMonster(req,res){
    const {id} = req.params
    const validation = updateData(res.body)
    const result = await monsterModel.patchMonster(id,validation)

    return res.status(200)
      .send({success:true,data:result})
  }
}