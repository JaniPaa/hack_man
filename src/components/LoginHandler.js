import React, { useState, useEffect } from 'react';
import HackStrings from './HackStrings'
import UserServices from '../services/UserServices'

const LoginHandler = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState([])
    const [usernameRegister, setUsernameRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [usernameLogin, setUsernameLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [storedUsers, setStoredUsers] = useState([])


    useEffect(() => {
        UserServices
            .getAll()
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                //Scuffed way to get get/check users data for login/registration, because retrieving passwords and usernames altogether.
                setStoredUsers(response.data)
            })
    }, [storedUsers])

    // function below is too slow :(

    // function checkDuplicateUsername() {
    //     var tempUsername = ""
    //     UserServices.getOne(username).then(response => {
    //         console.log(response.data.username + "wait?")
    //         tempUsername = response.data.username
    //     })
    //     if (tempUsername === username) {
    //         console.log(tempUsername + " vs " + username)
    //         console.log('flag false')
    //         return false
    //     } else {
    //         console.log(tempUsername + " vs " + username)
    //         console.log('flag true')
    //         return true
    //     }
    // }

    const handleUsernameRegisterChange = (e) => {
        e.preventDefault()
        setUsernameRegister(e.target.value)
    }

    const handlePasswordRegisterChange = (e) => {
        e.preventDefault()
        setPasswordRegister(e.target.value)
    }

    const handleUsernameLoginChange = (e) => {
        e.preventDefault()
        setUsernameLogin(e.target.value)
    }

    const handlePasswordLoginChange = (e) => {
        e.preventDefault()
        setPasswordLogin(e.target.value)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (usernameRegister === "" || passwordRegister === "") {
            alert("Please enter username and password")
        }
        else if (storedUsers.some(user => user.username === usernameRegister)) {
            alert("Username already exists")
        }
        else {
            const userObject = {
                username: usernameRegister,
                password: passwordRegister,
                stats: {
                    gamesPlayed: 0,
                    wins: 0,
                    losses: 0
                }
            }
            UserServices.create(userObject).then(response => {
                console.log(response)
            })
            setUser(user.concat(userObject))
            setUsernameRegister('')
            setPasswordRegister('')
            console.log(userObject)
            
            setIsLoggedIn(true)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const loginObject = {
            username: usernameLogin,
            password: passwordLogin
        }
        console.log(storedUsers)
        console.log(usernameLogin)
        if (usernameLogin === "" || passwordLogin === "") {
            alert("Please enter username and password")
        } else if (!storedUsers.some(user => user.username === usernameLogin)) {
            alert("Wrong username")
        } else if (storedUsers.some(user => user.username === usernameLogin)) {
            var foundUser = storedUsers.find(user => {
                return user.username === usernameLogin
            })
            if (foundUser.password !== passwordLogin) {
                console.log(foundUser.password)
                alert("Wrong password")
            } else {
                console.log(loginObject)
                console.log("login success")
                setUser(user.concat(storedUsers.find(user => {
                    return user.username === usernameLogin
                })))
                setUsernameLogin('')
                setPasswordLogin('')
                setIsLoggedIn(true)
            }
        } else {return false}
    }

    function logout() {
        setIsLoggedIn(false)
        user.length = 0
    }

    if (isLoggedIn === false) {
        return (
            <div>
                <form>
                    <input type="text" value={usernameLogin} placeholder="username" onChange={handleUsernameLoginChange}></input>
                    <input type="password" placeholder="password" value={passwordLogin} onChange={handlePasswordLoginChange}></input>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </form><br />
                <form>
                    <input type="text" value={usernameRegister} placeholder="username" onChange={handleUsernameRegisterChange}></input>
                    <input type="password" placeholder="password" value={passwordRegister} onChange={handlePasswordRegisterChange}></input>
                    <button type="submit" onClick={handleRegister}>Register</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <HackStrings user={user} logout={logout} />
            </div>
        )
    }

}

export default LoginHandler