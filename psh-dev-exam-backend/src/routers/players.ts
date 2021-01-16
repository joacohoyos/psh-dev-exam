import express, {Router} from 'express'
import { getTopPlayersHandler } from '../controllers/players'

const router = Router()

router.get('/players/top', getTopPlayersHandler)

export default router