import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authenticationAction';

class LoginTranslator extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    };

    render() {


        return (
            <div className="login">
                <div className="container">
                    <h2>Login</h2>
                    <p className="text-info">Translator</p>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

LoginTranslator.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export  default connect(mapStateToProps, { loginUser })(LoginTranslator)