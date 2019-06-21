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
import TranslatorRegister from './components/adminPage/translatorRegister'
import TarifsEdit from './components/adminPage/tarifsEdit'
import TranslatesBilboard from './components/translatorPage/translatesBilboard'
import TranslatorWorkspace from './components/translatorPage/translatorWorkspace'
import Dashboard from './components/customerPage/dashboard'
import TextsList from './components/customerPage/newText'
import TransactionsBar from './components/customerPage/transactionsBar'
import MessagesList from './components/customerPage/messagesList'

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
                        <div className="container cheifAppContainer col-12 d-flex justify-content-center">
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/registerCustomer" component={RegisterCustomer}/>
                            {/* Admin routes */}
                            <Route exact path="/registerTranslator" component={TranslatorRegister}/>
                            <Route exact path="/editTarifs" component={TarifsEdit}/>
                            {/* Customer routes */}
                            <Route exact path="/dashboard" component={Dashboard}/>
                            <Route exact path="/texts" component={TextsList}/>
                            <Route exact path="/transactions" component={TransactionsBar}/>
                            <Route exact path="/messages" component={MessagesList}/>
                            {/* Translator routes */}
                            <Route exact path="/translates" component={TranslatesBilboard}/>
                            <Route exact path="/workSpace" component={TranslatorWorkspace}/>
                        </div>
                    </main>
                </Router>
            </Provider>
        );
    }
}

export default App;
