import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';
import {fetchAllUnreadMessages} from '../../actions/messages/fetchAllUnreadMessages'
import {withRouter} from 'react-router-dom';
import socketIOClient from "socket.io-client";

import logo from '../../resources/images/logo/logo-translate.png'
import msgImage from '../../resources/images/navigation/message.png'

import LinkGroup from './LinkGroup'
import Alert from '../common/Alert'

const style = {
    marginBottom: '25px'
};

const badgeStyle = {
    fontSize: '9px'
};

export let socket;
class Header extends Component {

    /* Creating a Socket client and exporting it at the end to be used across the Place Order, Kitchen, etc components*/
    constructor() {
        super();
        this.state = {
            endpoint: 'http://localhost:4000/',
            newTextAlert: false,
            newTranslateStatus: false
        };
        socket = socketIOClient(this.state.endpoint);
    }

    componentDidMount() {
        if(this.props.auth.user.role === 'translator') {
            socket.on('newTextAlert', data => {
                this.setState({
                    newTextAlert: data
                })
                
                setTimeout(() => {
                    this.setState({
                        newTextAlert: false
                    })
                }, 30000)
            })
        }

        if(this.props.auth.user.role === 'customer') {
            socket.on('newTranslateStatusAlert', data => {
                this.setState({
                    newTranslateStatus: data
                })
                
                setTimeout(() => {
                    this.setState({
                        newTranslateStatus: false
                    })
                }, 30000)
            })
        }

        this.props.fetchAllUnreadMessages({user: this.props.auth.user})
    }

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {unreadMessages} = this.props
        const authLinks = (
            <Fragment>
                <LinkGroup role={user.role} />
                <div className="my-2 my-lg-0">
                    <Link to="/messages">
                        <img src={msgImage} alt='Messages' className="mr-1"/>
                        <span className="badge badge badge-pill badge-secondary mr-4" style={badgeStyle}>
                            {unreadMessages.length}
                        </span>
                    </Link>
                    <Link to="/profile">
                        <span className='h4 text-white mr-3'>{user.name} ({user.role})</span>
                    </Link>
                    <button
                        className="btn btn-success align-content-lg-end"
                        type="button"
                        onClick={this.onLogout.bind(this)}
                    >
                        Logout
                    </button>
                </div>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <div className={'col-2 d-flex justify-content-between align-items-center'}>
                    <Link className={'btn btn-lg btn-info text-decoration-none'} to="/registerCustomer">Register</Link>
                    <Link className={'btn btn-lg btn-warning text-decoration-none'} to="/login">LogIn</Link>
                </div>
            </Fragment>
        );

        return (
            <Fragment>
                <header style={style}>
                    <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                        <div className={'col-12 d-flex justify-content-between align-items-center'}>
                            <Link className="navbar-brand" to="/">
                                <img src={logo} alt="logo-translate.png" width="120" height="90"/>
                                <span className='h1 ml-3'>Let's translate</span>
                            </Link>
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </nav>
                </header>
                {/* New text alert */}
                {
                    (( this.state.newTextAlert 
                    && user.languages.every(userLanguage => this.state.newTextAlert.languages.includes(userLanguage))) && (
                        <Alert data={this.state.newTextAlert} type="newTextAlert" />
                    ))
                }
                {/* Translate status change alert */}
                {
                    (( this.state.newTranslateStatus 
                    && this.state.newTranslateStatus.customerEmail === this.props.auth.user.email
                    && this.state.newTranslateStatus.customerName === this.props.auth.user.name) && (
                        <Alert data={this.state.newTranslateStatus} type="newTranslateStatus" />
                    ))
                }
            </Fragment>
        )
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    unreadMessages: state.unreadMessages
});

export default connect(mapStateToProps, {
    logoutUser,
    fetchAllUnreadMessages
})(withRouter(Header));