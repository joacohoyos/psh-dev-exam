import express from 'express'
import { PORT } from './utility/config'
import playersRouter from './routers/players'
import cron from './cron'


const app = express()
app.use(express.json())
app.use(playersRouter)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})

cron.start()





