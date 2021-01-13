import React from 'react';
import ReactDOM from 'react-dom';
import LoginHandler from './components/LoginHandler'

const App = () => {

  return (
    <div>
      <p>Hi, welcome to play The Hack_Man!</p>
      <LoginHandler />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
