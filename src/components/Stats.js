import React from 'react';
import '../Styling/stats.css'

const Stats = (props) => {
    return (
        <div className="stats-container">
            <div className="account-stats">
                <h3>Account: {props.username}</h3>
                <p>games played: {props.userStats.gamesPlayed}</p>
                <p>wins: {props.userStats.wins}</p>
                <p>losses: {props.userStats.losses}</p>
            </div>
            <br/>
            <div className="global-stats">
                <h2>Global stats</h2>
                <div className="easy-stats">
                    <h3>Easy:</h3>
                    <p>Games played: {props.easyStats.gamesPlayed}</p>
                    <p>wins: {props.easyStats.wins}</p>
                    <p>losses: {props.easyStats.losses}</p>
                </div>
                <div className="medium-stats">
                    <h3>Medium:</h3>
                    <p>Games played: {props.mediumStats.gamesPlayed}</p>
                    <p>wins: {props.mediumStats.wins}</p>
                    <p>losses: {props.mediumStats.losses}</p>
                </div>
                <div className="hard-stats">
                    <h3>Hard:</h3>
                    <p>Games played: {props.hardStats.gamesPlayed}</p>
                    <p>wins: {props.hardStats.wins}</p>
                    <p>losses: {props.hardStats.losses}</p>
                </div>
            </div>
        </div>
    )
}

export default Stats