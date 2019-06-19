import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/userAction';
import {withRouter} from 'react-router-dom';

class Header extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {

        const {isAuthenticated} = this.props.auth;

        const authLinks = (
            <Fragment>
                <button className="btn btn-primary" type="button" onClick={this.onLogout.bind(this)}>
                    Logout
                </button>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1"
                        aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbar1">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown dropleft">
                            <a className="nav-link dropdown-toggle" href="" id="navbarDropdown1" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">LogIn</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <Link className="dropdown-item" to="/loginCustomer">Customer</Link>
                                <Link className="dropdown-item" to="/loginTranslator">Translator</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </Fragment>
        );

        return (
            <header>
                <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                    <Link className="navbar-brand" to="/">
                        <h1>L T R</h1>
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