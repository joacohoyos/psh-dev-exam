import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import axios from './axios'
import { CSVLink } from 'react-csv'
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

  const csvExportHeaders = [
    {label:'Nickname', key: 'nickname' },
    {label:'score', key: 'totalScore' }
  ]

  return (
    <div className="Container">
      <div className="Title">
        <h1>PSH-Game Leaderboard</h1>
        <h1>TOP 10</h1>
      </div>
      <div className="Info">
        <h3 className="LastUpdate">Last stat update: <span className="LastUpdateDate">{lastUpdate? new Date(lastUpdate).toLocaleString('es-AR'): null}</span></h3>
        <CSVLink data={topPlayers} headers={csvExportHeaders} className="CSVLink" filename="PSH-Game Leaderboard.csv">Export</CSVLink>
      </div>
      <Leaderboard players={topPlayers}/>
    </div>
  );
}

export default App;
