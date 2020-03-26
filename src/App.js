import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import DeadOrAlive from './components/DeadOrAlive/DeadOrAlive';
import WhoIsWho from './components/WhoIsWho/WhoIsWho';

class App extends React.Component {

  render() {
    return (<Router>
      <div className="App">

        <header className="App__header">
          <h1 className="font--big">KNOW YOUR RICK AND MORTY</h1>
          <nav>
            <span>
              <NavLink
                to="/RickAndMorty/DeadOrAlive"
                className="navbar__link"
                activeClassName="navbar__link--active"
              >Dead or alive </NavLink>
            </span>
            <span>
              <NavLink
                to="/RickAndMorty/WhoIsWho"
                className="navbar__link"
                activeClassName="navbar__link--active"
              > Who is who</NavLink>
            </span>
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
