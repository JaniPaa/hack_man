import React, { useState, useEffect } from 'react';
import HackStrings from './HackStrings'
import UserServices from '../services/UserServices'

const LoginHandler = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState([])
    const [usern, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [storedUsers, setStoredUsers] = useState([])

    var tempArray = []

    useEffect(() => {
        UserServices
        .getAll()
        .catch(error => {
            console.log(error)
        })
        .then(response => {   
            for(var i = 0; i < response.data.length; i++){
                tempArray.push(response.data[i].username)
            }
            setStoredUsers(tempArray)
        })
    }, [])

    // async function checkDuplicateUsername() {
    //     var tempUsername = ""
    //     await UserServices.getOne(username).then(response => {
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

    const handleUserChange = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        console.log("attempted username: "+usern)
        console.log(storedUsers)
        if (usern === "" || password === "") {
            alert("Please enter username and password")
        } 
        else if (storedUsers.includes(usern)) {
            alert("Username already exists")
        } 
        else {
            console.log("We are here now1")
            const userObject = {
                username: usern,
                password: password
            }
            setUser(user.concat(userObject))
            setUsername('')
            setPassword('')
            UserServices.create(userObject).then(response => {
                console.log(response)
            })
            setIsLoggedIn(true)
        }
    }

    function logout() {
        setIsLoggedIn(false)
    }

    if (isLoggedIn === false) {
        return (
            <div>
                <form>
                    <input type="text" value={usern} placeholder="username" onChange={handleUserChange}></input>
                    <input type="password" placeholder="password" value={password} onChange={handlePasswordChange}></input>
                    <button type="submit" onClick={handleRegister}>Register</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <HackStrings users={user} logout={logout} />
            </div>
        )
    }

}

export default LoginHandler