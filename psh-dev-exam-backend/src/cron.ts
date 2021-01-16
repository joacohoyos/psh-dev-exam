import { CronJob } from 'cron'
import { insertPlayerStat }  from './utility/db'
import axios from './utility/axios-player'



var job = new CronJob('00 */1 * * * *', async () => {
    const numberOfPlayers = Math.floor(Math.random() * 10)
    for(let i = 0; i < numberOfPlayers; i++){
        try{
            const data = await (await axios.get('')).data.results[0]
            await insertPlayerStat(data.login.username, data.picture.medium)
        } catch(error) {
            console.log('Error while inserting player stat', error)
        }
    }
    console.log(`cronJob simulated ${numberOfPlayers} players stats`)
})


export default job