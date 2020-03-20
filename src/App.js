import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DeadOrAlive from './components/DeadOrAlive/DeadOrAlive'
import WhoIsWho from './components/WhoIsWho/WhoIsWho'

class App extends React.Component {

  render() {
    return (<Router>
      <div className="App">
        
        <header className="App__header">
          <h1 className="font--big">KNOW YOUR RICK AND MORTY</h1>
          <nav>
            <span><Link to="/RickAndMorty/DeadOrAlive">Dead or alive </Link></span>
            <span><Link to="/RickAndMorty/WhoIsWho"> Who is who</Link></span>
          </nav>
        </header>

        <div className="container__games">
        <Switch>
          <Route path="/RickAndMorty/DeadOrAlive">
            <DeadOrAlive />
          </Route>
          <Route path="/RickAndMorty/WhoIsWho">
            <WhoIsWho />
          </Route>
          <Route path="/">
            <DeadOrAlive />
          </Route>
        </Switch>
        </div>

      </div>
    </Router>
    );
  }
}

export default App;
