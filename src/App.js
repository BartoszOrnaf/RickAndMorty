import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DeadOrAlive from './components/DeadOrAlive/DeadOrAlive';
import WhoIsWho from './components/WhoIsWho/WhoIsWho';
import Navigation from './components/Navigation/Navigation'

class App extends React.Component {

  render() {
    return (<Router>
      <div className="App">

        <header className="App__header">
          <h1 className="font--big">KNOW YOUR RICK AND MORTY</h1>
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
            <Route path="/" render={()=>(
              <Redirect to="/DeadOrAlive"/>
            )}>
            </Route>
          </Switch>
        </div>

      </div>
    </Router>
    );
  }
}

export default App;
