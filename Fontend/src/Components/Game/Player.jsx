import React, { useState } from 'react'
import './Player.scss'
import axios from 'axios'
import Game from './Game'
export default function Player() {
    const [player1, setPlayer1] = useState("")
    const [player2, setPlayer2] = useState("")
    const [bool, setBool] = useState(false)
    const playerName = async (evt) => {
        evt.preventDefault()
        let players = `https://localhost:7178/api/tictactoe?player1Name=${player1}&player2Name=${player2}`
        await axios.post(players)
            .then(res => {
                sessionStorage.setItem("player1", player1)
                sessionStorage.setItem("player2", player2)
                setBool(true)
            })
            .catch(e => {
                console.log(e);
            })
    }
    return (
        <>
            {!bool ? <div className='player-main'>
                <form onSubmit={playerName}>
                    <div className='player'>
                        <h1>Enter Player names</h1>
                        <div>
                            <input onChange={(i) => setPlayer1(i.target.value)} required type="text" name="" id="" placeholder='Player 1' />
                            <i className="text-danger bi bi-x-lg"></i>
                        </div>
                        <div>
                            <input onChange={(i) => setPlayer2(i.target.value)} required type="text" name="" id="" placeholder='Player 2' />
                            <i className="text-warning  bi bi-0-circle"></i>
                        </div>
                        <button type='submit'>Start Game</button>
                    </div>
                </form>
            </div> : <Game />}
        </>

    )
}
