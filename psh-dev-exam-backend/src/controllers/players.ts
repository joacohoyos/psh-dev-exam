import { RequestHandler } from 'express'
import { getTopPlayers } from '../utility/db'

export const getTopPlayersHandler: RequestHandler = async (req, res) => { 
    try {
        const topPlayers = await getTopPlayers()
        res.send(topPlayers)
    } catch(error) {
        res.status(400).send()
    }
}    
