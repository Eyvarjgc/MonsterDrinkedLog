import express from 'express'
import monstersRouter from './routers/monster.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.static('client'))
app.use(cors())

app.use('/api/monster', monstersRouter)


app.listen(PORT, (req,res) => {
  console.log(`Server running in \n http://localhost:${PORT}`)
})

