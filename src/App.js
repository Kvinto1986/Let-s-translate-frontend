import React,{Component} from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';

import Home from './components/home/Home'
import Header from './components/navigation/Header'
import LoginCustomer from './components/login/LoginCustomer'
import LoginTranslator from './components/login/LoginTranslator'
import RegisterCustomer from './components/register/RegisterCustomer'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <main className="mainContext">
                        <Header/>
                        <div className="container cheifAppContainer">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/loginCustomer" component={LoginCustomer}/>
                                <Route exact path="/loginTranslator" component={LoginTranslator}/>
                                <Route exact path="/registerCustomer" component={RegisterCustomer}/>
                            </Switch>
                        </div>
                    </main>
                </Router>
            </Provider>
        );
    }
}

export default App;
