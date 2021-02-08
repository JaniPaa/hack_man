import React from 'react';
import ReactDOM from 'react-dom';
import LoginHandler from './components/LoginHandler'
import hackManVideo from './resources/hacker_manScreen.mp4.mp4'
import '../src/Styling/index.css'

const App = () => {

  return (
    <div>
      <div className="title-container">
        <h1 id="game-title">The Hack Man Game!</h1>
      </div>
      <video id="background-video" loop autoPlay muted>
        <source src={hackManVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <LoginHandler />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
