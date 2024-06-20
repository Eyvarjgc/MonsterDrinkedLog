import monsterModel from '../models/monsterModel.js'

``
export class MonsterController{
  static async getAll (req,res){
    const dataResult = await monsterModel.getMonster()
    
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


}