import React from 'react';
import './App.scss';
import DeadOrAlive from './components/DeadOrAlive/DeadOrAlive'
import WhoIsWho from './components/WhoIsWho/WhoIsWho'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="font--big">KNOW YOUR RICK AND MORTY ?</h1>
        </header>
        <div className="container__games">

          {/* < DeadOrAlive /> */}
          < WhoIsWho />
        </div>

      </div>
    );
  }
}

export default App;
