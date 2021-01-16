import React from 'react'
import { Player } from '../../common/interfaces'
import PlayerCard from '../PlayerCard'
import './Leaderboard.scss'

interface LeaderboardProps {
    players: Player[]
}

const Leaderboard = (props: LeaderboardProps) => {
    return (
        <div className="Leaderboard">
            {props.players.map((p, i) => {
                return <PlayerCard player={p} rank={i+1} key={p.nickname}/>
            })}
        </div>
    );
}

export default Leaderboard ;