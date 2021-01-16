import axios from 'axios'
import { PLAYERS_API_URL } from './config'
 
const instance = axios.create({
    baseURL: PLAYERS_API_URL
})

export default instance