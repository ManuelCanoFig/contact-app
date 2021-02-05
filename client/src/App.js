import React, {Fragment} from 'react';
import Navbar from './components/layaout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layaout/Alert'
import PrivateRoute from './components/routing/PrivateRoute'

import ContactState from './context/contact/ContactState'
import AlertState from './context/alert/AlertState'
import AuthState from './context/auth/AuthState'
import setAuthToken from './utils/setAuthToken'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar/>
            </Fragment>
            <div className="container">
              <Alert/>
              <Switch>
                <PrivateRoute exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
              </Switch>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
