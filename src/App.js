import React from 'react';
import './App.scss';
import DeadOrAliveComponent from './components/DeadOrAlive/DeadOrAliveComponent'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
}


  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="font--big">KNOW YOUR RICK AND MORTY</h1>
      </header>
        < DeadOrAliveComponent id={'Rick'} />
      </div>
    );
  }
}

export default App;
