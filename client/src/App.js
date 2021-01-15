import React, {Fragment} from 'react';
import Navbar from './components/layaout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/ContactState'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar/>
        </Fragment>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about' component={About}/>
          </Switch>
        </div>
      </Router>
    </ContactState>
  );
}

export default App;
