import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import axios from './axios'
import { Player } from './common/interfaces'
import './App.scss';
import Leaderboard from './components/Leaderboard';

const App = () => {
  
  const [lastUpdate, setLastUpdate] = useState<string>('')
  const [topPlayers, setTopPlayers] = useState<Player[]>([])

  const fetchTopPlayers = async () => {
    const response: AxiosResponse= await axios.get('players/top')
    setLastUpdate(response.data.lastUpdate)
    setTopPlayers(response.data.topPlayers)
  }

  useEffect(() => {
    const asyncFunction = async () => {
      await fetchTopPlayers()
      setInterval(fetchTopPlayers, 10000)

    }
    asyncFunction()
  },[])

  return (
    <div className="Container">
      <div className="Title">
        <h1>PSH-Game Leaderboard</h1>
        <h1>TOP 10</h1>
      </div>
      <h3>Last stat update: <span className="LastUpdate">{lastUpdate? new Date(lastUpdate).toLocaleString('es-AR'): null}</span></h3>
      <Leaderboard players={topPlayers}/>
    </div>
  );
}

export default App;
