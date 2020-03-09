import React from 'react';
import './App.scss';
import DeadOrAliveComponent from './components/DeadOrAlive/DeadOrAliveComponent'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="font--big">KNOW YOUR RICK AND MORTY</h1>
        </header>
        < DeadOrAliveComponent />
      </div>
    );
  }
}

export default App;
