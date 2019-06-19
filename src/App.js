import React,{Component} from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import {setCurrentUser} from './actions/authAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';

import Home from './components/home/Home'
import Header from './components/navigation/Header'
import Login from './components/login/Login'
import RegisterCustomer from './components/register/RegisterCustomer'
import AdminHome from './components/admin/AdminHome'

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                        <Header/>
                        <main className="mainContext">
                        <div className="container cheifAppContainer">
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/admin" component={AdminHome}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/registerCustomer" component={RegisterCustomer}/>
                        </div>
                    </main>
                </Router>
            </Provider>
        );
    }
}

export default App;
