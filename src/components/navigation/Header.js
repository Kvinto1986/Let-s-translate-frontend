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

const badgeStyle = {
    fontSize: '9px'
};

export let socket;
class Header extends Component {

    /* Creating a Socket client and exporting it at the end to be used across the Place Order, Kitchen, etc components*/
    constructor() {
        super();
        this.state = {
            endpoint: 'https://websocket-back.herokuapp.com/',
            newTextAlert: false,
            newTranslateStatus: false,
            unreadMessagesCount: 0
        };
        socket = socketIOClient(this.state.endpoint);
    }

    componentDidMount() {
        const {user} = this.props.auth;

        if(user.role === 'translator') {
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

        if(user.role === 'customer') {
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

        socket.on('spawnMessage', data => {
            if (user.email === data.recipientEmail) {
                if(this.props.history.location.pathname.indexOf('/messages/dialog') === -1) {
                    this.props.fetchAllUnreadMessages({user: this.props.auth.user})
                }
            }
        })

        socket.on('unreadMessageCountDiscard', data => {  
            if(user.email === data.email) {
                this.props.fetchAllUnreadMessages({user: this.props.auth.user})
            }
        })

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
                <div className="my-2 my-lg-0 d-fel">
                    <div className="d-flex align-items-center">
                        {
                            user.role !== 'admin' && (
                                <Link to="/messages">
                                    <img src={msgImage} alt='Messages' className="mr-1" />
                                    {(unreadMessages.length > 0) && (
                                        <span className="badge badge badge-pill badge-secondary mr-4" style={badgeStyle}>
                                            {unreadMessages.length}
                                        </span>
                                    )}
                                </Link>
                            )
                        }
                        <Link to="/profile">
                            <h5 className='text-white ml-3 mr-3 mt-2'>{user.name} ({user.role})</h5>
                        </Link>
                        <button
                            className="btn btn-dark btn-sm align-content-lg-end"
                            type="button"
                            onClick={this.onLogout.bind(this)}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </Fragment>
        );

        const guestLinks = (
            <ul className="navbar-nav mr-auto navUserLinks d-flex justify-content-end ml-5" style={{width: "100%"}}>
                <li className="nav-item">
                    <Link className={'guestLink text-decoration-none mr-5 nav-link'} to="/registerCustomer">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className={'guestLink text-decoration-none nav-link'} to="/login">LogIn</Link>
                </li>
            </ul>

        );

        return (
            <Fragment>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <Link className="navbar-brand" to="/">
                            <div className="d-flex align-items-center">
                                <div>
                                    <img src={logo} className="header__logo" alt="logo-translate" width="40px"/>
                                </div>
                                <h1 className='display-4 ml-1' style={{fontSize: "26px", margin: "0px"}}>
                                    <em className="titleLink"><b>Let's translate</b></em>
                                </h1>
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbar1">
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
    unreadMessages: state.unreadMessages,
    messages: state.messages,
});

export default connect(mapStateToProps, {
    logoutUser,
    fetchAllUnreadMessages
})(withRouter(Header));