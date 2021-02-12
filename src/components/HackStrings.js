import React, { useState, useEffect } from 'react';
import EightLetterWords from '../listOfWords/EightLetterWords'
import SevenLetterWords from '../listOfWords/SevenLetterWords'
import SixLetterWords from '../listOfWords/SixLetterWords'
import UserServices from '../services/UserServices'
import GlobalStatsServices from '../services/GlobalStatsServices'
import '../Styling/mainGame.css'
import Stats from './Stats'


const HackStrings = (props) => {

    const [difficulty, setDifficulty] = useState('Easy')
    const [pickedWord, setPickedWord] = useState('')
    const [rightWord, setRightWord] = useState('')
    const [chosenWords, setChosenWords] = useState([])
    const [wordLengthInput, setWordLengthInput] = useState("6")
    const [wordAmount, setWordAmount] = useState(6)
    const [play, setPlay] = useState(false)
    const [likeness, setLikeness] = useState(0)
    const [lives, setLives] = useState(3)
    const [message, setMessage] = useState('')
    const [loss, setLoss] = useState(false)
    // const [lastPickedWords, setLastPickedWords] = useState({
    //     word: "",
    //     likeness: 0
    // })
    const [lifePoint1, setLifePoint1] = useState({
        color: "green"
    })
    const [lifePoint2, setLifePoint2] = useState({
        color: "green"
    })
    const [lifePoint3, setLifePoint3] = useState({
        color: "green"
    })
    const [easyStats, setEasyStats] = useState({
        gamesPlayed: 0,
        wins: 0,
        losses: 0
    })
    const [mediumStats, setMediumStats] = useState({
        gamesPlayed: 0,
        wins: 0,
        losses: 0
    })
    const [hardStats, setHardStats] = useState({
        gamesPlayed: 0,
        wins: 0,
        losses: 0
    })
    const [statsId, setStatsId] = useState()
    let tempObject = {}

    const tempArray = []
    useEffect(() => {
        GlobalStatsServices
            .getAll()
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                setEasyStats(response.data[0].easy)
                setMediumStats(response.data[0].medium)
                setHardStats(response.data[0].hard)
                setStatsId(response.data[0].id)
                console.log(response.data[0].id)
            })
    }, [])

    function logout() {
        if (window.confirm("Are you sure you want to logout?")) {
            props.logout()
        }
    }

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

    function updateGlobalStats(statsArray, difficulty) {
        console.log(statsArray)
        switch (difficulty) {
            case "Easy":
                GlobalStatsServices.update(statsId, tempObject = {
                    easy: {
                        gamesPlayed: statsArray.gamesPlayed,
                        wins: statsArray.wins,
                        losses: statsArray.losses
                    }
                })
                    .catch(error => {
                        console.log(error)
                    }).then(response => {
                        console.log(response.data)
                    })
                console.log(tempObject)
                break
            case "Medium":
                GlobalStatsServices.update(statsId, tempObject = {
                    medium: {
                        gamesPlayed: statsArray.gamesPlayed,
                        wins: statsArray.wins,
                        losses: statsArray.losses
                    }
                })
                    .catch(error => {
                        console.log(error)
                    }).then(response => {
                        console.log(response.data)
                    })
                console.log(tempObject)
                break
            case "Hard":
                GlobalStatsServices.update(statsId, tempObject = {
                    hard: {
                        gamesPlayed: statsArray.gamesPlayed,
                        wins: statsArray.wins,
                        losses: statsArray.losses
                    }
                })
                    .catch(error => {
                        console.log(error)
                    }).then(response => {
                        console.log(response.data)
                    })
                console.log(tempObject)
                break
            case "Custom":
                break
            default:
                return null
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
            switch (difficulty) {
                case "Easy":
                    setEasyStats({
                        ...easyStats,
                        gamesPlayed: easyStats.gamesPlayed + 1,
                        wins: easyStats.wins + 1
                    })
                    updateGlobalStats(easyStats, "Easy")
                    break
                case "Medium":
                    setMediumStats({
                        ...mediumStats,
                        gamesPlayed: mediumStats.gamesPlayed + 1,
                        wins: mediumStats.wins + 1
                    })
                    updateGlobalStats(mediumStats, "Medium")
                    break
                case "Hard":
                    setHardStats({
                        ...hardStats,
                        gamesPlayed: hardStats.gamesPlayed + 1,
                        wins: hardStats.wins + 1
                    })
                    updateGlobalStats(hardStats, "Hard")
                    break
                case "Custom":
                    break
                default:
                    return null
            }

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
            setLives(3)
            setLikeness(0)
            setLifePoint1({
                color: "green"
            })
            setLifePoint2({
                color: "green"
            })
            setLifePoint3({
                color: "green"
            })
        } else {
            setMessage("Wrong word!")
            setLives(lives - 1)
            switch (lives) {
                case 3:
                    setLifePoint1({
                        color: "red"
                    })
                    break
                case 2:
                    setLifePoint2({
                        color: "red"
                    })
                    break
                case 1:
                    setLifePoint3({
                        color: "red"
                    })
                    break
                default:
                    return null
            }
            if (lives === 1) {
                switch (difficulty) {
                    case "Easy":
                        setEasyStats({
                            ...easyStats,
                            gamesPlayed: easyStats.gamesPlayed + 1,
                            losses: easyStats.losses + 1
                        })
                        updateGlobalStats(easyStats, "Easy")
                        break
                    case "Medium":
                        setMediumStats({
                            ...mediumStats,
                            gamesPlayed: mediumStats.gamesPlayed + 1,
                            losses: mediumStats.losses + 1
                        })
                        updateGlobalStats(mediumStats, "Medium")
                        break
                    case "Hard":
                        setHardStats({
                            ...hardStats,
                            gamesPlayed: hardStats.gamesPlayed + 1,
                            losses: hardStats.losses + 1
                        })
                        updateGlobalStats(hardStats, "Hard")
                        break
                    case "Custom":
                        break
                    default:
                        return null
                }
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
                setLikeness(0)
                setMessage("")
            }
        }
        rightLetterAmount = 0
    }

    // Pretty primitive and clumsy way to change the screen, but it works so...
    let screen
    if (!play && difficulty === "Custom") {
        screen =
            <div className="difficulty-selection">
                <h3>Custom mode</h3>
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
                }} id="custom-back-button">Back</button>
                <button onClick={clicked} id="custom-play-button">Play</button>
            </div>

    } if (!play && difficulty !== "Custom") {
        screen =
            <div className="difficulty-selection">
                <label>
                    SELECT DIFFICULTY:
                <select value={difficulty} onChange={onDifficultyChange}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Custom">Custom</option>
                    </select>
                </label><br />
                <button onClick={clicked} id="play-button">Play &#9760;</button>

            </div>
    }

    if (play) {
        screen =
            <div className="main-game">
                <p>
                    You have chosen {difficulty} difficulty. <br />
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
                <p>Likeness: {likeness}</p>
                <p>Life points</p>
                <div id="lives">
                    <p style={lifePoint1}>&#9760;</p>
                    <p style={lifePoint2}>&#9760;</p>
                    <p style={lifePoint3}>&#9760;</p>
                </div>
                <p>{message}</p>
            </div>
    } if (loss) {
        screen =
            <div className="loss-screen">
                <p>The system has been permanently locked.</p>
                <div id="lives">
                    <p style={lifePoint1}>&#9760;</p>
                    <p style={lifePoint2}>&#9760;</p>
                    <p style={lifePoint3}>&#9760;</p>
                </div>
                <button onClick={e => {
                    setPlay(false)
                    setLoss(false)
                    setLives(3)
                    setLifePoint1({
                        color: "green"
                    })
                    setLifePoint2({
                        color: "green"
                    })
                    setLifePoint3({
                        color: "green"
                    })
                    setMessage("")
                }}>Play again?</button>
            </div>
    }

    return (
        <div id="wrapper">
            <button onClick={logout} id="logout-button">&#9932;</button>
            {screen}
            <Stats easyStats={easyStats} mediumStats={mediumStats} hardStats={hardStats} userStats={props.user[0].stats} username={props.user[0].username} />
        </div>
    )

}

export default HackStrings