import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Input"
import "./Game.scss"
import PhotoX from './Assets/2023-11-07_09-01-47.png'
import PhotoO from './Assets/Снимок экрана 2023-11-07 085816.png'
export default function Game() {
    const [startGame, setStartGame] = useState(true)
    const [gameBoard, setGameBoard] = useState([])
    const [Xelement, setXelement] = useState(true)
    const [Oelement, setOelement] = useState(false)
    const [searchElement, setSearchElement] = useState('')
    const [inputGame, setInputGame] = useState([
        {
            id: 1,
            inp: 1,
        },
        {
            id: 2,
            inp: 1,
        },
        {
            id: 3,
            inp: 1,
        },
        {
            id: 4,
            inp: 1,
        },
        {
            id: 5,
            inp: 1,
        },
        {
            id: 6,
            inp: 1,
        },
        {
            id: 7,
            inp: 1,
        },
        {
            id: 8,
            inp: 1,
        },
        {
            id: 9,
            inp: 1,
        },

    ])
    const [gameOff, setGameOff] = useState(false)
    const [winningIndexes, setWinningIndexes] = useState([]);
    const [inputValues, setInputValues] = useState(Array(9).fill(''));
    // const [ inputStyle, setInputStyle] = useState(false)
    const newGame = async () => {
        axios.get("https://localhost:7178/api/tictactoe")
            .then(res => {
                let maxId = -1;
                let maxIndex = -1;
                res.data.forEach((item, index) => {
                    if (item.id > maxId) {
                        maxId = item.id;
                        maxIndex = index;
                    }
                });
                setGameBoard(res.data[maxIndex]);
                setStartGame(true)
                setInputValues(Array(9).fill(''));
            })
            .catch(e => {
                console.log(e);
            })
    }
    const valueInput = (event, index) => {
        const inputValue = event.target.value;

        if (Xelement) setXelement(false)
        else setXelement(true)
        if (Oelement) setOelement(false)
        else setOelement(true)

        const isDigitOrLetter = /^[0-9a-zA-Z]+$/.test(inputValue);
        let outputValue;
        if (inputValues[index]) {
            return;
        }
        if (searchElement === 'X') {
            outputValue = 'X';


        } else if (searchElement === 'O') {
            outputValue = 'O';

        }
        else if (searchElement === 'О') {
            outputValue = 'O';
            

        }  else {
            outputValue = isDigitOrLetter ? 'X' : "X";
        }
        console.log(searchElement);
        const updatedInputValues = [...inputValues];
        updatedInputValues[index] = outputValue;
        setInputValues(updatedInputValues);
    };
    const startNew = async () => {
        let player1 = sessionStorage.getItem("player1")
        let player2 = sessionStorage.getItem("player2")
        let players = `https://localhost:7178/api/tictactoe?player1Name=${player1}&player2Name=${player2}`
        await axios.post(players)
            .then(res => {
                setInputValues(Array(6).fill(''));
                setGameOff(false)
                setXelement(true)
                setOelement(false)
                newGame()
                setSearchElement("")
            })
            .catch(res => {
                console.log(res);
            })
    }
    const postInput = async (index, value) => {
        const postApi = `https://localhost:7178/api/tictactoe/${gameBoard.id}/move/${index + 1}`;
        await axios.post(postApi)
            .then(res => {
                console.log(res.data);
                setSearchElement(res.data.playerTurn);
                if (res.data.winner !== null) {
                    inputStyle()
                    setGameOff(true)
                    setWinningIndexes(res.data.winner);
                }
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        newGame()
    }, [])
    const inputStyle = () => {

    }
    return (
        <div className='game-container'>
            {!gameOff ? <div className='container'>
                <div>
                    <div className='game-box'>
                        <div className='palyers-board'>
                            <div style={{ backgroundImage: `url(${PhotoO})` }} className={`${Xelement ? "Xelement" : ""}`}>
                            </div>
                            <div style={{ backgroundImage: `url(${PhotoX})` }} className={`${Oelement ? "Oelement" : ""}`}>
                            </div>
                        </div>
                        <div className='game-board'>
                            {inputGame?.map((iteam, index) => {
                                return (
                                    <div>
                                        <input
                                            readOnly={!!inputValues[index]}
                                            value={inputValues[index]}
                                            onChange={(event) => {
                                                postInput(index);
                                                valueInput(event, index);
                                            }}
                                            type='text'
                                            maxLength={iteam.inp}
                                            key={index}
                                            name=''
                                            id='inputs'
                                            className={inputValues[index] === winningIndexes ? 'win' : ''}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div> : <>
                <div className='winnerBox'>
                    <i onClick={startNew} className="bi bi-arrow-clockwise"></i>
                    <img src="https://www.datocms-assets.com/32427/1631801288-tutorials4e021.gif" alt="" />
                    <h1>🏆 Winner: {winningIndexes} 🏆</h1>
                </div>
            </>}

        </div>
    )
}
