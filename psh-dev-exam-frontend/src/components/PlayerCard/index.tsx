import React from 'react'
import { Player } from '../../common/interfaces';
import './PlayerCard.scss'

interface PlayerCardProps {
    player: Player,
    rank: number
}

const PlayerCard = (props: PlayerCardProps) => {

    let rankClass = '' 
    switch (props.rank) {
        case 1:
            rankClass = 'Gold'
            break;    
        case 2:
            rankClass = 'Silver'
            break;
        case 3:
            rankClass = 'Bronze'
            break;
        default: rankClass=''

    } 
    return (
        <div className="PlayerCard">
            <div className="Rank"><h3 className={rankClass}>#{props.rank}</h3></div>
            <div className="ProfileImage">
                <img src={props.player.profileImage} alt="profile picture"/>
            </div>
            <div className="Nickname">
                <h3>{props.player.nickname}</h3>
            </div>
            <div className="Score">
                <h3>{props.player.totalScore} pts.</h3>
            </div>
        </div>
    );
}

export default PlayerCard ;