import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';
import {withRouter} from 'react-router-dom';

import logo from '../../resources/images/logo/logo-translate.png'

class Header extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {

        const {isAuthenticated,user} = this.props.auth;

        const authLinks = (
            <Fragment>
                <div>
                    <span className={'text-white'}>{user.name}<br/> Profile</span>
                <button className="btn btn-primary" type="button" onClick={this.onLogout.bind(this)}>
                    Logout
                </button>
                </div>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <div className="col-8">
                    <Link className="dropdown-item" to="/login">LogIn</Link>
                </div>
            </Fragment>
        );

        return (
            <header>
                <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo-translate.png"/>
                    </Link>
                    {isAuthenticated ? authLinks : guestLinks}
                </nav>
            </header>
        )
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withRouter(Header));