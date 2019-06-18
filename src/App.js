import React from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';

import Home from './components/Home'
import Header from './components/Header'
import LoginCustomer from './components/login/LoginCustomer'
import LoginTranslator from './components/login/LoginTranslator'
import RegisterCustomer from './components/register/RegisterCustomer'

const App = (props) => {
  return (
    <Provider store={ store }>
      <Router >    
          <Header history={props.history}/>
          <main className="mainContext">
            <div className="container cheifAppContainer">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/loginCustomer" component={LoginCustomer} />
              <Route exact path="/loginTranslator" component={LoginTranslator} />
              <Route exact path="/registerCustomer" component={RegisterCustomer} />
            </Switch>
            </div>
          </main>
      </Router>
    </Provider>
  );
}

export default App;
