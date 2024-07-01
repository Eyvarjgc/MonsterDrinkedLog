import express from 'express'
import {MonsterController} from '../controllers/monsterController.js'

const monstersRouter = express.Router()

monstersRouter.use(express.json())

monstersRouter.get('', MonsterController.getAll)
monstersRouter.get('/:name', MonsterController.getTotalAmount)
monstersRouter.get('/info/:identifier', MonsterController.getInfo)

// monstersRouter.get('/info/:id', MonsterController.getInfoById)
monstersRouter.patch('/info/:id', MonsterController.updatedMonster)

monstersRouter.post('', MonsterController.postOne)

monstersRouter.delete('/:id', MonsterController.deleteMonster)

export default monstersRouter