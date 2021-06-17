import React from 'react';
import './App.css';
import { Animals } from './components/Animals/Animals';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { SingleAnimal } from './components/SingleAnimal/SingleAnimal';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Animals/>
        </Route>
        <Route exact path="/animal/:id">
          <SingleAnimal/>
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
