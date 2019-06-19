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
                    <Link className="dropdown-item" to="/login">LogIn</Link>
            </Fragment>
        );

        return (
            <header>
                <nav className={"navbar navbar-expand-lg navbar-dark bg-dark d-flex"}>

                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo-translate.png" width="150" height="120"/>
                        <span className='h1 ml-3'>Let's translate</span>
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