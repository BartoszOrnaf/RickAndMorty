import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import DeadOrAlive from './components/DeadOrAlive/DeadOrAlive';
import WhoIsWho from './components/WhoIsWho/WhoIsWho';
import Navigation from './components/Navigation/Navigation';
import RickTalks from './components/RickTalks/RickTalks';

function App() {
  return (
    <Router>
      <header className="App__header">
        <Navigation />
      </header>
      <div className="container__games">
        <Switch>
          <Route path="/DeadOrAlive">
            <DeadOrAlive />
          </Route>
          <Route path="/WhoIsWho">
            <WhoIsWho />
          </Route>
          <Route path="/RickTalks">
            <RickTalks />
          </Route>
          <Route path="/" render={() => <Redirect to="/DeadOrAlive" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
