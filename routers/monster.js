import express from 'express'
import {MonsterController} from '../controllers/monsterController.js'

const monstersRouter = express.Router()

monstersRouter.use(express.json())

monstersRouter.get('', MonsterController.getAll)
monstersRouter.get('/:name', MonsterController.getTotalAmount)
monstersRouter.get('/info/:name', MonsterController.getAllInfo)

monstersRouter.post('', MonsterController.postOne)

export default monstersRouter