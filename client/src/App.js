import React, {Fragment} from 'react';
import Navbar from './components/layaout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <Navbar/>
          </Fragment>
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
            </Switch>
          </div>
        </Router>
      </ContactState>
    </AuthState>
  );
}

export default App;
