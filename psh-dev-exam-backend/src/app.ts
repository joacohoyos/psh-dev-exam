import express from 'express'
import { PORT } from './utility/config'
import playersRouter from './routers/players'
import cron from './cron'


const app = express()
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(playersRouter)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})

cron.start()





