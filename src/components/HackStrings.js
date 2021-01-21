import React, { useState } from 'react';
import EightLetterWords from '../listOfWords/EightLetterWords'
import SevenLetterWords from '../listOfWords/SevenLetterWords'
import SixLetterWords from '../listOfWords/SixLetterWords'
import UserServices from '../services/UserServices'
import '../Styling/mainGame.css'

const HackStrings = (props) => {

    const [difficulty, setDifficulty] = useState('Easy')
    const [pickedWord, setPickedWord] = useState('')
    const [rightWord, setRightWord] = useState('')
    const [chosenWords, setChosenWords] = useState([])
    const [wordLengthInput, setWordLengthInput] = useState("6")
    const [wordAmount, setWordAmount] = useState(4)
    const [play, setPlay] = useState(false)
    const [likeness, setLikeness] = useState(0)
    const [lives, setLives] = useState(3)
    const [message, setMessage] = useState('')
    const [loss, setLoss] = useState(false)

    const tempArray = []

    function onDifficultyChange(e) {
        setDifficulty(e.target.value)
        if (e.target.value === "Easy") {
            setWordLengthInput("6")
            setWordAmount("6")
        } else if (e.target.value === "Medium") {
            setWordLengthInput("7")
            setWordAmount("8")
        } else if (e.target.value === "Hard") {
            setWordLengthInput("8")
            setWordAmount("10")
        }
    }

    function onWordLengthChange(e) {
        setWordLengthInput(e.target.value)
    }

    function onWordAmountChange(e) {
        setWordAmount(e.target.value)
    }

    function getRandomWords(list) {
        var rand = Math.floor(Math.random() * Math.floor(list.length))
        if (!tempArray.includes(list[rand])) {
            tempArray.push(list[rand])
        } else {
            console.log(tempArray)
            console.log("Looping again because of: " + list[rand])
            getRandomWords(list)
        }
    }

    const clicked = () => {
        var wordLength = wordLengthInput
        var max = 0
        setPlay(true)

        if (wordLength === "6") {
            max = SixLetterWords.length
            for (var i = 0; i < wordAmount; i++) {
                getRandomWords(SixLetterWords)
            }
            setChosenWords(tempArray)
        }
        if (wordLength === "7") {
            max = SevenLetterWords.length
            for (var j = 0; j < wordAmount; j++) {
                getRandomWords(SevenLetterWords)
            }
            setChosenWords(tempArray)
        }
        if (wordLength === "8") {
            max = EightLetterWords.length
            for (var k = 0; k < wordAmount; k++) {
                getRandomWords(EightLetterWords)
            }
            setChosenWords(tempArray)
        }
        max = tempArray.length
        setRightWord(tempArray[Math.floor(Math.random() * Math.floor(max))])
    }

    const checkResult = (word) => {
        console.log(rightWord)
        setPickedWord(word)
        var chosenWordChars = word.split('')
        var rightWordChars = rightWord.split('')

        var rightLetterAmount = 0

        console.log("user word: " + chosenWordChars)
        console.log("right word: " + rightWordChars)

        for (var x = 0; x < chosenWordChars.length; x++) {
            if (chosenWordChars[x] === rightWordChars[x]) {
                console.log("Right letter")
                console.log("Chosen word letter " + x + ": " + chosenWordChars[x])
                console.log("Right word letter " + x + ": " + rightWordChars[x])
                rightLetterAmount = rightLetterAmount + 1
                console.log(rightLetterAmount)
            } else {
                console.log("Wrong letter")
                console.log("Chosen word letter " + x + ": " + chosenWordChars[x])
                console.log("Right word letter " + x + ": " + rightWordChars[x])
                console.log(rightLetterAmount)
            }
        }
        setLikeness(rightLetterAmount)

        if (rightLetterAmount === rightWordChars.length) {
            props.user[0].stats.gamesPlayed = props.user[0].stats.gamesPlayed + 1
            props.user[0].stats.wins = props.user[0].stats.wins + 1
            UserServices.update(props.user[0].username, props.user[0])
                .catch(error => {
                    console.log(error)
                }).then(response => {
                    console.log(response.data.username + "'s stats saved")
                })
            alert("You have hacked the system!")
            setPlay(false)
        } else {
            setMessage("Wrong word!")
            setLives(lives - 1)
            if (lives === 1) {
                props.user[0].stats.gamesPlayed = props.user[0].stats.gamesPlayed + 1
                props.user[0].stats.losses = props.user[0].stats.losses + 1
                UserServices.update(props.user[0].username, props.user[0])
                .catch(error => {
                    console.log(error)
                }).then(response => {
                    console.log(response.data.username + "'s stats saved")
                })
                setLives(3)
                setLoss(true)
            }
        }
        rightLetterAmount = 0
    }

    // Pretty primitive and clumsy way to change the screen, but it works so...
    let screen
    if (!play && difficulty === "Custom") {
        screen =
            <div>
                <label>
                    Select word length:
                    <select value={wordLengthInput} onChange={onWordLengthChange}>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </label><br />
                <label>
                    Amount of words:
                    <select value={wordAmount} onChange={onWordAmountChange}>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </label><br />
                <button onClick={e => {
                    setDifficulty("Easy")
                }}>Back</button>
                <button onClick={clicked}>Play</button>
            </div>

    } if (!play && difficulty !== "Custom") {
        screen =
            <div>
                <label>
                    Select difficulty:
                <select value={difficulty} onChange={onDifficultyChange}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Custom">Custom</option>
                    </select>
                </label><br />
                <button onClick={clicked}>Play</button>

            </div>
    }

    if (play) {
        screen =
            <div>
                <p>
                    You have chosen: <br />
                    Word length: {wordLengthInput} <br />
                    Word amount: {wordAmount}
                </p>
                <h3>Console</h3>
                <ul className="randomedWordList">
                    {chosenWords.map((word, i) =>
                        <li key={i} onClick={e => checkResult(word)} className="wordItem">{word}</li>
                    )}
                </ul>
                <p>Last picked word: {pickedWord}</p>
                <p>Lives: {lives}</p>
                <p>Likeness: {likeness}</p>
                <p>{message}</p>
            </div>
    } if (loss) {
        screen =
            <div>
                <p>The system has been permanently locked.</p>
                <button onClick={e => {
                    setPlay(false)
                    setLoss(false)
                    setLives(3)
                }}>Play again?</button>
            </div>
    }

    return (
        <div>
            <button onClick={props.logout}>Logout</button>
            <h3>Account: {props.user[0].username}</h3>
            <p>games played: {props.user[0].stats.gamesPlayed}</p>
            <p>wins: {props.user[0].stats.wins}</p>
            <p>losses: {props.user[0].stats.losses}</p>
            {screen}
        </div>
    )

}

export default HackStrings