import React, { useState } from 'react';
import HackStrings from './HackStrings'

const LoginHandler = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
        const userObject = {
            usern: username,
            passw: password
        }
        setUsers(users.concat(userObject))
        setUsername('')
        setPassword('')
        setIsLoggedIn(true)
    }

    if (isLoggedIn === false) {
        return (
            <div>
                <form>
                    <input type="text" value={username} placeholder="username" onChange={handleUserChange}></input>
                    <input type="password" placeholder="password" value={password} onChange={handlePasswordChange}></input>
                    <button type="submit" onClick={handleRegister}>Register</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <HackStrings users={users}/>
            </div>
        )
    }

}

export default LoginHandler