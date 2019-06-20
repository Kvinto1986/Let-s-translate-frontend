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

        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <Fragment>
                <div className="my-2 my-lg-0">
                    <span className='h4 text-white mr-3'>{user.name} ({user.role})</span>
                    <button
                        className="btn btn-success align-content-lg-end"
                        type="button"
                        onClick={this.onLogout.bind(this)}>Logout
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
            <header>
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
        )
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withRouter(Header));