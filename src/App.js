import React from 'react';
import './App.scss';
import DeadOrComponent from './components/Character/DeadOrComponent'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
    }
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          KNOW YOUR RICK AND MORTY
      </header>
        < DeadOrComponent id={'Rick'} />
      </div>
    );
  }
}

export default App;
